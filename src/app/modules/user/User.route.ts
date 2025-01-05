import express from "express";
import { UserControllers } from "./User.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./User.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(["ADMIN"]), UserControllers.getAllUser);
router.get("/:email", auth(["ADMIN"]), UserControllers.getAUser);
router.post(
  "/create-user",
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
