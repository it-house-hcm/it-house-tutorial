import { gql } from "apollo-server-express";
import { Schema } from "mongoose";
import {
  AttributeOption,
  AttributeOptionSchema,
} from "./attributeOption.graphql";

export type Attribute = {
  _id?: string;
  name?: string; // Tên thuộc tính
  required?: boolean; // Bắt buộc
  min?: number; // Số lượng option chọn tối thiểu
  max?: number; // Số lượng option chọn tối đa
  options?: AttributeOption[]; // Option
};

export const AttributeSchema = new Schema({
  name: { type: String, required: true },
  required: { type: Boolean, default: false },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  options: { type: [AttributeOptionSchema], default: [] },
});

export default {
  schema: gql`
    type Attribute {
      id: ID

      "Tên thuộc tính"
      name: String
      "Bắt buộc"
      required: Boolean
      "Số lượng option chọn tối thiểu"
      min: Int
      "Số lượng option chọn tối đa"
      max: Int
      "Option"
      options: [AttributeOption]
    }

    input AttributeInput {
      "Tên thuộc tính"
      name: String
      "Bắt buộc"
      required: Boolean
      "Số lượng option chọn tối thiểu"
      min: Int
      "Số lượng option chọn tối đa"
      max: Int
      "Option"
      options: [AttributeOptionInput]
    }
  `,
  resolvers: {},
};
