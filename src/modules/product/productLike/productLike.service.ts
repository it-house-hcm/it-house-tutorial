import { CrudService } from "../../../base/crudService";
import { ProductLike, ProductLikeModel } from "./productLike.model";

class ProductLikeService extends CrudService<ProductLike> {
  constructor() {
    super(ProductLikeModel);
  }
}

export const productLikeService = new ProductLikeService();
