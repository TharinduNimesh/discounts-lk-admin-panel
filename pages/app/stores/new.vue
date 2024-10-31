<script setup lang="ts">
const sponsershipCategories = ['Grocery', 'Restaurants', 'Hotels', 'Clothing', 'Jwellery','Service','Other']

const sponsershipSelected = ref(sponsershipCategories[0]);

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
                    <UContent>
                        <div class="flex flex-row gap-10 justify-between">
                            <div class="flex justify-start">
                                <h3 class="text-xl uppercase text-gray-800 dark:text-gray-200 font-semibold">
                                    Add New Store
                                </h3>
                            </div>
                            <div class="flex justify-end">
                                <UButton label="Go Back" color="gray" @click="$router.back" />
                            </div>
                        </div>
                    </UContent>

                </div>
                <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 mt-6">
                    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
                        <UContent>

                            <div class="flex flex-col justify-between">
                                <div class="flex flex-col">
                                    <h3 class="text-xl text-gray-800 dark:text-gray-200 font-semibold">
                                        Store
                                    </h3>
                                </div>
                            </div>

                            <hr class="mt-1" />

                            <UFormGroup label="Store Category" class="mt-6">
                                <USelectMenu icon="material-symbols-light:list-alt-add-sharp" class="mt-2"
                                    v-model="sponsershipSelected" :options="sponsershipCategories" multiple
                                    placeholder="Select Category" />
                            </UFormGroup>

                            <UFormGroup label="Store Name" class="mt-6">
                                <UInput placeholder="Store Name" icon="material-symbols-light:shopping-cart" />
                            </UFormGroup>

                            <UFormGroup label="Contact Name" class="mt-6">
                                <UInput placeholder="Contact Name" icon="material-symbols-light:manage-accounts" />
                            </UFormGroup>

                            <UFormGroup label="Contact Number" class="mt-6">
                                <UInput placeholder="011- XXXXXXX" icon="material-symbols-light:phone-enabled-sharp" />
                            </UFormGroup>

                            <div class="flex flex-col gap-3 mt-10">
                                <h3 class="text-lg text-gray-800 dark:text-gray-200 font-semibold">
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
                                <UInput placeholder="60 Days" icon="material-symbols-light:calendar-clock" />
                            </UFormGroup>

                            <UFormGroup label="Pricing" class="mt-6">
                                <UInput placeholder="Pricing" icon="material-symbols-light:price-change-rounded" />
                            </UFormGroup>

                        </UContent>

                        <UContent>

                            <div class="flex flex-col justify-between">
                                <div class="flex flex-col">
                                    <h3 class="text-xl text-gray-800 dark:text-gray-200 font-semibold">
                                        Branches
                                    </h3>
                                </div>
                            </div>

                            <hr class="mt-1" />

                            <UFormGroup label="Location" class="mt-6">
                                <UInput placeholder="Location" icon="icomoon-free:location" />
                            </UFormGroup>

                            <UFormGroup label="Contact Name" class="mt-6">
                                <UInput placeholder="Contact Name" icon="material-symbols-light:manage-accounts" />
                            </UFormGroup>

                            <UFormGroup label="Contact Number" class="mt-6">
                                <UInput placeholder="011- XXXXXXX" icon="material-symbols-light:phone-enabled-sharp" />
                            </UFormGroup>

                            <UFormGroup label="Opening Hours" class="mt-6">
                                <UInput placeholder="08:00 - 18:00" icon="material-symbols-light:calendar-clock" />
                            </UFormGroup>

                            <div class="flex justify-end  mt-8 gap-3">
                                <UButton variant="solid">Save Branch</UButton>
                            </div>
                        </UContent>

                        <UContent>
                            <div class="flex flex-col gap-3">
                                <h3 class="text-lg text-gray-800 dark:text-gray-200 font-semibold">
                                    Branches Added
                                </h3>
                            </div>

                            <hr class="mt-1" />

                            <UTable :columns="branchesAddedColumns" :rows="branchesAddedData" />

                            <div class="flex justify-end  mt-8 gap-3">
                                <UButton color="gray">Clear</UButton>
                                <UButton variant="solid">Save Store</UButton>
                            </div>

                        </UContent>

                    </div>
                </div>

            </UContent>
        </NuxtLayout>
    </div>
</template>