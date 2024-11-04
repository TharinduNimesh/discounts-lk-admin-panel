import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

export const discountValidation = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      // Max size of 5 MB
      message: "File size must be less than 5 MB",
    })
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
          file.type
        ),
      {
        message: "Only PNG or JPEG files are allowed",
      }
    ),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  store: z.object(
    {
      id: z.number(),
      name: z.string(),
      category_id: z.number(),
    },
    { message: "Select a store" }
  ),
  selectedBranch: z.array(
    z.object({
      id: z.number(),
      location: z.string(),
      opening_hours: z.string(),
    }),
    { message: "Select at least one branch" }
  ),
  discountType: z.string(),
  price: z.number().min(1, { message: "Price required" }),
});

export type DiscountValidationSchema = z.infer<typeof discountValidation>;
