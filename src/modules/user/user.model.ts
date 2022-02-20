import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

export enum UserRole {
  ADMIN = "ADMIN", // Quản trị viên
  USER = "USER", // Người dùng
}

export type User = BaseDocument & {
  username?: string; // Username
  name?: string; // Họ và tên
  email?: string; // Email
  phone?: string; // Số điện thoại
  password?: string; // Mật khẩu
  role?: UserRole; // Quyền
};

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 });

export const UserModel = Mongo.model<User>("User", userSchema);
