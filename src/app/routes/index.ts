import express from "express";
import { UserRoutes } from "../modules/user/User.route";
import { AuthRoutes } from "../modules/auth/Auth.route";
import path from "path";
import { BloodDonorRoutes } from "../modules/bloodDonor/BloodDonor.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/donor",
    route: BloodDonorRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
