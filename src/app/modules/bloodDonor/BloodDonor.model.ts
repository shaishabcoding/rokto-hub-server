import { model, Schema, Types } from "mongoose";
import { TBloodDonor } from "./BloodDonor.interface";
import { bloodGroups } from "../user/User.interface";

const bloodDonorSchema = new Schema<TBloodDonor, any, {}>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  bloodGroup: {
    type: String,
    enum: bloodGroups,
    required: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
  address: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  donatedQuantity: {
    type: Number,
    required: true,
  },
  lastDonationDate: { type: Date, required: true },
  contactNo: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
});

const BloodDonor = model<TBloodDonor, any>("BloodDonor", bloodDonorSchema);

export default BloodDonor;
