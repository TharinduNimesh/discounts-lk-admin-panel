<script setup lang="ts">
import {
  type Store as StoreFormType,
  type Branch as BranchFormType,
} from "~/types";
import {
  storeValidation,
  sponsoredStoreValidation,
  BranchValidation,
  type Branch,
  type SponsoredStoreSchema,
} from "~/schema";
import type { FormSubmitEvent } from "#ui/types";

interface BranchListItem extends Branch {
  id: number;
}

const toast = useToast();
const supabase = useSupabase();
const sponsorshipPeriods = [
  { value: 1, label: "1 Month" },
  { value: 3, label: "3 Months" },
  { value: 6, label: "6 Months" },
  { value: 12, label: "1 Year" },
];
const branches = ref<BranchListItem[]>([]);

const { data: categories } = await supabase.from("store_categories").select();
categories?.push({ id: 999, name: "Other" });

const isLoading = ref(false);
const storeForm = ref<StoreFormType>({
  name: undefined,
  category: undefined,
  contactName: undefined,
  contactNumber: undefined,
  isSponsored: false,
  sponsorshipPeriod: undefined,
  pricing: undefined,
});

const branchForm = ref<BranchFormType>({
  location: undefined,
  contactNumber: undefined,
  openingHours: undefined,
});

const branchesTableAction = (row: BranchFormType) => [
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => removeBranch(row.id || 0),
    },
  ],
];

const branchesAddedColumns = [
  {
    key: "location.name",
    label: "Location",
  },
  {
    key: "contactNumber",
    label: "Contact",
  },
  {
    key: "openingHours",
    label: "Opening Hours",
  },
  {
    key: "action",
    icon: "material-symbols:help-outline-rounded",
  },
];

function onSubmit(event: FormSubmitEvent<SponsoredStoreSchema>) {
  const form = event.data;

  if (branches.value.length === 0) {
    toast.add({
      title: "Branches Are Empty",
      description:
        "You doesn't have added any branches to this store. it's mean this store is not visible publically through the app.",
      color: "orange",
      timeout: 0,
      actions: [
        {
          variant: "solid",
          color: "primary",
          label: "Continue Without Branches",
          click: () => saveStore(form),
        },
        { color: "gray", label: "Cancel" },
      ],
      ui: { description: "leading-6" },
    });

    return;
  }

  toast.add({
    title: "Confirm Request",
    description:
      "Are you sure you want to save this store? Once you saved this store, it can publically accessible.",
    color: "green",
    timeout: 0,
    actions: [
      {
        variant: "solid",
        color: "green",
        label: "Save Store",
        click: () => saveStore(form),
      },
      { color: "gray", label: "Cancel" },
    ],
    ui: { description: "leading-6" },
  });
}

async function saveStore(form: SponsoredStoreSchema) {
  isLoading.value = true;
  const { data: publishedStore } = await supabase
    .from("stores")
    .insert([
      {
        name: form.name,
        category_id: form.category,
        contact_name: form.contactName,
        contact_number: form.contactNumber,
      },
    ])
    .select()
    .single();

  if (publishedStore === null) {
    toast.add({
      title: "Failed to Save Store",
      description: "Something went wrong while saving the store.",
      color: "red",
    });
    isLoading.value = false;
    return;
  }

  const storeId = publishedStore.id;
  if (storeForm.value.isSponsored) {
    await supabase.from("sponsored_stores").insert([
      {
        store_id: storeId,
        price: Number(form.pricing),
        ended_at: new Date(
          new Date().setMonth(new Date().getMonth() + form.sponsorshipPeriod)
        ).toISOString(),
      },
    ]);
  }

  if (branches.value.length <= 0) {
    isLoading.value = false;
    toast.add({
      title: "Store Saved",
      description: "Store saved successfully.",
      color: "green",
    });
    return;
  }

  const branchesData = branches.value.map((branch) => ({
    store_id: storeId,
    city_id: branch.location.id,
    contact_number: branch.contactNumber,
    opening_hours: branch.openingHours,
  }));

  await supabase.from("branches").insert(branchesData);

  toast.add({
    title: "Store Saved",
    description: "Store saved successfully.",
    color: "green",
  });
  clearForm();
  isLoading.value = false;
}

function addBranch(event: FormSubmitEvent<Branch>) {
  const form = event.data;
  branches.value.push({ id: Date.now(), ...form });
}

function removeBranch(id: number) {
  branches.value = branches.value.filter((branch) => branch.id !== id);
}

function clearForm() {
  storeForm.value = {
    name: undefined,
    category: undefined,
    contactName: undefined,
    contactNumber: undefined,
    isSponsored: false,
    sponsorshipPeriod: undefined,
    pricing: undefined,
  };
  branchForm.value = {
    location: undefined,
    contactNumber: undefined,
    openingHours: undefined,
  };
  branches.value = [];
}

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
        <UForm
          :schema="storeSchema"
          :state="storeForm"
          @submit="onSubmit"
          class="mt-3"
        >
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
                    value-attribute="value"
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
              <UForm
                :state="branchForm"
                :schema="BranchValidation"
                @submit.prevent="addBranch"
                class="grid gap-y-6"
              >
                <UFormGroup label="Location" class="mt-3" name="location">
                  <USelectMenu
                    :searchable="getLocations"
                    by="id"
                    option-attribute="name"
                    placeholder="Location"
                    :debounce="300"
                    icon="icomoon-free:location"
                    v-model="branchForm.location"
                  />
                </UFormGroup>

                <UFormGroup label="Contact Number" name="contactNumber">
                  <UInput
                    placeholder="011- XXXXXXX"
                    icon="material-symbols-light:phone-enabled-sharp"
                    v-model="branchForm.contactNumber"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Opening Hours"
                  help="Use 12:00 AM on both to Display 24 Hours Open"
                  name="openingHours"
                >
                  <UTimeInput v-model="branchForm.openingHours" />
                </UFormGroup>

                <div class="flex justify-end mt-2 gap-3">
                  <UButton
                    color="black"
                    type="submit"
                    variant="solid"
                    icon="material-symbols:arrow-right-alt-rounded"
                    trailing
                  >
                    Add
                  </UButton>
                </div>
              </UForm>
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
                <UTable :columns="branchesAddedColumns" :rows="branches">
                  <template #action-header>
                    <div class="flex items-center">
                      <Icon name="material-symbols:help-outline-rounded" />
                    </div>
                  </template>
                  <template #action-data="{ row }">
                    <UDropdown
                      :popper="{ arrow: true }"
                      :items="branchesTableAction(row as BranchFormType)"
                    >
                      <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-ellipsis-horizontal-20-solid"
                      />
                    </UDropdown>
                  </template>
                </UTable>
              </div>

              <div class="flex justify-end mt-8 gap-3">
                <UButton color="gray" @click="clearForm">Clear</UButton>
                <UButton
                  icon="material-symbols:save-rounded"
                  variant="solid"
                  type="submit"
                  :loading="isLoading"
                >
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
