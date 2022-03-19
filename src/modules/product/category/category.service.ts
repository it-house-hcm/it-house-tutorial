import { CrudService } from "../../../base/crudService";
import { Category, CategoryModel } from "./category.model";

class CategoryService extends CrudService<Category> {
  constructor() {
    super(CategoryModel);
  }
}

export const categoryService = new CategoryService();
