<template>
  <div>
    <NuxtLayout name="app">
      <UContent>
        <div class="flex justify-between">
          <h1 class="text-xl text-gray-800 dark:text-gray-200 font-semibold uppercase">Manage Discounts</h1>

          <UButton
            color="black"
            label="Add New Discount"
            icon="material-symbols:add"
            to="/app/discounts/new"
          />
        </div>
      </UContent>
    </NuxtLayout>
  </div>
</template>
