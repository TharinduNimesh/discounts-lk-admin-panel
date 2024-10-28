<script >

import UsersByCityChart from "~/components/Chart/UsersByCityChart.vue";

export default {
  components: {
    UsersByCityChart
  },
  data() {
    return {
      usersByCity: {
        Colombo: 20,
        Gampaha: 15,
        Kandy: 8,
        Kurunegala: 5,
        Jaffna: 1
      }
    };
  }
};

</script>
<template>
  <NuxtLayout name="app">
    <UContent>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">

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

      <div class="grid grid-cols-5 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                  <UsersByCityChart :userData="usersByCity" />
                </div>
              </UContent>

            </div>
          </div>
    </UContent>

  </NuxtLayout>
</template>
