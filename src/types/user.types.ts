import { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}