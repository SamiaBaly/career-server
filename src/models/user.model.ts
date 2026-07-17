import { Collection } from "mongodb";
import { db } from "../config/db";
import { IUser } from "../types/user.types";


export const userCollection: Collection<IUser> =
  db.collection<IUser>("users");