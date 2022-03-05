import { Context } from "../../../helpers/graphql/context";
import { ProductLikeModel } from "./productLike.model";
import { productLikeService } from "./productLike.service";

export default {
  Query: {
    getAllProductLike: async (root: any, args: any, context: Context) => {
      const { q } = args;
      return await productLikeService.fetch(q);
    },
    getOneProductLike: async (root: any, args: any, context: any) => {
      const { id } = args;

      return productLikeService.findById(id);
    },
  },
};
