import { adminData } from "../modules/auth/Auth.constant";
import User from "../modules/user/User.model";

export const seedAdmin = async () => {
  const admin = await User.findOne({
    role: "ADMIN",
  });

  !admin && await User.create(adminData);
};