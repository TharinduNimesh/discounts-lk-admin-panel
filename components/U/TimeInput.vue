<script setup lang="ts">
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

interface StateType {
  startTime: string | undefined;
  endTime: string | undefined;
}

const state = ref<StateType>({
  startTime: undefined,
  endTime: undefined,
});

watch(() => props.modelValue, (newModelValue) => {
  if (newModelValue === undefined) {
    state.value = {
      startTime: undefined,
      endTime: undefined,
    };
    return;
  }
})

watch(
  () => state.value,
  (newState) => {
    if (newState.startTime === undefined || newState.endTime === undefined) {
      return;
    }

    let openingTime = `${newState.startTime} - ${newState.endTime}`
    if (newState.startTime === "00:00" && newState.endTime === "00:00") {
      openingTime = '24 Hours'
    }

    emit("update:modelValue", openingTime);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex">
    <UInput
      type="time"
      class="w-full"
      placeholder="08:00 - 18:00"
      icon="material-symbols-light:calendar-clock"
      :ui="{ rounded: 'rounded-r-none' }"
      v-model="state.startTime"
    />
    <div class="px-3 grid place-items-center bg-gray-300 dark:bg-zinc-800">TO</div>
    <UInput
      type="time"
      class="w-full"
      placeholder="08:00 - 18:00"
      icon="material-symbols-light:calendar-clock"
      :ui="{ rounded: 'rounded-l-none' }"
      v-model="state.endTime"
    />
  </div>
</template>
