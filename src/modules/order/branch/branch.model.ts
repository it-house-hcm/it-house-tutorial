import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { Mongo } from "../../../helpers/mongo";
import { getModelDataLoader } from "../../../helpers/dataloader";
import { Place, PlaceSchema } from "../../common/place.graphql";

export type Branch = BaseDocument & {
  name?: string; // Tên chi nhánh
  phone?: string; // Số điện thoại
  place?: Place; // Địa chỉ
  active?: boolean; // Trạng thái

  shipfeePerKm?: number; // Phí ship từ 1 km
};

const branchSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    place: { type: PlaceSchema, default: {} },
    active: { type: Boolean, default: false },
    shipfeePerKm: { type: Number, default: 5000 },
  },
  { timestamps: true }
);

branchSchema.index({ name: "text" }, { weights: { name: 10 } });

export const BranchModel = Mongo.model<Branch>("Branch", branchSchema);

export const BranchLoader = getModelDataLoader(BranchModel);
