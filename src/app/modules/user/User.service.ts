import { TUser } from "./User.interface";
import User from "./User.model";
import QueryBuilder, { QueryParams } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./User.constant";

const createUserIntoDB = async (user: Partial<TUser>) =>
  await User.create(user);
const getAllUserFromDB = async (query: QueryParams) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const users = await userQuery.modelQuery.exec();

  return {
    meta,
    users,
  };
};
const getAUserFromDB = async (email: string) =>
  await User.findOne({
    email,
  });

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getAUserFromDB,
};
