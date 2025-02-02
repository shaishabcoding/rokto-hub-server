import { Types } from "mongoose";
import { TBloodGroup } from "../user/User.interface";

export type TBloodDonor = {
  user: Types.ObjectId;
  bloodGroup: TBloodGroup;
  availableQuantity: number;
  address: string;
  isAvailable: boolean;
  donatedQuantity: number;
  lastDonationDate: Date;
  contactNo: string;
  isPublished: boolean;
};
