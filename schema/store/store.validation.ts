import { z } from "zod";

export const storeValidation = z.object({
  name: z.string(),
  category: z.number({ message: "Category must is required" }),
  contactName: z
    .string()
    .min(3, { message: "Contact name must be at least 3 characters" }),
  contactNumber: z.string().regex(/^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/, {
    message: "Invalid phone number",
  }),
});

export type StoreSchema = z.infer<typeof storeValidation>;

/* 
    ------------------------------------------------------------
    | Extend above schema to create sponsored store validation |
    ------------------------------------------------------------
*/

export const sponsoredStoreValidation = storeValidation.extend({
  sponsorshipPeriod: z.string(),
  pricing: z.string().regex(/^\d{1,}$/, { message: "Invalid pricing" }),
});

export type SponsoredStoreSchema = z.infer<typeof sponsoredStoreValidation>;
