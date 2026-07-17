import bcrypt from "bcrypt";
import { userCollection } from "../models/user.model";
import { IUser } from "../types/user.types";


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


  return result;

};