import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";
import { getModelDataLoader } from "../../helpers/dataloader";
import { Action, ActionSchema } from "./action.graphql";

export type Notification = BaseDocument & {
  userId?: string; // Mã người dùng
  title?: string; // Tiêu đề
  body?: string; // Nội dung
  image?: string; // Ảnh
  read?: boolean; // Đã đọc
  action?: Action; // Thao tác
};

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String },
    read: { type: Boolean, default: false },
    action: { type: ActionSchema, default: {} },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1 });
notificationSchema.index({ title: "text" }, { weights: { title: 5 } });

export const NotificationModel = Mongo.model<Notification>(
  "Notification",
  notificationSchema
);

export const NotificationLoader = getModelDataLoader(NotificationModel);
