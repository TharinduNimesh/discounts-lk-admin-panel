<script setup>
const sidebarStore = useSidebarStore();
</script>

<template>
  <div class="flex bg-primary-bkg text-gray-700 dark:text-slate-200">
    <AppSideBar
      :is-open="sidebarStore.isOpen"
      @toggle-sidebar="sidebarStore.toggle"
    />
    <div class="flex-1 flex h-screen flex-col justify-between">
      <div class="w-full h-full flex flex-col overflow-hidden">
        <!-- Header Start -->
        <div class="header-container relative px-5 pt-5 pb-2">
          <AppHeader @toggle-sidebar="sidebarStore.toggle" />
        </div>
        <!-- Header End -->

        <div
          class="w-full flex-1 flex flex-col justify-between gap-5 overflow-hidden overflow-y-scroll p-5"
        >
          <!-- Content Start -->
          <slot />
          <!-- Content End -->

          <!-- Footer Start -->
          <footer class="w-full">
            <div
              class="flex flex-col justify-between items-center text-center lg:flex-row lg:text-left border border-secondary-bkg dark:border-slate-900 bg-secondary-bkg rounded-xl shadow dark:shadow-black p-6"
            >
              <p class="text-sm text-gray-500">
                © 2024 <strong>DIZCOUNT LK</strong>. All Rights Reserved.
              </p>
              <p class="text-sm text-gray-500">
                Powered by
                <ULink
                  to="https://www.eversoft.lk"
                  class="text-primary font-semibold"
                  >Eversoft IT Solutions</ULink
                >
                .
              </p>
            </div>
          </footer>
          <!-- Footer End -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-container::before {
  position: absolute;
  content: "";
  left: 0;
  bottom: -20px;
  width: 100%;
  height: 20px;
  z-index: 1;
  @apply bg-gradient-to-b from-primary-bkg to-primary-bkg/0;
}
</style>
