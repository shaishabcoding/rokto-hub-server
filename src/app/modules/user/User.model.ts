import { model, Schema, Types, Document } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, TUserModel } from "./User.interface";
import config from "../../config";

const userSchema = new Schema<TUser, TUserModel, {}>(
  {
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "DELETED"],
      default: "ACTIVE",
    },
    badge: {
      type: [String],
      default: [],
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.bcrypt_salt_rounds);
  }
  next();
});

const User = model<TUser, TUserModel>("User", userSchema);

export default User;
