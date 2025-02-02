import { RequestHandler } from "express";
import { UserServices } from "./User.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { TUser } from "./User.interface";
import { AuthServices } from "../auth/Auth.service";
import config from "../../config";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    email,
    dateOfBirth,
    password,
    avatar,
    address,
    bloodGroup,
  } = req.body;

  const userData: Partial<TUser> = {
    name: { firstName, lastName },
    gender,
    email,
    password,
    dateOfBirth: new Date(dateOfBirth),
    avatar,
    address,
    bloodGroup,
  };

  await UserServices.createUser(userData);
  const { accessToken, refreshToken, user } = await AuthServices.loginUser({
    email,
    password,
  });

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env !== "development",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "User created successfully!",
    data: { token: accessToken, user },
  });
});

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUser(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Users are retrieved successfully!",
    data: users,
  });
});

const getAUser: RequestHandler = catchAsync(async (req, res) => {
  const { email } = req.params;

  const users = await UserServices.getAUser(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User is retrieved successfully!",
    data: users,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  getAUser,
};
