<script setup lang="ts">
import { add, format, isSameDay, type Duration } from "date-fns";

const emit = defineEmits(["datechange"]);
const ranges = [
  { label: "Next 7 days", duration: { days: 7 } },
  { label: "Next 14 days", duration: { days: 14 } },
  { label: "Next 30 days", duration: { days: 30 } },
  { label: "Next 3 months", duration: { months: 3 } },
  { label: "Next 6 months", duration: { months: 6 } },
  { label: "Next year", duration: { years: 1 } },
];
const selected = ref({ start: new Date(), end: add(new Date(), { days: 14 }) });
watch(selected, () => {
  emit("datechange", selected.value);
});

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected.value.start, new Date()) &&
    isSameDay(selected.value.end, add(new Date(), duration))
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: new Date(), end: add(new Date(), duration) };
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" color="gray" block>
      {{ format(selected.start, "d MMM, yyy") }} -
      {{ format(selected.end, "d MMM, yyy") }}
    </UButton>

    <template #panel="{ close }">
      <div
        class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
      >
        <div class="hidden sm:flex flex-col py-4">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="gray"
            variant="ghost"
            class="rounded-none px-6"
            :class="[
              isRangeSelected(range.duration)
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
            ]"
            truncate
            @click="selectRange(range.duration)"
          />
        </div>

        <UDatePicker v-model="selected" @close="close" />
      </div>
    </template>
  </UPopover>
</template>
