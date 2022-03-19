import { Schema } from "mongoose";
import { Mongo } from "../../helpers/mongo";

const addressSchema = new Schema({
  provinceId: { type: String },
  province: { type: String },
  districtId: { type: String },
  district: { type: String },
  wardId: { type: String },
  ward: { type: String },
});

export const AddressModel = Mongo.model("Address", addressSchema);
