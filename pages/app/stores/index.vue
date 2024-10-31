<template>
    <div>
        <NuxtLayout name="app">
            <UContent>
                <div class="flex flex-row gap-10 justify-between">
                    <div class="flex justify-start">
                        <h3 class="text-xl uppercase text-gray-800 dark:text-gray-200 font-semibold">
                            Manage Stores
                        </h3>
                    </div>
                    <div class="flex justify-end">
                        <UButton label="new Store" to="/app/stores/new" />
                    </div>
                </div>
            </UContent>
        </NuxtLayout>
    </div>
</template>