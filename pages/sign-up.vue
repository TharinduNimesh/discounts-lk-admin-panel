<script setup lang="ts">
import { SignUpValidation, type SignUpValidationType } from "~/schema";
import { type SignUpType as SignUpFormType } from "~/types";
import type { FormSubmitEvent } from "#ui/types";

const supabase = useSupabase();
const toast = useToast();
const router = useRouter();
const isLoading = ref(false);
const form = ref<SignUpFormType>({
  name: undefined,
  email: undefined,
  password: undefined,
});

async function signUp(event: FormSubmitEvent<SignUpValidationType>) {
  const data = event.data;

  isLoading.value = true;
  const { data: isExists } = await supabase.rpc("is_user_exists", {
    email_input: data.email,
  });

  if (isExists) {
    toast.add({
      title: "Error",
      description: "User already exists with this email",
      color: "red",
    });
    isLoading.value = false;
    return;
  }

  const { data: signUpResponse, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error !== null) {
    toast.add({
      title: "Error",
      description: error.message,
      color: "red",
    });
    isLoading.value = false;
    return;
  }

  if (signUpResponse === null || signUpResponse.user === null) {
    toast.add({
      title: "Error",
      description: "Error while setting up your account",
      color: "red",
    });
    isLoading.value = false;
    return;
  }

  localStorage.setItem("profile_changes", JSON.stringify({
    id: signUpResponse.user.id,
    name: data.name,
  }));

  toast.add({
    title: "Success",
    description: "Account created successfully",
    color: "green",
  });
  isLoading.value = false;
  router.push("/");
}
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
        <UForm
          :state="form"
          :schema="SignUpValidation"
          class="flex flex-col gap-4"
          @submit.prevent="signUp"
        >
          <UFormGroup label="Your Name" name="name">
            <UInput
              label="Name"
              placeholder="Enter your name"
              v-model="form.name"
              type="text"
              required
            />
          </UFormGroup>
          <UFormGroup label="Email Address" name="email">
            <UInput
              label="Email"
              placeholder="Enter your email"
              v-model="form.email"
              type="email"
              required
            />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <UInput
              label="Password"
              placeholder="Enter your password"
              v-model="form.password"
              type="password"
              required
            />
          </UFormGroup>
          <div class="flex justify-center">
            <UButton
              label="Request Access"
              variant="solid"
              type="submit"
              class="mt-1"
              :loading="isLoading"
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
