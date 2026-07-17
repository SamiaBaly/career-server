export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}