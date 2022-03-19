import { Context } from "../../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { ProductLikeModel } from "./productLike.model";
import { Product } from "../product.model";
import DataLoader from "dataloader";
import { Types } from "mongoose";
import _ from "lodash";
import { ttlCache } from "../../../helpers/ttlCache";

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
        ProductLikeLoader.clear(productId);
        UserLikeProductLoader.clear(productId);
        return true;
      },
    },
    Product: {
      like: async (root: Product, args: any, context: Context) => {
        return await ProductLikeLoader.load(root._id.toString());
      },
      isLike: async (root: Product, args: any, context: Context) => {
        if (!context.isAuth) return false;
        return UserLikeProductLoader.load(`${root._id}-${context.userId}`);
      },
    },
  },
};

const ProductLikeLoader = new DataLoader<string, number>(
  async (ids) => {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return await ProductLikeModel.aggregate([
      { $match: { productId: { $in: objectIds } } },
      { $group: { _id: "$productId", count: { $sum: 1 } } },
    ]).then((res) => {
      const keyByIds = _.keyBy(res, "_id");
      return ids.map((id) => _.get(keyByIds, `${id}.count`, 0)) as number[];
    });
  },
  { cache: true, cacheMap: ttlCache({ ttl: 10000, maxSize: 100 }) }
);

const UserLikeProductLoader = new DataLoader<string, boolean>(
  (ids) => {
    const productIds = ids.map((id) => new Types.ObjectId(id.split("-")[0]));
    const userIds = ids.map((id) => new Types.ObjectId(id.split("-")[1]));
    return ProductLikeModel.aggregate([
      { $match: { productId: { $in: productIds }, userId: { $in: userIds } } },
      { $group: { _id: { productId: "$productId", userId: "$userId" } } },
    ])
      .then((res) => {
        return res.map(({ _id }) => `${_id.productId}-${_id.userId}`);
      })
      .then((res) => {
        return ids.map((id) => res.includes(id)) as boolean[];
      });
  },
  { cache: true, cacheMap: ttlCache({ ttl: 10000, maxSize: 100 }) }
);
