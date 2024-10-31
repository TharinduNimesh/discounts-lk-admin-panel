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
      name: "",
      email: "",
      number: "",
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
      <div class="flex flex-col p-8">
        <h1 class="text-2xl font-bold uppercase text-center">Get Started</h1>
        <UDivider class="my-5" />
        <UForm class="flex flex-col gap-4">
          <UFormGroup label="Your Name">
            <UInput
              label="Name"
              placeholder="Enter your name"
              v-model="name"
              type="text"
              required
            />
          </UFormGroup>
          <UFormGroup label="Email Address">
            <UInput
              label="Email"
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
              label="Request Access"
              variant="solid"
              class="mt-1"
              block
            />
          </div>
        </UForm>
        <div class="flex flex-col items-center mt-5">
          <span>Already Have an account?</span>
          <NuxtLink class="text-primary" to="/">Go to Sign In</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
