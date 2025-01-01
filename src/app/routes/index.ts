import express from "express";
import { UserRoutes } from "../modules/user/User.route";
import { AuthRoutes } from "../modules/auth/Auth.route";

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
];

moduleRoutes.forEach(({ path, route }) =>
  router.use(path, route)
);

export default router;