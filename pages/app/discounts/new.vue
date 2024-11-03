<script setup lang="ts">
import DateRangePicker from "~/components/U/DateRangePicker.vue";
import { discountValidation } from "~/schema";
import type { DiscountForm } from "~/types";

const form = ref<DiscountForm>({
  image: "",
  title: "",
  description: "",
  givenPrice: 0,
  price: 0,
  start_date: "",
  storeName: "",
  selectedBranch: [],
  type: "",
});

const branches = ["Branch 1", "Branch 2", "Branch 3", "Branch 4", "Branch 5"];

const supabase = useSupabase();
async function getStores(q: string) {
  const { data: stores } = await supabase
    .from("stores")
    .select()
    .ilike("name", `%${q}%`);
  return stores || [];
}

const selectedDiscountType = ref("");
const discountTypes = ["Sponsorship", "Exclusive", "Promotion"];
const isPriceEnabled = computed(() => {
  return selectedDiscountType.value === "Sponsorship" || selectedDiscountType.value === "Exclusive";
});

function onSubmit() {
  console.log(form.value);
}
</script>

<template>
  <div>
    <NuxtLayout name="app">
      <UContent>
        <div class="mt-4">
          <div class="flex flex-row gap-10 justify-between">
            <div class="flex justify-start">
              <h3
                class="text-xl uppercase text-gray-800 dark:text-gray-200 font-semibold"
              >
                Add New Discount
              </h3>
            </div>
            <div class="flex justify-end">
              <UButton label="Go Back" color="gray" @click="$router.back" />
            </div>
          </div>
        </div>
        <UForm :schema="discountValidation" :state="form" @submit="onSubmit">
          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Image">
              <UImagePicker />
            </UFormGroup>
            <div class="flex flex-col gap-3">
              <UFormGroup label="Title" name="title">
                <UInput
                  v-model="form.title"
                  placeholder="Add title"
                /> </UFormGroup
              ><UFormGroup label="Store Name" name="storeName">
                <USelectMenu
                  v-model="form.storeName"
                  :searchable="getStores"
                  placeholder="Search for a store..."
                  option-attribute="name"
                  value-attribute="id"
                />
              </UFormGroup>
              <UFormGroup label="Available Branches" name="availableBranches">
                <USelectMenu
                  v-model="form.selectedBranch"
                  :options="branches"
                  multiple
                  placeholder="Select branch"
                />
              </UFormGroup>
              <UFormGroup label="Price" name="price">
                <UInput v-model="form.price" />
              </UFormGroup>
            </div>
            <UFormGroup label="Time Period" name="start_date">
              <DateRangePicker />
            </UFormGroup>

            <UFormGroup label="Discount type" name="type">
              <div class="flex w-full">
                <USelectMenu
                  v-model="selectedDiscountType"
                  :options="discountTypes"
                  placeholder="Select a type"
                />
                <UInput v-model="form.givenPrice" :disabled="!isPriceEnabled"/>
              </div>
            </UFormGroup>

            <div class="col-span-full">
              <UFormGroup label="Description" name="description">
                <UEditor />
              </UFormGroup>
            </div>
          </div>
        </UForm>
      </UContent>
    </NuxtLayout>
  </div>
</template>
