<!-- <template>
  <div>
    <UContainer class="py-5">
      <h1>Sign In</h1>
      <p>Go to <UButton variant="link" label="Sign Up" to="/sign-up" /></p>
      <p>Go to <UButton variant="link" label="Dashboard" to="/app/dashboard" /></p>
    </UContainer>
  </div>
</template> -->

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<template>
  <div
    class="w-full min-h-screen bg-slate-100 dark:bg-black text-gray-700 dark:text-slate-300 flex justify-center items-center bg-cover bg-center p-5"
  >
    <div
      class="w-full max-w-[400px] grid grid-cols-1 lg:grid-cols-1 bg-white dark:bg-zinc-950 shadow-lg rounded-lg"
    >
      <div class="flex flex-col rounded-l-lg p-8">
        <h1 class="text-2xl font-bold uppercase text-center">Welcome Back</h1>
        <UDivider class="my-5" />
        <UForm class="flex flex-col gap-4">
          <UFormGroup label="Email Address">
            <UInput
              placeholder="Enter your email"
              v-model="email"
              type="email"
              required
            />
          </UFormGroup>
          <UFormGroup label="Password">
            <UInput
              label="Password"
              placeholder="Enter your password"
              v-model="password"
              type="password"
              required
            />
          </UFormGroup>
          <div class="flex justify-center">
            <UButton
              label="Sign In"
              variant="solid"
              class="mt-5"
              to="/app/dashboard"
              block
            />
          </div>
        </UForm>
        <div class="flex flex-col items-center mt-5">
          <span>Don't have an account?</span>
          <NuxtLink class="text-primary" to="/sign-up"> Need Access </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
