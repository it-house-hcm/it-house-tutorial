import { CrudService } from "../../../base/crudService";
import { Branch, BranchModel } from "./branch.model";

class BranchService extends CrudService<Branch> {
  constructor() {
    super(BranchModel);
  }
}

export const branchService = new BranchService();
