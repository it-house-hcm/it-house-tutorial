import { Context } from "../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { Schema } from "mongoose";
import { GraphqlResolver } from "../../helpers/graphql/resolver";
import { OrderLoader } from "../order/order.model";
import { ProductLoader } from "../product/product.model";

export enum ActionType {
  ORDER = "ORDER", // Mở đơn hàng
  PRODUCT = "PRODUCT", // Mở sản phẩm
  PROMOTION = "PROMOTION", // Mở khuyến mãi
  WEBSITE = "WEBSITE", // Mở trang web
  NONE = "NONE", // Không có thao tác
}

export type Action = {
  type?: ActionType; // Type of action
  orderId?: string; // Order id
  productId?: string; // Product id
  promotionId?: string; // Promotion id
  websiteUrl?: string; // Website url
};

export const ActionSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(ActionType),
    default: ActionType.NONE,
  },
  orderId: { type: Schema.Types.ObjectId },
  productId: { type: Schema.Types.ObjectId },
  promotionId: { type: Schema.Types.ObjectId },
  websiteUrl: { type: String },
});

export default {
  schema: gql`
    type Action {
      "Type of action ${Object.values(ActionType)}"
      type: String
      "Order id"
      orderId: ID
      "Product id"
      productId: ID
      "Promotion id"
      promotionId: ID
      "Website url"
      websiteUrl: String

      "Đơn hàng"
      order: Order
      "Sản phẩm"
      product: Product
    }
    input ActionInput {
      "Type of action ${Object.values(ActionType)}"
      type: String
      "Order id"
      orderId: ID
      "Product id"
      productId: ID
      "Promotion id"
      promotionId: ID
      "Website url"
      websiteUrl: String
    }
  `,
  resolvers: {
    Action: {
      order: GraphqlResolver.load(OrderLoader, "orderId"),
      product: GraphqlResolver.load(ProductLoader, "productId"),
    },
  },
};
