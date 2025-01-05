import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.service";
import config from "../../config";
import { StatusCodes } from "http-status-codes";

const login: RequestHandler = catchAsync(async (req, res) => {
  const { body } = req;
  const { accessToken, refreshToken, user } = await AuthServices.loginUser(
    body
  );

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env !== "development",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Login successfully!",
    data: { token: accessToken, user },
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password has changed successfully!",
    data: null,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.refreshToken(req.cookies.refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "New Access create successfully!",
    data: result,
  });
});

const forgetPassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.forgetPassword(req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password reset link sent successfully!",
    data: null,
  });
});

const resetPassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.forgetPassword(req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password reset link sent successfully!",
    data: null,
  });
});

export const AuthController = {
  login,
  changePassword,
  forgetPassword,
  resetPassword,
  refreshToken,
};
