import { z } from "zod";
import { bloodGroups } from "../user/User.interface";

const bloodDonorValidationSchema = z.object({
  bloodGroup: z.enum(bloodGroups as [string, ...string[]]),
  availableQuantity: z.number().positive(),
  address: z.string().min(1),
  contactNo: z.string().min(10).max(15),
});

export const BloodDonorValidation = {
  bloodDonorValidationSchema,
};
