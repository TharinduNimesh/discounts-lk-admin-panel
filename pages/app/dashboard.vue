<script setup lang="ts">


const totalUsersColumns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "users",
    label: "User Count",
  },
];

const totalUsersData = [
  {
    id: 1,
    location: "Colombo",
    users: "50",
  },
  {
    id: 2,
    location: "Gampaha",
    users: "21",
  },
  {
    id: 3,
    location: "Ja-Ela",
    users: "10",
  },
  {
    id: 4,
    location: "Kandy",
    users: "5",
  },
  {
    id: 5,
    location: "Kalutara",
    users: "5",
  },
];

const totalShopColumns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "name",
    label: "Shop Name",
  },
  {
    key: "branches",
    label: "Branches Count",
  },
];

const totalShopData = [
  {
    id: 1,
    name: "Pizza Hut",
    branches: "21",
  },
  {
    id: 2,
    name: "Dominos",
    branches: "12",
  },
  {
    id: 3,
    name: "Thilakawardane",
    branches: "10",
  },
  {
    id: 4,
    name: "Fashion Bug",
    branches: "4",
  },
  {
    id: 5,
    name: "Buerger King",
    branches: "3",
  },
];
</script>
<template>
  <NuxtLayout name="app">
    <UContent>
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">

        <div
          class="flex flex-col items-center p-5 rounded-lg bg-gray-200/30 dark:bg-gray-900/30 border border-primary/10">
          <div class="w-10 h-10 flex justify-center items-center rounded-full bg-primary/20 text-primary">
            <Icon name="material-symbols:attach-money" class="text-xl" />
          </div>
          <h3 class="text-xs uppercase text-gray-500 font-semibold mt-2">
            Group 1
          </h3>
          <span class="text-xl font-bold"> 100 </span>
        </div>
        <div
          class="flex flex-col items-center p-5 rounded-lg bg-gray-200/30 dark:bg-gray-900/30 border border-primary/10">
          <div class="w-10 h-10 flex justify-center items-center rounded-full bg-primary/20 text-primary">
            <Icon name="material-symbols:attach-money" class="text-xl" />
          </div>
          <h3 class="text-xs uppercase text-gray-500 font-semibold mt-2">
            Group 2
          </h3>
          <span class="text-xl font-bold"> 100 </span>
        </div>
        <div
          class="flex flex-col items-center p-5 rounded-lg bg-gray-200/30 dark:bg-gray-900/30 border border-primary/10">
          <div class="w-10 h-10 flex justify-center items-center rounded-full bg-primary/20 text-primary">
            <Icon name="material-symbols:attach-money" class="text-xl" />
          </div>
          <h3 class="text-xs uppercase text-gray-500 font-semibold mt-2">
            Group 3
          </h3>
          <span class="text-xl font-bold"> 100 </span>
        </div>
        <div
          class="flex flex-col items-center p-5 rounded-lg bg-gray-200/30 dark:bg-gray-900/30 border border-primary/10">
          <div class="w-10 h-10 flex justify-center items-center rounded-full bg-primary/20 text-primary">
            <Icon name="material-symbols:attach-money" class="text-xl" />
          </div>
          <h3 class="text-xs uppercase text-gray-500 font-semibold mt-2">
            Group 4
          </h3>
          <span class="text-xl font-bold"> 100 </span>
        </div>
      </div>
    </UContent>

    <UContent>
      <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">

            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
              <UContent>
                <div class="flex flex-col gap-3">
                  <h3
                    class="text-lg uppercase text-gray-800 dark:text-gray-200 font-semibold"
                  >
                    Total Users
                  </h3>
                  <UTable :columns="totalUsersColumns" :rows="totalUsersData" />
                </div>
              </UContent>
              <UContent>
                <div class="flex flex-col gap-3">
                  <h3
                    class="text-lg uppercase text-gray-800 dark:text-gray-200 font-semibold"
                  >
                    Total Shops
                  </h3>
                  <UTable :columns="totalShopColumns" :rows="totalShopData" />
                </div>
              </UContent>

            </div>
          </div>
    </UContent>

  </NuxtLayout>
</template>
