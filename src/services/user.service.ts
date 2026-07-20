import { ObjectId } from "mongodb";
import { userCollection } from "../models/user.model";

export const getUserProfileService = async (
  id: string
) => {

  const user = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    photo: user.photo,
  };

};



export const updateUserProfileService = async (
  id: string,
  data: {
    name?: string;
    photo?: string;
  }
) => {

  const result =
    await userCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
      }
    );

  if (!result) {
    throw new Error("User not found");
  }

  return {
    id: result._id,
    name: result.name,
    email: result.email,
    role: result.role,
    photo: result.photo,
  };

};



/* ===========================
          ADMIN
=========================== */

export const getAllUsersService = async () => {

  const users = await userCollection
    .find({})
    .project({
      password: 0,
    })
    .toArray();

  return users;

};



export const updateUserRoleService = async (
  id: string,
  role: "user" | "admin"
) => {

  const result =
    await userCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          role,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
      }
    );

  if (!result) {
    throw new Error("User not found");
  }

  return result;

};



export const deleteUserService = async (
  id: string
) => {

  const result =
    await userCollection.deleteOne({
      _id: new ObjectId(id),
    });

  if (!result.deletedCount) {
    throw new Error("User not found");
  }

  return {
    success: true,
  };

};