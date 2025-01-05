import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, TUserMethods, TUserModel } from "./User.interface";
import config from "../../config";
import { badgeEnums } from "./User.constant";

const userSchema = new Schema<TUser, TUserModel, TUserMethods>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
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
    image: {
      type: String,
      required: true,
    },
    contactNo: {
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
      enum: ["ADMIN", "USER", "SUPER_ADMIN"],
      default: "USER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "DELETED"],
      default: "ACTIVE",
    },
    badge: {
      type: String,
      enum: badgeEnums,
      default: "bronze",
    },
  },
  { timestamps: true }
);

userSchema.virtual("name.fullName").get(function () {
  return `${this.name?.firstName} ${this.name?.lastName}`;
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, config.bcrypt_salt_rounds);

  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userSchema.methods.isUserExist = async (id: Types.ObjectId) =>
  await User.findById(id);

const User = model<TUser>("User", userSchema);

export default User;
