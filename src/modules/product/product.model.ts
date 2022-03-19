import { Schema } from "mongoose";

import { BaseDocument } from "../../base/baseModel";
import { getModelDataLoader } from "../../helpers/dataloader";
import { Mongo } from "../../helpers/mongo";
import { Attribute, AttributeSchema } from "./attribute/attribute.graphql";

export type Product = BaseDocument & {
  code?: string; // Mã sản phẩm
  name?: string; // Tên sản phẩm
  description?: string; // Mô tả
  images?: string[]; // Ảnh
  basePrice?: number; // Giá gốc
  sellPrice?: number; // Giá bán
  active?: boolean; // Trạng thái
  categoryId?: string; // ID danh mục
  view?: number; // Lượt xem
  attributes?: Attribute[]; // Thuộc tính
};

const productSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    images: { type: [String], default: [] },
    basePrice: { type: Number, default: 0 },
    sellPrice: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId },
    view: { type: Number, default: 0 },
    attributes: { type: [AttributeSchema], default: [] },
  },
  { timestamps: true }
);

productSchema.index({ categoryId: 1 });
productSchema.index({ code: 1 }, { unique: true });
productSchema.index(
  { name: "text", code: "text" },
  { weights: { name: 10, code: 5 } }
);

export const ProductModel = Mongo.model<Product>("Product", productSchema);

export const ProductLoader = getModelDataLoader(ProductModel);
