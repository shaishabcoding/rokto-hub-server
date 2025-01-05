import AppError from "../../errors/AppError";
import User from "../user/User.model";
import { TLoginUser } from "./Auth.validation";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "./Auth.utils";
import { TUser } from "../user/User.interface";
import config from "../../config";
import { sendMail } from "../../utils/sendMail";
import { makeResetBody } from "./Auth.constant";
import { StatusCodes } from "http-status-codes";

const loginUser = async ({ email, password }: TLoginUser) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  if (user.status !== "ACTIVE") {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Account is not active. Please contact support."
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Incorrect password!");
  }

  const {
    contactNo,
    dateOfBirth,
    gender,
    name: { firstName, lastName },
    role,
  } = user.toJSON();

  const partialUser: Partial<TUser> = {
    email,
    contactNo,
    dateOfBirth,
    gender,
    name: { firstName, lastName },
    role,
  };

  const jwtPayload = {
    email,
  };

  const accessToken = createToken(jwtPayload, "access");

  const refreshToken = createToken(jwtPayload, "refresh");

  return { accessToken, user: partialUser, refreshToken };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Access Denied!");
  }

  const { email } = verifyToken(token, "refresh");

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  if (user.status !== "ACTIVE") {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Account is not active. Please contact support."
    );
  }

  const jwtPayload = {
    email,
  };

  const accessToken = createToken(jwtPayload, "access");

  return { accessToken };
};

const changePassword = async (
  user: TUser,
  {
    newPassword,
    oldPassword,
  }: {
    newPassword: string;
    oldPassword: string;
  }
) => {
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Incorrect password!");
  }

  newPassword = await bcrypt.hash(newPassword, config.bcrypt_salt_rounds);

  console.log(newPassword);
  await User.updateOne(
    {
      email: user.email,
    },
    {
      password: newPassword,
    }
  );
};

const forgetPassword = async ({ email }: TUser) => {
  const jwtPayload = {
    email,
  };

  const resetToken = createToken(jwtPayload, "reset");

  await sendMail({
    to: email,
    subject: "Password Reset Request",
    body: makeResetBody(resetToken),
  });
};

const resetPassword = async ({ email }: TUser) => {
  const jwtPayload = {
    email,
  };

  const resetToken = createToken(jwtPayload, "reset");

  await sendMail({
    to: email,
    subject: "Password Reset Request",
    body: makeResetBody(resetToken),
  });
};

export const AuthServices = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
  refreshToken,
};
