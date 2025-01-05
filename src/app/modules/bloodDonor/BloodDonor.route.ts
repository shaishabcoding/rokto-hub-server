import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BloodDonorValidation } from "./BloodDonor.validation";
import { BloodDonorController } from "./BloodDonor.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create",
  // auth(["USER"]),
  validateRequest(BloodDonorValidation.bloodDonorValidationSchema),
  BloodDonorController.createBloodDonor
);

export const BloodDonorRoutes = router;
