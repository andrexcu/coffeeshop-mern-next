import { ObjectId } from "mongoose";

export type userType = {
  id: ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
};
