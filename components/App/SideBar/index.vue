<script setup>
const sidebarStore = useSidebarStore();
const routes = [
  {
    name: "Dashboard",
    icon: "material-symbols-light:home",
    path: "/app/dashboard",
  },
  {
    name: "Manage Stores",
    icon: "material-symbols:store-rounded",
    path: "/app/stores",
  },
  {
    name: "Manage Discounts",
    icon: "material-symbols:humidity-percentage",
    path: "/app/discounts",
  },
];
</script>

<template>
  <div
    class="no-scrollbar w-full md:w-[300px] absolute md:relative flex h-screen p-4 md:pr-0 z-50"
    :class="{
      '-ml-[100%] md:ml-0 md:!w-[100px]': !sidebarStore.isOpen,
      'sidebar-open': sidebarStore.isOpen,
    }"
  >
    <div
      class="w-full bg-secondary-bkg rounded-xl shadow border border-secondary-bkg dark:border-slate-900 dark:shadow-black overflow-y-scroll no-scrollbar"
    >
      <div class="w-full flex pt-5 px-5 items-center justify-between">
        <div class="flex gap-5">
          <img
            class="w-14"
            :class="{
              'md:w-10': !sidebarStore.isOpen,
            }"
            :src="`/img/logo/${$colorMode.value}.png`"
          />
          <div
            class="w-full flex flex-col justify-center"
            :class="{
              'md:hidden': !sidebarStore.isOpen,
            }"
          >
            <h3 class="text-lg font-bold uppercase">Discounts LK</h3>
            <span
              class="text-xs font-semibold text-gray-500 uppercase cursor-default"
            >
              Admin Panel
            </span>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <UButton
            icon="material-symbols:close"
            color="gray"
            variant="ghost"
            class="rounded-full md:hidden"
            @click="$emit('toggle-sidebar', $event)"
          />
        </div>
      </div>

      <div class="px-5">
        <UDivider class="py-5" />
      </div>

      <!-- Routes Start -->
      <div class="w-full flex flex-col gap-1">
        <AppSideBarItem
          v-for="route in routes"
          :key="route.name"
          :options="route"
        />
      </div>
      <!-- Routes End -->
    </div>
  </div>
</template>

<style scoped>
.sidebar-open {
  transition: margin-left 0.3s ease;
}

.sidebar-closed {
  transition: margin-left 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  animation: fadeIn 0.3s ease;
}
</style>
