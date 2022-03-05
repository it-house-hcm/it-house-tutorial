import { Context } from "../../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { ProductLikeModel } from "./productLike.model";
import { Product } from "../product.model";

export default {
  schema: gql`
    extend type Mutation {
      likeProduct(productId: ID!): Boolean
    }
    extend type Product {
      like: Int
      isLike: Boolean
    }
  `,
  resolvers: {
    Mutation: {
      likeProduct: async (root: any, args: any, context: Context) => {
        context.auth(["ADMIN", "USER"]);
        const { productId } = args;
        const userId = context.userId;
        const productLike = await ProductLikeModel.findOneAndUpdate(
          { productId, userId },
          { $set: { productId, userId } },
          { upsert: true, new: true }
        );
        return true;
      },
    },
    Product: {
      like: async (root: Product, args: any, context: Context) => {
        const likeCount = await ProductLikeModel.count({ productId: root._id });
        return likeCount;
      },
      isLike: async (root: Product, args: any, context: Context) => {
        const userId = context.userId;
        const isLike = await ProductLikeModel.findOne({
          productId: root._id,
          userId,
        });
        return !!isLike;
      },
    },
  },
};
