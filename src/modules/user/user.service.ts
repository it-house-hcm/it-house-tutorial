import { CrudService } from "../../base/crudService";
import { User, UserModel } from "./user.model";

class UserService extends CrudService<User> {
  constructor() {
    super(UserModel);
  }
}

export const userService = new UserService();
