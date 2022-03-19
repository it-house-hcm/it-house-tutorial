import _ from "lodash";
import { Context } from "../../helpers/graphql/context";
import { GraphqlResolver } from "../../helpers/graphql/resolver";
import { UserLoader } from "../user/user.model";
import { OrderModel } from "./order.model";
import { orderService } from "./order.service";
import Ajv from "ajv";

export default {
  Query: {
    getAllOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN", "USER"]);
      const { q } = args;
      if (!context.isAdmin) {
        _.set(args, "q.filter.buyerId", context.userId);
      }
      return await orderService.fetch(q);
    },
    getOneOrder: async (root: any, args: any, context: any) => {
      const { id } = args;

      return orderService.findById(id);
    },
  },
  Mutation: {
    createOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN", "USER"]);
      const { data } = args;
      const order = await orderService.create(data);
      return order;
    },
    updateOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { id, data } = args;
      return await orderService.update(id, data);
    },
    deleteOrder: async (root: any, args: any, context: any) => {
      context.auth(["ADMIN"]);
      const { id } = args;
      return await orderService.delete(id);
    },
  },
  Order: {
    buyer: GraphqlResolver.load(UserLoader, "buyerId"),
  },
};
