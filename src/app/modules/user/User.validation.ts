import { z } from "zod";
import { bloodGroups } from "./User.interface";

const userValidationSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.enum(["male", "female"]),
    email: z.string().email("Invalid email format"),
    dateOfBirth: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      {
        message: "Invalid date format",
      }
    ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long"),
    avatar: z.string().url("Invalid image URL"),
    bloodGroup: z.enum(bloodGroups as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
