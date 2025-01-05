import express from "express";
import { AuthController } from "./Auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./Auth.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
);

router.patch(
  "/change-password",
  auth(["USER", "ADMIN"]),
  validateRequest(AuthValidation.passwordChangeValidationSchema),
  AuthController.changePassword
);

router.post(
  "/forget-password",
  auth(["USER", "ADMIN"]),
  AuthController.forgetPassword
);

router.post(
  "/reset-password",
  auth(["USER", "ADMIN"]),
  AuthController.resetPassword
);

router.get(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
