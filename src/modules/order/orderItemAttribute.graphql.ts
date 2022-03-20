import { Context } from "../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { Schema } from "mongoose";

export type OrderItemAttribute = {
  _id?: string;
  attrId?: string; // Mã thuộc tính
  attrName?: string; // Tên thuộc tính
  attrOptionName?: string; // Tên tùy chọn
  attrOptionPrice?: number; // Giá tùy chọn
};

export const OrderItemAttributeSchema = new Schema({
  attrId: { type: String, required: true },
  attrName: { type: String, required: true },
  attrOptionName: { type: String, required: true },
  attrOptionPrice: { type: Number, default: 0 },
});

export default {
  schema: gql`
    type OrderItemAttribute {
      id: String
      "Mã thuộc tính"
      attrId: String
      "Tên thuộc tính"
      attrName: String
      "Tên tùy chọn"
      attrOptionName: String
      "Giá tùy chọn"
      attrOptionPrice: Float
    }
    input OrderItemAttributeInput {
      "Mã thuộc tính"
      attrId: String!
      "Tên thuộc tính"
      attrName: String!
      "Tên tùy chọn"
      attrOptionName: String!
    }
  `,
  resolvers: {},
};
