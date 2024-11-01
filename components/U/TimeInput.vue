<template>
  <div class="flex">
    <UInput
      type="time"
      class="w-full"
      placeholder="08:00 - 18:00"
      icon="material-symbols-light:calendar-clock"
      :ui="{ rounded: 'rounded-r-none' }"
    />
    <div class="px-3 grid place-items-center bg-zinc-800">TO</div>
    <UInput
      type="time"
      class="w-full"
      placeholder="08:00 - 18:00"
      icon="material-symbols-light:calendar-clock"
      :ui="{ rounded: 'rounded-l-none' }"
    />
  </div>
</template>
