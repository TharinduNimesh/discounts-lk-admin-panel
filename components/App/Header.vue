<script setup lang="ts">
const color = useColorMode();
const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      to: "/app/settings",
    },
  ],
  [
    {
      label: "Support",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      to: "/sign-in",
    },
  ],
];

function toggleTheme() {
  color.preference = color.preference === "light" ? "dark" : "light";
}
</script>

<template>
  <div
    class="w-full flex justify-between items-center border border-secondary-bkg dark:border-slate-900 bg-secondary-bkg rounded-xl shadow dark:shadow-black p-4"
  >
    <div class="flex items-center">
      <UButton
        icon="humbleicons:bars"
        color="gray"
        class="rounded-full"
        @click="$emit('toggle-sidebar', $event)"
      />
    </div>
    <div class="flex items-center gap-5">
      <div class="text-2xl" @click="toggleTheme()">
        <UButton
          v-show="$colorMode.value === 'light'"
          icon="ic:round-light-mode"
          class="rounded-full"
          variant="ghost"
          color="gray"
        />
        <UButton
          v-show="$colorMode.value === 'dark'"
          icon="ic:round-dark-mode"
          class="rounded-full"
          variant="ghost"
          color="gray"
        />
      </div>
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar
          class="border"
          src="https://avatars.githubusercontent.com/u/739984?v=4"
        />

        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
    </div>
  </div>
</template>
