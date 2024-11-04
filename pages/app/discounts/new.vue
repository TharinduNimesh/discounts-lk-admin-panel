<script setup lang="ts">
import { discountValidation, type DiscountValidationSchema } from "~/schema";
import type { DiscountForm } from "~/types";
import { type FormSubmitEvent } from "#ui/types";

interface Branch {
  id: number;
  location: string;
  opening_hours: string;
}

interface AIResponse {
  prompt: string;
  output: string;
}

const isLoading = ref(false);
const isTitleGenerating = ref(false);
const isBranchesLoading = ref(false);

const toast = useToast();
const config = useRuntimeConfig();
const form = ref<DiscountForm>({
  image: undefined,
  title: undefined,
  description: undefined,
  givenPrice: 0, // for sponsorship and exclusive
  price: 0,
  start_date: undefined,
  end_date: undefined,
  store: undefined,
  selectedBranch: [],
  discountType: undefined,
});

const branches = ref<Branch[]>([]);
const supabase = useSupabase();

const discountTypes = ["Sponsorship", "Exclusive", "Promotion"];

const isPriceEnabled = computed(() => {
  return (
    form.value.discountType === "Sponsorship" ||
    form.value.discountType === "Exclusive"
  );
});

const ableToGenerateDescription = computed(() => {
  return (
    (form.value.title &&
      form.value.store &&
      form.value.price &&
      form.value.start_date &&
      form.value.selectedBranch.length > 0) ||
    false
  );
});

watch(
  () => form.value.store,
  async () => {
    if (!form.value.store) {
      return;
    }

    isBranchesLoading.value = true;
    branches.value = [];
    const { data } = await supabase
      .from("branches")
      .select("id, opening_hours, cities(name)")
      .eq("store_id", form.value.store.id);
    data &&
      data.length > 0 &&
      data.forEach((branch) =>
        branches.value.push({
          id: branch.id,
          location: branch.cities?.name || "",
          opening_hours: branch.opening_hours,
        })
      );
    isBranchesLoading.value = false;
  }
);

async function getStores(q: string) {
  const { data: stores } = await supabase
    .from("stores")
    .select("id, name, category_id")
    .ilike("name", `%${q}%`);
  return stores || [];
}

async function generateTitle() {
  isTitleGenerating.value = true;
  try {
    const data = await $fetch<AIResponse>(
      `${config.public.edgeUrl}/api/AI/optimize-title`,
      {
        method: "POST",
        body: JSON.stringify({ title: form.value.title }),
      }
    );

    form.value.title = data.output;
  } catch (error) {
    console.log(error);
    toast.add({
      title: "Error",
      description: "Failed to generate title",
      color: "red",
    });
  } finally {
    isTitleGenerating.value = false;
  }
}

async function generateDescription() {
  isTitleGenerating.value = true;
  try {
    const data = await $fetch<AIResponse>(
      `${config.public.edgeUrl}/api/AI/generate-description`,
      {
        method: "POST",
        body: JSON.stringify({
          title: form.value.title,
          store_name: form.value.store?.name,
          locations: form.value.selectedBranch.map((branch) => ({
            location: branch.location,
            opening_hours: branch.opening_hours,
          })),
          start_date: form.value.start_date,
          end_date: form.value.end_date,
          is_exclusive: form.value.discountType === "Exclusive",
        }),
      }
    );

    console.log(data);
    form.value.description = data.output;
  } catch (error) {
    console.log(error);
    toast.add({
      title: "Error",
      description: "Failed to generate title",
      color: "red",
    });
  } finally {
    isTitleGenerating.value = false;
  }
}

function setTimePeriod({ start, end }: { start: Date; end: Date }) {
  form.value.start_date = start.toISOString();
  form.value.end_date = end.toISOString();
}

async function onSubmit(event: FormSubmitEvent<DiscountValidationSchema>) {
  console.log(event);
  const data = event.data;
  toast.add({
    title: "Confirm Request",
    description:
      "Are you sure you want to save this discount? This action cannot be undone. and will be visible to all users.",
    color: "green",
    timeout: 0,
    actions: [
      {
        variant: "solid",
        color: "green",
        label: "Save Store",
        click: () => createDiscount(data),
      },
      { color: "gray", label: "Cancel" },
    ],
    ui: { description: "leading-6" },
  });
}

async function createDiscount(form: DiscountValidationSchema) {
  isLoading.value = true;
  const [path, markdown] = await Promise.all([
    uploadImage(form),
    htmlToMarkdown(form.description),
  ]);
  if (!path || !markdown) {
    isLoading.value = false;
    return;
  }
  const { data: discount } = await supabase
    .from("discounts")
    .insert([
      {
        store_id: form.store.id,
        title: form.title,
        description: markdown,
        price: form.price,
        created_at: form.start_date,
        ended_at: form.end_date,
        discount_type: "Normal",
        category_id: form.store.category_id,
      },
    ])
    .select("*")
    .single();

  if (!discount) {
    toast.add({
      title: "Error",
      description: "Failed to save discount",
      color: "red",
    });
    isLoading.value = false;
    return;
  }

  const availableBranches = form.selectedBranch.map((branch) => ({
    discount_id: discount.id,
    branch_id: branch.id,
  }));

  Promise.all([saveBranches(availableBranches), assignImage(discount.id, path)]);

  toast.add({
    title: "Success",
    description: "Discount has been saved successfully",
    color: "green",
  });
  isLoading.value = false;
}

async function saveBranches(
  availableBranches: { discount_id: number; branch_id: number }[]
) {
  await supabase.from("available_branches").insert(availableBranches);
}

async function assignImage(id: number, path: string) {
  await supabase.from("discount_images").insert([{ path, discount_id: id }]);
}

async function htmlToMarkdown(html: string): Promise<string | null> {
  try {
    const response = await $fetch<{ markdown: string }>(
      `${config.public.edgeUrl}/api/MD/html-to-md`,
      {
        method: "POST",
        body: JSON.stringify({ htmlContent: html }),
      }
    );

    return response.markdown;
  } catch (error) {
    console.log(error);
    toast.add({
      title: "Error",
      description: "Failed to convert HTML to markdown",
      color: "red",
    });
    return null;
  }
}

async function uploadImage(
  form: DiscountValidationSchema
): Promise<string | null> {
  const path = `${form.store.id}/${Date.now()}.png`;
  const { error } = await supabase.storage
    .from("discount")
    .upload(path, form.image, {
      cacheControl: "3600",
      contentType: "image/png",
    });

  if (error) {
    console.log(error);
    toast.add({
      title: "Error",
      description: "Failed to upload image",
      color: "red",
    });
    return null;
  }

  return path;
}
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
                Add New Discount
              </h3>
            </div>
            <div class="flex justify-end">
              <UButton label="Go Back" color="gray" @click="$router.back" />
            </div>
          </div>
        </div>
        <UForm
          :schema="discountValidation"
          :state="form"
          @submit.prevent="onSubmit"
        >
          <div class="grid lg:grid-cols-2 gap-4">
            <UFormGroup label="Image" name="image">
              <UImagePicker v-model="form.image" />
            </UFormGroup>
            <div class="flex flex-col gap-3">
              <UFormGroup label="Title" name="title">
                <div class="flex">
                  <UInput
                    class="flex-1"
                    v-model="form.title"
                    placeholder="Add title"
                    :ui="{ rounded: 'rounded-r-none' }"
                    :disabled="isTitleGenerating"
                    @keyup.enter="generateTitle"
                  />
                  <UButton
                    id="generate-title-btn"
                    color="gray"
                    :ui="{
                      rounded: 'rounded-l-none',
                      padding: { lg: 'px-2 py-0.5' },
                    }"
                    :disabled="!form.title || isTitleGenerating"
                    @click="generateTitle"
                  >
                    <lord-icon
                      :colors="`primary:${
                        $colorMode.value == 'dark' ? '#fff' : '#000'
                      }`"
                      class="w-8 h-8"
                      :src="`/animated/pumpkin-${
                        form.title ? 'pitch' : 'dead'
                      }.json`"
                      target="#generate-title-btn"
                      trigger="hover"
                      stroke="bold"
                    />
                  </UButton>
                </div>
              </UFormGroup>
              <UFormGroup label="Store Name" name="store">
                <USelectMenu
                  v-model="form.store"
                  :searchable="getStores"
                  placeholder="Search for a store..."
                  option-attribute="name"
                />
              </UFormGroup>
              <UFormGroup label="Available Branches" name="selectedBranch">
                <USelectMenu
                  v-model="form.selectedBranch"
                  :options="branches"
                  multiple
                  placeholder="Select branch"
                  option-attribute="location"
                  :disabled="isBranchesLoading"
                />
              </UFormGroup>
              <UFormGroup label="Price" name="price">
                <UInput type="number" v-model="form.price" />
              </UFormGroup>
            </div>
            <UFormGroup label="Time Period" name="end_date">
              <UDateRangePicker @datechange="setTimePeriod" />
            </UFormGroup>

            <UFormGroup label="Discount type" name="discountType">
              <div class="flex w-full">
                <USelectMenu
                  v-model="form.discountType"
                  :options="discountTypes"
                  placeholder="Select a type"
                  :ui="{ rounded: 'rounded-r-none' }"
                />
                <div class="flex-1">
                  <UInput
                    :ui="{ rounded: 'rounded-l-none' }"
                    v-model="form.givenPrice"
                    :disabled="!isPriceEnabled"
                    block
                  />
                </div>
              </div>
            </UFormGroup>

            <div class="col-span-full">
              <UFormGroup label="Description" name="description">
                <UEditor
                  v-model="form.description"
                  :able-to-generate="ableToGenerateDescription"
                  @generate="generateDescription"
                />
              </UFormGroup>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-5">
            <UButton label="Cancel" color="gray" @click="$router.back" />
            <UButton
              :loading="isLoading"
              icon="material-symbols:save-rounded"
              label="Save this discount"
              color="primary"
              type="submit"
            />
          </div>
        </UForm>
      </UContent>
    </NuxtLayout>
  </div>
</template>
