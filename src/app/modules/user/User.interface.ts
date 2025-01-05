import { Model, Types } from "mongoose";

export type TUserRole = "USER" | "ADMIN";

export type TUser = {
  _id: Types.ObjectId;
  name: {
    firstName: string;
    lastName: string;
  };
  avatar: string;
  gender: "male" | "female";
  email: string;
  password: string;
  dateOfBirth: Date;
  role: TUserRole;
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  badge: string[];
  address: string;
};

export type TUserModel = Model<TUser, Record<string, never>, {}>;
