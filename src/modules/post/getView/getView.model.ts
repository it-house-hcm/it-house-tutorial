import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../../../../../base/baseModel";
import { Mongo } from "../../../../../../helpers/mongo";

export type GetView = BaseDocument & {
  name?: string; // Tên
};

const getViewSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const GetViewModel = Mongo.model<GetView>(" GetView",  getViewSchema);
