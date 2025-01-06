import { z } from "zod";
import { bloodGroups } from "../user/User.interface";
import User from "../user/User.model";

export const bloodDonorValidationSchema = z.object({
  body: z.object({
    user: z.string().refine(
      async (userId) => {
        const userExists = await User.findById(userId).exec();
        return !!userExists;
      },
      { message: "User does not exist" }
    ),
    bloodGroup: z.enum(bloodGroups as [string, ...string[]]),
    availableQuantity: z
      .number()
      .positive("Available quantity must be a positive number"),
    address: z.string().min(1, "Address is required").optional(),
    contactNo: z.string().min(10, "Contact number must be at least 10 digits"),
  }),
});

export const BloodDonorValidation = {
  bloodDonorValidationSchema,
};
