<script setup lang="ts">
const productListAction = [
  [
    {
      label: "More Information",
      icon: "flowbite:info-circle-outline",
      to: "/app/stores/1",
    },
  ],
  [
    {
      label: "Edit",
      icon: "material-symbols:edit-square-outline-rounded",
      to: "/app/stores/1?edit=true",
    },
    {
      label: "Remove",
      icon: "material-symbols:delete-outline-rounded",
    },
  ],
];

const totalShopColumns = [
  {
    key: "id",
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

const totalShopData = [
  {
    id: 1,
    name: "Pizza Hut",
    contactName: "Sahan",
    contactNumber: "011-1141144",
    branches: "21",
    category: "Restaurants",
    status: "Sponsored",
  },
  {
    id: 2,
    name: "Dominos",
    contactName: "Nihal",
    contactNumber: "011-1141144",
    branches: "12",
    category: "Restaurants",
    status: "Normal",
  },
  {
    id: 3,
    name: "Thilakawardane",
    contactName: "Denula",
    contactNumber: "011-2241122",
    branches: "10",
    category: "Clothing",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Fashion Bug",
    contactName: "Wihanga",
    contactNumber: "011-3341133",
    branches: "4",
    category: "Clothing",
    status: "Normal",
  },
  {
    id: 5,
    name: "Buerger King",
    contactName: "Saman",
    contactNumber: "011-8841155",
    branches: "3",
    category: "Restaurants",
    status: "Sponsored",
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
                  <span class="text-xl font-bold"> 10 </span>
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
                  <span class="text-xl font-bold"> 07 </span>
                </div>
              </div>
            </div>

            <UTable :columns="totalShopColumns" :rows="totalShopData">
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
                    :items="productListAction"
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
          </div>
        </UContent>
      </div>
    </NuxtLayout>
  </div>
</template>
