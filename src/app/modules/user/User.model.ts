import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, bloodGroups } from "./User.interface";
import config from "../../config";

const userSchema = new Schema<TUser, any, {}>(
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
    bloodGroup: {
      type: String,
      enum: bloodGroups,
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

const User = model<TUser, any>("User", userSchema);

export default User;
