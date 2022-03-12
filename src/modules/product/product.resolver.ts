import _ from "lodash";
import { Context } from "../../helpers/graphql/context";
import { GraphqlResolver } from "../../helpers/graphql/resolver";
import { CategoryLoader, CategoryModel } from "./category/category.model";
import { ProductModel } from "./product.model";
import { productService } from "./product.service";

export default {
  Query: {
    getAllProduct: async (root: any, args: any, context: Context) => {
      const { q } = args;
      if (!context.isAdmin) {
        _.set(args, "q.filter.active", true);
      }
      return await productService.fetch(q);
    },
    getOneProduct: async (root: any, args: any, context: any) => {
      const { id } = args;
      const product = await productService.findById(id);
      product.updateOne({ $inc: { view: 1 } }).exec();
      return product;
    },
  },
  Mutation: {
    createProduct: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { data } = args;
      // if data has no code, then generate code
      if (!data.code) {
        data.code = productService.generateCode();
      }
      const product = await productService.create(data);
      return product;
    },
    updateProduct: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { id, data } = args;
      return await productService.update(id, data);
    },
    deleteProduct: async (root: any, args: any, context: any) => {
      context.auth(["ADMIN"]);
      const { id } = args;
      return await productService.delete(id);
    },
  },
  Product: {
    category: GraphqlResolver.load(CategoryLoader, "categoryId"),
  },
};
