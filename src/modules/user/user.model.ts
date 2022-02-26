import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

export enum UserRole {
  ADMIN = "ADMIN", // Quản trị viên
  USER = "USER", // Người dùng
}

export type User = BaseDocument & {
  uid?: string; // UID của người dùng
  username?: string; // Username
  name?: string; // Họ và tên
  email?: string; // Email
  phone?: string; // Số điện thoại
  password?: string; // Mật khẩu
  role?: UserRole; // Quyền
  signInProvider?: string; // Nhà cung cấp đăng nhập
  scopes?: string[]; // Các quyền
};

const userSchema = new Schema(
  {
    uid: { type: String },
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    signInProvider: { type: String },
    scopes: { type: [String] },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 });
userSchema.index(
  {
    username: "text",
    name: "text",
    email: "text",
    phone: "text",
  },
  { weights: { username: 1, name: 10, email: 2, phone: 3 } }
);

export const UserModel = Mongo.model<User>("User", userSchema);
