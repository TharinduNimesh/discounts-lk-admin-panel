<script setup lang="ts">
import type { Discount } from "~/types";

const supabase = useSupabase();
const config = useRuntimeConfig();
const discounts = ref<Discount[]>([]);

const discountAction = (row: Discount) => [
  [
    {
      label: "More Information",
      icon: "flowbite:info-circle-outline",
      to: `/app/stores/${row.id}`,
    },
  ],
  [
    {
      label: "Edit",
      icon: "material-symbols:edit-square-outline-rounded",
      to: `/app/stores/${row.id}?edit=true`,
    },
    {
      label: "Remove",
      icon: "material-symbols:delete-outline-rounded",
    },
  ],
];

const discountColumns = [
  {
    key: "index",
    label: "#",
  },
  {
    key: "name",
    label: "Discount Name",
  },
  {
    key: "time_period",
    label: "Time Period",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

await loadDiscounts();

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return discounts.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

async function loadDiscounts() {
  const { data } = await supabase.from("discounts").select(`
      id, title, stores(name), store_categories(id, name), 
      started_at, ended_at, discount_type, views, 
      discount_images!left(path)
    `);

  if (!data) {
    return;
  }

  discounts.value = data.map((discount, index) => {
    return {
      index: index + 1,
      id: discount.id,
      title: discount.title,
      store: discount.stores?.name || "",
      category: discount.store_categories || { id: 0, name: "" },
      started_at: new Date(discount.started_at).toLocaleDateString(),
      ended_at: new Date(discount.ended_at).toLocaleDateString(),
      image: `${config.public.supabaseUrl}/storage/v1/object/public/${discount.discount_images[0]?.path}`,
      discount_type: discount.discount_type,
      views: discount.views ?? 0, // Provide a default value for views
    };
  });
}

function getBadgeColor(status: string) {
  if (status === "Sponsored") {
    return "primary";
  } else if (status === "Normal") {
    return "green";
  } else {
    return "red";
  }
}
</script>

<template>
  <div>
    <NuxtLayout name="app">
      <UContent>
        <div class="flex justify-between">
          <h1
            class="text-xl text-gray-800 dark:text-gray-200 font-semibold uppercase"
          >
            Manage Discounts
          </h1>

          <UButton
            color="black"
            label="Add New Discount"
            icon="material-symbols:add"
            to="/app/discounts/new"
          />
        </div>
        <div class="mt-4">
          <UTable :columns="discountColumns" :rows="rows">
            <template #name-data="{ row }">
              <div class="flex flex-col">
                <h3>{{ row.title }}</h3>
                <span class="text-sm font-semibold text-gray-500">{{
                  row.store
                }}</span>
              </div>
            </template>
            <template #time_period-data="{ row }">
                <div class="flex flex-col">
                <span class="text-gray-500">{{ row.started_at }} - {{ row.ended_at }}</span>
                </div>
            </template>
            <template #status-data="{ row }">
              <UBadge
                :color="getBadgeColor(row.discount_type)"
                variant="soft"
                >{{ row.discount_type }}</UBadge
              >
            </template>
            <template #actions-data="{ row }">
              <div class="flex gap-3">
                <UDropdown
                  :items="discountAction(row)"
                  :ui="{
                    item: {
                      disabled: 'cursor-text select-text',
                    },
                  }"
                  :popper="{
                    placement: 'bottom-start',
                    arrow: true,
                  }"
                >
                  <UButton
                    icon="solar:menu-dots-bold"
                    variant="ghost"
                    color="gray"
                  />
                </UDropdown>
              </div>
            </template>
          </UTable>
          <div
            class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
          >
            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="discounts.length"
            />
          </div>
        </div>
      </UContent>
    </NuxtLayout>
  </div>
</template>
