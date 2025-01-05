import { Model, Types } from "mongoose";
import { TBadge } from "./User.constant";

export type TUser = {
  _id: Types.ObjectId;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: "male" | "female";
  email: string;
  password: string;
  dateOfBirth: Date;
  contactNo: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  badge: TBadge;
  image: string;
};

export type TUserMethods = {
  isUserExist(id: Types.ObjectId): Promise<TUser | null>;
};

export type TUserModel = Model<TUser, Record<string, never>, TUserMethods>;
