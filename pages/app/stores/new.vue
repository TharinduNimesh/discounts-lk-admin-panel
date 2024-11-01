<script setup lang="ts">
import { type Store as StoreFormType } from "~/types";
import { storeValidation, sponsoredStoreValidation } from "~/schema";

const supabase = useSupabase();
const sponsorshipPeriods = ["1 Month", "3 Months", "6 Month", "1 Year"];

const { data: categories } = await supabase.from("store_categories").select();
categories?.push({ id: 999, name: "Other" });

const storeForm = ref<StoreFormType>({
  name: undefined,
  category: undefined,
  contactName: undefined,
  contactNumber: undefined,
  isSponsored: false,
  sponsorshipPeriod: undefined,
  pricing: undefined,
});

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
  {
    key: "openingHours",
    label: "Opening Hours",
  },
];

const branchesAddedData = [
  {
    id: 1,
    contact: "011-1114445",
    location: "Colombo",
    openingHours: "08:00 - 17:00",
  },
  {
    id: 2,
    contact: "011-1114445",
    location: "Gampaha",
    openingHours: "09:00 - 18:00",
  },
  {
    id: 3,
    contact: "011-1114445",
    location: "Ja-Ela",
    openingHours: "24 Hours",
  },
  {
    id: 4,
    contact: "011-2223333",
    location: "Kandy",
    openingHours: "10:00 - 19:00",
  },
  {
    id: 5,
    contact: "011-3334444",
    location: "Galle",
    openingHours: "08:00 - 17:00",
  },
];

async function saveStore() {}

async function getLocations(q: string) {
  const queries = makeQueries(q);

  const { data: cities } = await supabase
    .from("cities")
    .select()
    .ilikeAnyOf("name", queries)
    .limit(5);

  if (cities === null) {
    return [];
  }

  return cities;
}

function makeQueries(query: string) {
  return query.split(" ").map((item) => `%${item}%`);
}

const storeSchema = computed(() =>
  storeForm.value.isSponsored ? sponsoredStoreValidation : storeValidation
);
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
        <UForm :schema="storeSchema" :state="storeForm" class="mt-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="col-span-full grid lg:grid-cols-12 gap-3">
              <UFormGroup label="Store Name" name="name" class="lg:col-span-7">
                <UInput
                  placeholder="Store Name"
                  icon="material-symbols-light:shopping-cart"
                  v-model="storeForm.name"
                />
              </UFormGroup>

              <UFormGroup
                label="Store Category"
                name="category"
                class="lg:col-span-5"
              >
                <USelectMenu
                  icon="material-symbols-light:list-alt-add-sharp"
                  v-model="storeForm.category"
                  :options="categories || []"
                  placeholder="Select Category"
                  value-attribute="id"
                  option-attribute="name"
                />
              </UFormGroup>

              <UFormGroup
                label="Contact Name"
                name="contactName"
                class="lg:col-span-6"
              >
                <UInput
                  placeholder="Contact Name"
                  icon="material-symbols-light:manage-accounts"
                  v-model="storeForm.contactName"
                />
              </UFormGroup>

              <UFormGroup
                label="Contact Number"
                name="contactNumber"
                class="lg:col-span-6"
              >
                <UInput
                  placeholder="011- XXXXXXX"
                  icon="material-symbols-light:phone-enabled-sharp"
                  v-model="storeForm.contactNumber"
                />
              </UFormGroup>

              <UFormGroup label="Have Sponsorship" class="lg:col-span-2">
                <UToggle
                  size="lg"
                  class="mt-2"
                  v-model="storeForm.isSponsored"
                />
              </UFormGroup>

              <template v-if="storeForm.isSponsored">
                <UFormGroup
                  label="Sponsorship Period"
                  name="sponsorshipPeriod"
                  class="lg:col-span-5"
                >
                  <USelectMenu
                    :options="sponsorshipPeriods"
                    placeholder="60 Days"
                    icon="material-symbols-light:calendar-clock"
                    v-model="storeForm.sponsorshipPeriod"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Pricing"
                  name="pricing"
                  class="lg:col-span-5"
                >
                  <UInput
                    placeholder="Pricing"
                    icon="material-symbols-light:price-change-rounded"
                    v-model="storeForm.pricing"
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
                <USelectMenu
                  :searchable="getLocations"
                  by="id"
                  option-attribute="name"
                  placeholder="Location"
                  :debounce="300"
                  icon="icomoon-free:location"
                />
              </UFormGroup>

              <UFormGroup label="Contact Number" class="mt-6">
                <UInput
                  placeholder="011- XXXXXXX"
                  icon="material-symbols-light:phone-enabled-sharp"
                />
              </UFormGroup>

              <UFormGroup
                label="Opening Hours"
                help="Use All 12:00 AM to Display 24 Hours Open"
                class="mt-6"
              >
                <UTimeInput />
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
                class="lg:h-[350px] bg-white dark:bg-zinc-900 border border-gray-300/70 dark:border-gray-700/60 rounded-lg mt-5 overflow-scroll"
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
        </UForm>
      </UContent>
    </NuxtLayout>
  </div>
</template>
