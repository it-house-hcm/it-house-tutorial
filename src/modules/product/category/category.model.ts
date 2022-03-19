import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { Mongo } from "../../../helpers/mongo";
import DataLoader from "dataloader";
import logger from "../../../helpers/logger";
import _ from "lodash";
import { getModelDataLoader } from "../../../helpers/dataloader";

export type Category = BaseDocument & {
  name?: string; // Tên danh mục
  description?: string; // Mô tả
  active?: boolean; // Trạng thái
  priority?: number; // Ưu tiên
  productIds?: string[]; // Mã sản phẩm
};

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    productIds: { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);

categorySchema.index({ priority: 1 });
categorySchema.index({ name: 1 }, { unique: true });
categorySchema.index({ name: "text" }, { weights: { name: 10 } });

export const CategoryModel = Mongo.model<Category>("Category", categorySchema);

export const CategoryLoader = getModelDataLoader(CategoryModel);
