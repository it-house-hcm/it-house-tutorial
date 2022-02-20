import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

export type Post = BaseDocument & {
  name?: string; // Tên
};

const postSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const PostModel = Mongo.model<Post>("Post",  postSchema);
