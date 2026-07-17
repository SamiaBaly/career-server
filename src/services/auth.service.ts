import bcrypt from "bcrypt";
import { userCollection } from "../models/user.model";

export const registerUserService = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = payload;

  const existingUser = await userCollection.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
  };

  const result = await userCollection.insertOne(newUser);

  return {
    _id: result.insertedId,
    name,
    email,
    role: "user",
  };
};