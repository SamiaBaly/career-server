import bcrypt from "bcrypt";
import { userCollection } from "../models/user.model";
import { IUser } from "../types/user.types";
import { createToken } from "../utils/jwt";


export const registerUserService = async (
  userData: IUser
) => {

  const existingUser =
    await userCollection.findOne({
      email: userData.email
    });


  if (existingUser) {
    throw new Error("User already exists");
  }


  const hashedPassword =
    await bcrypt.hash(
      userData.password,
      10
    );


  const newUser: IUser = {
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: "user",
    photo: userData.photo,
    createdAt: new Date(),
    updatedAt: new Date()
  };


  const result =
    await userCollection.insertOne(newUser);


  return {
    id: result.insertedId,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    photo: newUser.photo
  };

};

export const loginUserService = async (
  email: string,
  password: string
) => {

  const user =
    await userCollection.findOne({
      email
    });


  if (!user) {
    throw new Error("User not found");
  }


  if (!user.password) {
    throw new Error("Password not found");
  }


  const isPasswordMatch =
    await bcrypt.compare(
      password,
      user.password
    );


  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }


  const token =
    createToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role
    });


  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo
    }
  };

};
