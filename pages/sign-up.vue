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
      name: '',
      email: '',
      number: '',
      password: ''
    };
  }
};
</script>

<template>
  <div class="w-full min-h-screen flex justify-center items-center bg-cover bg-center p-5">
    <div class="w-full max-w-[400px] grid grid-cols-1 lg:grid-cols-1 bg-white shadow-lg rounded-lg">
      <div class="flex flex-col rounded-l-lg text-gray-800 p-8">
        <h1 class="text-2xl font-bold uppercase text-center">Welcome</h1>
        <UDivider class="my-5" />
        <UForm class="mt-1">
          <UInput  label="Name" placeholder="Enter your name" v-model="name" type="text" required />
          <UInput class="mt-4" label="Email" placeholder="Enter your email" v-model="email" type="email" required />
          <UInput class="mt-4" label="Mobile" placeholder="Enter your mobile number" v-model="number" type="mobile" required />
          <UInput class="mt-4" label="Password" placeholder="Enter your password" v-model="password" type="password" required />
            <div class="flex justify-center">
            <UButton label="Request Access" variant="solid" class="mt-5" />
            </div>
        </UForm>
        <div class="flex flex-col items-center mt-5">
          <span>Have an account?</span>
          <NuxtLink class="text-blue-500" to="/">
            Go to Sign In
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>