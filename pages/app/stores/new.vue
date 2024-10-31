<script setup lang="ts">
const isSponsored = ref(false);
const sponsershipCategories = [
  "Grocery",
  "Restaurants",
  "Hotels",
  "Clothing",
  "Jwellery",
  "Service",
  "Other",
];
const sponsorshipPeriods = ["1 Month", "3 Months", "6 Month", "1 Year"];

const sponsershipSelected = ref(sponsershipCategories[0]);

const branchesAddedColumns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "contact",
    label: "Contact",
  },
];

const branchesAddedData = [
  {
    id: 1,
    contact: "011-1114445",
    location: "Colombo",
  },
  {
    id: 2,
    contact: "011-1114445",
    location: "Gampaha",
  },
  {
    id: 3,
    contact: "011-1114445",
    location: "Ja-Ela",
  },
];
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
                Add New Store
              </h3>
            </div>
            <div class="flex justify-end">
              <UButton label="Go Back" color="gray" @click="$router.back" />
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="col-span-full grid lg:grid-cols-12 gap-3">
              <UFormGroup label="Store Name" class="lg:col-span-7">
                <UInput
                  placeholder="Store Name"
                  icon="material-symbols-light:shopping-cart"
                />
              </UFormGroup>

              <UFormGroup label="Store Category" class="lg:col-span-5">
                <USelectMenu
                  icon="material-symbols-light:list-alt-add-sharp"
                  v-model="sponsershipSelected"
                  :options="sponsershipCategories"
                  placeholder="Select Category"
                  multiple
                />
              </UFormGroup>

              <UFormGroup label="Contact Name" class="lg:col-span-6">
                <UInput
                  placeholder="Contact Name"
                  icon="material-symbols-light:manage-accounts"
                />
              </UFormGroup>

              <UFormGroup label="Contact Number" class="lg:col-span-6">
                <UInput
                  placeholder="011- XXXXXXX"
                  icon="material-symbols-light:phone-enabled-sharp"
                />
              </UFormGroup>

              <UFormGroup label="Have Sponsorship" class="lg:col-span-2">
                <UToggle size="lg" class="mt-2" v-model="isSponsored" />
              </UFormGroup>

              <template v-if="isSponsored">
                <UFormGroup label="Sponsorship Period" class="lg:col-span-5">
                  <USelectMenu
                    :options="sponsorshipPeriods"
                    placeholder="60 Days"
                    icon="material-symbols-light:calendar-clock"
                  />
                </UFormGroup>

                <UFormGroup label="Pricing" class="lg:col-span-5">
                  <UInput
                    placeholder="Pricing"
                    icon="material-symbols-light:price-change-rounded"
                  />
                </UFormGroup>
              </template>
            </div>

            <div class="mt-4">
              <div class="flex flex-col justify-between">
                <div class="flex flex-col">
                  <h3
                    class="text-xl text-gray-800 dark:text-gray-200 font-semibold"
                  >
                    Branches
                  </h3>
                </div>
              </div>

              <UDivider class="my-1" />

              <UFormGroup label="Location" class="mt-6">
                <UInput placeholder="Location" icon="icomoon-free:location" />
              </UFormGroup>

              <UFormGroup label="Contact Number" class="mt-6">
                <UInput
                  placeholder="011- XXXXXXX"
                  icon="material-symbols-light:phone-enabled-sharp"
                />
              </UFormGroup>

              <UFormGroup label="Opening Hours" class="mt-6">
                <UInput
                  type="time"
                  placeholder="08:00 - 18:00"
                  icon="material-symbols-light:calendar-clock"
                />
              </UFormGroup>

              <div class="flex justify-end mt-8 gap-3">
                <UButton
                  color="black"
                  variant="solid"
                  icon="material-symbols:arrow-right-alt-rounded"
                  trailing
                  >Add</UButton
                >
              </div>
            </div>

            <div class="mt-4">
              <div class="flex flex-col gap-3">
                <h3
                  class="text-lg text-gray-800 dark:text-gray-200 font-semibold"
                >
                  Branches Added
                </h3>
              </div>

              <UDivider class="my-1" />

              <div
                class="lg:h-[320px] bg-white dark:bg-zinc-900 border border-gray-300/70 dark:border-gray-700/60 rounded-lg mt-5"
              >
                <UTable
                  :columns="branchesAddedColumns"
                  :rows="branchesAddedData"
                />
              </div>

              <div class="flex justify-end mt-8 gap-3">
                <UButton color="gray">Clear</UButton>
                <UButton icon="material-symbols:save-rounded" variant="solid">
                  Save This Store
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </UContent>
    </NuxtLayout>
  </div>
</template>
