import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../modules/user/User.interface";

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}
