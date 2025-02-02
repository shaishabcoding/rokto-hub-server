import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { TBloodDonor } from "./BloodDonor.interface";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { BloodDonorService } from "./BloodDonor.service";

const createBloodDonor: RequestHandler = catchAsync(async (req, res) => {
  const newBloodDonor: Partial<TBloodDonor> = req.body;

  const result = await BloodDonorService.createBloodDonor(newBloodDonor);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Donation created successfully!",
    data: result,
  });
});

export const BloodDonorController = {
  createBloodDonor,
};
