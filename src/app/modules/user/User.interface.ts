import { Model, Types } from "mongoose";

export type TUserRole = "USER" | "ADMIN";
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";

export const bloodGroups: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

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
  bloodGroup: TBloodGroup;
};
