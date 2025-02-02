import { TUser } from "./User.interface";
import User from "./User.model";
import QueryBuilder, { QueryParams } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./User.constant";

const createUser = async (user: Partial<TUser>) => await User.create(user);
const getAllUser = async (query: QueryParams) => {
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
const getAUser = async (email: string) =>
  await User.findOne({
    email,
  });

export const UserServices = {
  createUser,
  getAllUser,
  getAUser,
};
