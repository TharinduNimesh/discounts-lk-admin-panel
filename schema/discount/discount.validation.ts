import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

export const discountValidation = z.object({
  image: z.string(),
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string(),
  discount: z.number().min(1, { message: "Discount required" }),
  start_date: z.string(),
    end_date: z.string(),
  storeName: z.number().min(1, { message: "Select a store name" }),
  availableBranches: z.array(z.number()),
  discountType: z.string(),
});