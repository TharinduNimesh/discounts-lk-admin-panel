<script setup lang="ts">
import type { RouteOptions } from "~/types";

defineProps({
  options: {
    type: Object as () => RouteOptions,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    class="w-full py-3 flex items-center gap-4 cursor-pointer"
    :class="{
      'text-gray-700 dark:text-slate-400': $route.path === options.path,
    }"
    :to="options.path"
  >
    <div
      class="w-[14px] h-[14px] flex justify-center items-center rounded-full"
      :class="{
        'bg-primary/20': $route.path === options.path,
      }"
    >
      <Icon
        name="ic:round-circle"
        class="text-[9px]"
        :class="{
          'text-primary': $route.path === options.path,
        }"
      />
    </div>
    <span class="text-sm font-semibold uppercase">{{ options.name }}</span>
  </NuxtLink>
</template>
