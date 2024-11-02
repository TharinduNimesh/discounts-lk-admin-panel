<script setup lang="ts">
import { signInValidation, type SignInValidationType } from "~/schema";
import type { SignInType } from "~/types";
import { type FormSubmitEvent } from "#ui/types";

const supabase = useSupabase();
const toast = useToast();
const router = useRouter();

const isLoading = ref(false);
const form = ref<SignInType>({
  email: undefined,
  password: undefined,
});

async function signIn(event: FormSubmitEvent<SignInValidationType>) {
  const data = event.data;

  isLoading.value = true;
  const { data: signInResponse, error } =
    await supabase.auth.signInWithPassword(data);

  if (error !== null) {
    toast.add({
      title: "Error",
      description: error.message,
      color: "red",
    });
    isLoading.value = false;
    return;
  }

  if (signInResponse.user === null) {
    toast.add({
      title: "Error",
      description: "Somthing went wrong",
      color: "red",
    });
    isLoading.value = false;
    return;
  }

  const unsavedUser = localStorage.getItem("profile_changes");
  if (unsavedUser !== null) {
    const user = JSON.parse(unsavedUser);
    if (user.id === signInResponse.user.id) {
      await supabase
        .from("profile")
        .update({
          name: user.name,
        })
        .eq("id", user.id);
      localStorage.removeItem("profile_changes");
    }
  }

  isLoading.value = false;
  router.push("/app/dashboard");
}
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
        <UForm
          :state="form"
          :schema="signInValidation"
          class="flex flex-col gap-4"
          @submit.prevent="signIn"
        >
          <UFormGroup label="Email Address" name="email">
            <UInput
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
              label="Sign In"
              variant="solid"
              class="mt-5"
              type="submit"
              :loading="isLoading"
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
