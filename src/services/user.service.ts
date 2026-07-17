import { userCollection } from "../models/user.model";

export const getAllUsersService = async () => {
  const users = await userCollection.find().toArray();

  return users;
};