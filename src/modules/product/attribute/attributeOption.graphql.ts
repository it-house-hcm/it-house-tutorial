import { Context } from "../../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { Schema } from "mongoose";

export type AttributeOption = {
  _id?: string;
  name?: string; // Tên thuộc tính
  price?: number; // Giá
  isDefault?: boolean; // Mặc định
};

export const AttributeOptionSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  isDefault: { type: Boolean, default: false },
});

export default {
  schema: gql`
    type AttributeOption {
      id: ID
      "Tên thuộc tính"
      name: String
      "Giá"
      price: Float
      "Mặc định"
      isDefault: Boolean
    }
    input AttributeOptionInput {
      "Tên thuộc tính"
      name: String
      "Giá"
      price: Float
      "Mặc định"
      isDefault: Boolean
    }
  `,
  resolvers: {},
};
