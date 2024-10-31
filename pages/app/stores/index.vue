<script setup lang="ts">
const sponsershipCategories = [
  "Grocery",
  "Restaurants",
  "Hotels",
  "Clothing",
  "Jwellery",
  "Service",
  "Other",
];

const isMoreShopInformationModelOpen = ref(false);
const isEditShopInformationModelOpen = ref(false);

const sponsershipSelected = ref(sponsershipCategories[0]);

const productListAction = [
  [
    {
      label: "More Information",
      icon: "flowbite:info-circle-outline",
      click: (row: (typeof totalShopData)[0]) =>
        (isMoreShopInformationModelOpen.value = true),
    },
  ],
  [
    {
      label: "Edit",
      icon: "material-symbols:edit-square-outline-rounded",
      click: (row: (typeof totalShopData)[0]) =>
        (isEditShopInformationModelOpen.value = true),
    },
    {
      label: "Remove",
      icon: "material-symbols:delete-outline-rounded",
    },
  ],
];

const branchListAction = [
  [
    {
      label: "Edit",
      icon: "material-symbols:edit-square-outline-rounded",
    },
  ],
  [
    {
      label: "Remove",
      icon: "material-symbols:delete-outline-rounded",
    },
  ],
];

const totalShopColumns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "name",
    label: "Shop Name",
  },
  {
    key: "contactName",
    label: "Contact Name",
  },
  {
    key: "contactNumber",
    label: "Contact Number",
  },
  {
    key: "branches",
    label: "Branches Count",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const totalShopData = [
  {
    id: 1,
    name: "Pizza Hut",
    contactName: "Sahan",
    contactNumber: "011-1141144",
    branches: "21",
    category: "Restaurants",
  },
  {
    id: 2,
    name: "Dominos",
    contactName: "Nihal",
    contactNumber: "011-1141144",
    branches: "12",
    category: "Restaurants",
  },
  {
    id: 3,
    name: "Thilakawardane",
    contactName: "Denula",
    contactNumber: "011-2241122",
    branches: "10",
    category: "Clothing",
  },
  {
    id: 4,
    name: "Fashion Bug",
    contactName: "Wihanga",
    contactNumber: "011-3341133",
    branches: "4",
    category: "Clothing",
  },
  {
    id: 5,
    name: "Buerger King",
    contactName: "Saman",
    contactNumber: "011-8841155",
    branches: "3",
    category: "Restaurants",
  },
];

const branchesAddedColumns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "contact",
    label: "Contact",
  },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "actions",
    label: "Actions",
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
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-3">
        <UContent>
          <div class="flex flex-col gap-3">
            <div class="mt-4">
              <div class="flex flex-row gap-10 justify-between">
                <div class="flex justify-start">
                  <h3
                    class="text-xl uppercase text-gray-800 dark:text-gray-200 font-semibold"
                  >
                    Manage Stores
                  </h3>
                </div>
                <div class="flex justify-end">
                  <UButton
                    color="black"
                    label="Add New Store"
                    icon="material-symbols:add"
                    to="/app/stores/new"
                  />
                </div>
              </div>
            </div>

            <div class="p-3 border border-primary/10 rounded-lg">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3"
              >
                <div
                  class="flex flex-col items-center p-5 rounded-lg bg-gray-200/30 dark:bg-gray-900/30 border border-primary/10"
                >
                  <div
                    class="w-10 h-10 flex justify-center items-center rounded-full bg-primary/20 text-primary"
                  >
                    <Icon name="ph:building-office-fill" class="text-xl" />
                  </div>
                  <h3
                    class="text-xs uppercase text-gray-500 font-semibold mt-2"
                  >
                    Total Stores
                  </h3>
                  <span class="text-xl font-bold"> 10 </span>
                </div>
                <div
                  class="flex flex-col items-center p-5 rounded-lg bg-gray-200/30 dark:bg-gray-900/30 border border-primary/10"
                >
                  <div
                    class="w-10 h-10 flex justify-center items-center rounded-full bg-primary/20 text-primary"
                  >
                    <Icon name="ph:building-office-fill" class="text-xl" />
                  </div>
                  <h3
                    class="text-xs uppercase text-gray-500 font-semibold mt-2"
                  >
                    Total Sponsored Store
                  </h3>
                  <span class="text-xl font-bold"> 07 </span>
                </div>
              </div>
            </div>

            <UTable :columns="totalShopColumns" :rows="totalShopData">
              <template #actions-data="{ row }">
                <div class="flex gap-3">
                  <UDropdown
                    :items="productListAction"
                    :ui="{
                      item: {
                        disabled: 'cursor-text select-text',
                      },
                    }"
                    :popper="{
                      placement: 'bottom-start',
                      arrow: true,
                    }"
                  >
                    <UButton
                      icon="solar:menu-dots-bold"
                      variant="ghost"
                      color="gray"
                    />
                  </UDropdown>
                </div>
              </template>
            </UTable>
          </div>
        </UContent>

        <UModal v-model="isMoreShopInformationModelOpen">
          <UCard
            :ui="{
              ring: '',
            }"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">Store Information</h3>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-my-1"
                  @click="isMoreShopInformationModelOpen = false"
                />
              </div>
            </template>

            <div class="grid grid-cols-1 gap-4 mt-3">
              <div class="grid grid-cols-1 gap-3">
                <UContent>
                  <div class="flex flex-col justify-between">
                    <div class="flex flex-col">
                      <h3
                        class="text-xl text-gray-800 dark:text-gray-200 font-semibold"
                      >
                        Store
                      </h3>
                    </div>
                  </div>

                  <hr class="mt-1" />

                  <UFormGroup label="Store Category" class="mt-6">
                    <UInput
                      placeholder="Category"
                      icon="material-symbols-light:list-alt-add-sharp"
                    />
                  </UFormGroup>

                  <UFormGroup label="Store Name" class="mt-6">
                    <UInput
                      placeholder="Store Name"
                      icon="material-symbols-light:shopping-cart"
                    />
                  </UFormGroup>

                  <UFormGroup label="Contact Name" class="mt-6">
                    <UInput
                      placeholder="Contact Name"
                      icon="material-symbols-light:manage-accounts"
                    />
                  </UFormGroup>

                  <UFormGroup label="Contact Number" class="mt-6">
                    <UInput
                      placeholder="011- XXXXXXX"
                      icon="material-symbols-light:phone-enabled-sharp"
                    />
                  </UFormGroup>

                  <div class="flex flex-col gap-3 mt-10">
                    <h3
                      class="text-lg text-gray-800 dark:text-gray-200 font-semibold"
                    >
                      Sponserships
                    </h3>
                  </div>

                  <hr class="mt-1" />

                  <UFormGroup label="Have Sponsership" class="mt-6">
                    <div class="flex flex-row gap-10 mt-4">
                      <UCheckbox label="Yes" :model-value="false" />
                      <UCheckbox label="No" :model-value="false" />
                    </div>
                  </UFormGroup>

                  <UFormGroup label="Sponsership Period" class="mt-6">
                    <UInput
                      placeholder="60 Days"
                      icon="material-symbols-light:calendar-clock"
                    />
                  </UFormGroup>
                </UContent>

                <UContent>
                  <div class="flex flex-col gap-3">
                    <h3
                      class="text-lg text-gray-800 dark:text-gray-200 font-semibold"
                    >
                      Branches
                    </h3>
                  </div>

                  <hr class="mt-1" />

                  <UTable
                    :columns="branchesAddedColumns"
                    :rows="branchesAddedData"
                  />
                </UContent>
              </div>
            </div>

            <template #footer>
              <div class="flex justify-end gap-3">
                <UButton
                  label="Close"
                  color="gray"
                  @click="isMoreShopInformationModelOpen = false"
                />
              </div>
            </template>
          </UCard>
        </UModal>

        <!-- EditBranchInformationModel -->

        <UModal v-model="isEditShopInformationModelOpen">
          <UCard
            :ui="{
              ring: '',
            }"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">Edit Store Information</h3>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-my-1"
                  @click="isEditShopInformationModelOpen = false"
                />
              </div>
            </template>

            <div class="grid grid-cols-1 gap-4 mt-6">
              <div class="grid grid-cols-1 gap-3">
                <UContent>
                  <div class="flex flex-col justify-between">
                    <div class="flex flex-col">
                      <h3
                        class="text-xl text-gray-800 dark:text-gray-200 font-semibold"
                      >
                        Store
                      </h3>
                    </div>
                  </div>

                  <hr class="mt-1" />

                  <UFormGroup label="Store Category" class="mt-6">
                    <USelectMenu
                      icon="material-symbols-light:list-alt-add-sharp"
                      class="mt-2"
                      v-model="sponsershipSelected"
                      :options="sponsershipCategories"
                      multiple
                      placeholder="Select Category"
                    />
                  </UFormGroup>

                  <UFormGroup label="Store Name" class="mt-6">
                    <UInput
                      placeholder="Store Name"
                      icon="material-symbols-light:shopping-cart"
                    />
                  </UFormGroup>

                  <UFormGroup label="Contact Name" class="mt-6">
                    <UInput
                      placeholder="Contact Name"
                      icon="material-symbols-light:manage-accounts"
                    />
                  </UFormGroup>

                  <UFormGroup label="Contact Number" class="mt-6">
                    <UInput
                      placeholder="011- XXXXXXX"
                      icon="material-symbols-light:phone-enabled-sharp"
                    />
                  </UFormGroup>

                  <div class="flex flex-col gap-3 mt-10">
                    <h3
                      class="text-lg text-gray-800 dark:text-gray-200 font-semibold"
                    >
                      Sponserships
                    </h3>
                  </div>

                  <hr class="mt-1" />

                  <UFormGroup label="Have Sponsership" class="mt-6">
                    <div class="flex flex-row gap-10 mt-4">
                      <UCheckbox label="Yes" :model-value="false" />
                      <UCheckbox label="No" :model-value="false" />
                    </div>
                  </UFormGroup>

                  <UFormGroup label="Sponsership Period" class="mt-6">
                    <UInput
                      placeholder="60 Days"
                      icon="material-symbols-light:calendar-clock"
                    />
                  </UFormGroup>

                  <UFormGroup label="Pricing" class="mt-6">
                    <UInput
                      placeholder="Pricing"
                      icon="material-symbols-light:price-change-rounded"
                    />
                  </UFormGroup>
                </UContent>

                <UContent>
                  <div class="flex flex-col justify-between">
                    <div class="flex flex-col">
                      <h3
                        class="text-xl text-gray-800 dark:text-gray-200 font-semibold"
                      >
                        Branches
                      </h3>
                    </div>
                  </div>

                  <hr class="mt-1" />

                  <UFormGroup label="Location" class="mt-6">
                    <UInput
                      placeholder="Location"
                      icon="icomoon-free:location"
                    />
                  </UFormGroup>

                  <UFormGroup label="Contact Name" class="mt-6">
                    <UInput
                      placeholder="Contact Name"
                      icon="material-symbols-light:manage-accounts"
                    />
                  </UFormGroup>

                  <UFormGroup label="Contact Number" class="mt-6">
                    <UInput
                      placeholder="011- XXXXXXX"
                      icon="material-symbols-light:phone-enabled-sharp"
                    />
                  </UFormGroup>

                  <UFormGroup label="Opening Hours" class="mt-6">
                    <UInput
                      placeholder="08:00 - 18:00"
                      icon="material-symbols-light:calendar-clock"
                    />
                  </UFormGroup>

                  <div class="flex justify-end mt-8 gap-3">
                    <UButton variant="solid">Save Branch</UButton>
                  </div>
                </UContent>

                <UContent>
                  <div class="flex flex-col gap-3">
                    <h3
                      class="text-lg text-gray-800 dark:text-gray-200 font-semibold"
                    >
                      Branches Added
                    </h3>
                  </div>

                  <hr class="mt-1" />

                  <UTable
                    :columns="branchesAddedColumns"
                    :rows="branchesAddedData"
                  >
                    <template #actions-data="{ row }">
                      <div class="flex gap-3">
                        <UDropdown
                          :items="branchListAction"
                          :ui="{
                            item: {
                              disabled: 'cursor-text select-text',
                            },
                          }"
                          :popper="{
                            placement: 'bottom-start',
                            arrow: true,
                          }"
                        >
                          <UButton
                            icon="solar:menu-dots-bold"
                            variant="ghost"
                            color="gray"
                          />
                        </UDropdown>
                      </div>
                    </template>
                  </UTable>

                  <div class="flex justify-end mt-8 gap-3">
                    <UButton color="gray">Clear</UButton>
                    <UButton variant="solid">Update Store</UButton>
                  </div>
                </UContent>
              </div>
            </div>

            <template #footer>
              <div class="flex justify-end gap-3">
                <UButton
                  label="Close"
                  color="gray"
                  @click="isEditShopInformationModelOpen = false"
                />
                <UButton label="Save" />
              </div>
            </template>
          </UCard>
        </UModal>
      </div>
    </NuxtLayout>
  </div>
</template>
