import { TBloodDonor } from "./BloodDonor.interface";
import BloodDonor from "./BloodDonor.model";

const createBloodDonor = async (user: Partial<TBloodDonor>) =>
  await BloodDonor.create(user);

export const BloodDonorService = {
  createBloodDonor,
};
