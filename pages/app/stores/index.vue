<script setup lang="ts">
interface Store {
  id: number;
  name: string;
  contactName: string;
  contactNumber: string;
  branches: string;
  category: string | undefined;
  status: string;
}

const supabase = useSupabase();
const stores = ref<Store[]>([]);
const counts = ref({
  totalStores: 0,
  totalSponsoredStores: 0,
});

async function loadStores() {
  const { data: storesResponse } = await supabase
    .from("stores")
    .select(
      `id, name, contact_name, 
      contact_number, branches(count), 
      store_categories(name), 
      sponsored_stores!left(store_id, ended_at)`
    )
    .filter("sponsored_stores.ended_at", "gt", new Date().toISOString());

  if (storesResponse === null) {
    return;
  }

  stores.value = storesResponse.map((store, index) => {
    function getStatus(s: typeof store) {
      if (s.sponsored_stores.length > 0) return "Sponsored";
      if (s.branches[0].count === 0) return "Inactive";

      return "Normal";
    }
    return {
      id: store.id,
      index: index + 1,
      name: store.name,
      contactName: store.contact_name,
      contactNumber: store.contact_number,
      branches: `${store.branches[0].count} Branches`,
      category: store.store_categories?.name,
      status: getStatus(store),
    };
  });

  counts.value = {
    totalStores: storesResponse.length,
    totalSponsoredStores: storesResponse.filter(
      (store) => store.sponsored_stores.length > 0
    ).length,
  };
}
await loadStores();

const productListAction = (row: Store) => [
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

const totalShopColumns = [
  {
    key: "index",
    label: "#",
  },
  {
    key: "name",
    label: "Store",
  },
  {
    key: "contact",
    label: "Contact",
  },
  {
    key: "branches",
    label: "Branches Count",
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

function getBadgeColor(status: string) {
  if (status === "Sponsored") {
    return "primary";
  } else if (status === "Normal") {
    return "green";
  } else {
    return "red";
  }
}

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return stores.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div>
    <NuxtLayout name="app">
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-3">
        <UContent>
          <div class="flex flex-col gap-3">
            <div class="mt-4">
              <div class="flex flex-row gap-10 justify-between">
                <div class="flex justify-start">
                  <h3
                    class="text-xl uppercase text-gray-800 dark:text-gray-200 font-semibold"
                  >
                    Manage Stores
                  </h3>
                </div>
                <div class="flex justify-end">
                  <UButton
                    color="black"
                    label="Add New Store"
                    icon="material-symbols:add"
                    to="/app/stores/new"
                  />
                </div>
              </div>
            </div>

            <div class="p-3 border border-primary/10 rounded-lg">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3"
              >
                <div
                  class="flex flex-col items-center p-5 rounded-lg bg-gray-200/30 dark:bg-gray-900/30 border border-primary/10"
                >
                  <div
                    class="w-10 h-10 flex justify-center items-center rounded-full bg-primary/20 text-primary"
                  >
                    <Icon name="ph:building-office-fill" class="text-xl" />
                  </div>
                  <h3
                    class="text-xs uppercase text-gray-500 font-semibold mt-2"
                  >
                    Total Stores
                  </h3>
                  <span class="text-xl font-bold">{{
                    counts.totalStores
                  }}</span>
                </div>
                <div
                  class="flex flex-col items-center p-5 rounded-lg bg-gray-200/30 dark:bg-gray-900/30 border border-primary/10"
                >
                  <div
                    class="w-10 h-10 flex justify-center items-center rounded-full bg-primary/20 text-primary"
                  >
                    <Icon name="ph:building-office-fill" class="text-xl" />
                  </div>
                  <h3
                    class="text-xs uppercase text-gray-500 font-semibold mt-2"
                  >
                    Total Sponsored Store
                  </h3>
                  <span class="text-xl font-bold">{{
                    counts.totalSponsoredStores
                  }}</span>
                </div>
              </div>
            </div>

            <UTable :columns="totalShopColumns" :rows="rows">
              <template #name-data="{ row }">
                <div class="flex flex-col">
                  <h3 class="text-lg font-semibold">{{ row.name }}</h3>
                  <span class="text-sm text-gray-500">{{ row.category }}</span>
                </div>
              </template>
              <template #contact-data="{ row }">
                <div class="flex flex-col">
                  <span class="text-gray-500">{{ row.contactNumber }}</span>
                  <h3 class="text-sm font-semibold">{{ row.contactName }}</h3>
                </div>
              </template>
              <template #status-data="{ row }">
                <UBadge :color="getBadgeColor(row.status)" variant="soft">{{
                  row.status
                }}</UBadge>
              </template>
              <template #actions-data="{ row }">
                <div class="flex gap-3">
                  <UDropdown
                    :items="productListAction(row)"
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
                :total="stores.length"
              />
            </div>
          </div>
        </UContent>
      </div>
    </NuxtLayout>
  </div>
</template>
