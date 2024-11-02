import { z } from "zod";

export const BranchValidation = z.object({
  location: z.object(
    {
      id: z.number(),
      name: z.string(),
    },
    { message: "Proper Location Is Required" }
  ),
  contactNumber: z.string().regex(/^0(7[1-8]\d{7}|[1-9]\d{8})$/, {
    message: "Invalid contact number",
  }),
  // openingHours  can be time "01:00 - 12:00" like this or "24 Hours"
  openingHours: z
    .string()
    .regex(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] - (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$|24 Hours/,
      {
        message: "Invalid opening hours",
      }
    ),
});

export type Branch = z.infer<typeof BranchValidation>;
