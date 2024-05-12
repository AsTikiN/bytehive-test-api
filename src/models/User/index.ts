import mongoose, { Types } from "mongoose";

export const userSchema = new mongoose.Schema<UserModel>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export default mongoose.model<UserModel>("User", userSchema);
