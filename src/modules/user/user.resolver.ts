import passwordHash from "password-hash";

import { validateEmail } from "../../helpers/functions/string";
import { Context } from "../../helpers/graphql/context";
import { UserModel } from "./user.model";
import { userService } from "./user.service";

export default {
  Query: {
    getAllUser: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { q } = args;
      return await userService.fetch(q);
    },
    getOneUser: async (root: any, args: any, context: any) => {
      const { id } = args;

      return userService.findById(id);
    },
  },
  Mutation: {
    createUser: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN", "USER"]).grant(["user.create"]);
      const { data } = args;
      const { username, password, name, email, phone, role } = data;
      // step 1: check username is valid
      if (username.length < 6) {
        throw new Error("Username must be at least 6 characters");
      }
      // step 2: check password is valid
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      // step 3: check email is valid
      checkEmailIsValid(email);
      // step 4: check user is exist
      await checkUsernameIsExist(username);

      const user = await userService.create({
        username: username,
        name: name,
        email: email,
        phone: phone,
        password: passwordHash.generate(password),
        role: role,
      });
      return user;
    },
    updateUser: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]).grant(["user.update"]);
      const { id, data } = args;
      const { name, email, phone } = data;
      // step 2: if has email, then check email is valid
      if (email) {
        checkEmailIsValid(email);
      }
      // step 3: update user
      return await userService.update(id, data);
    },
    deleteUser: async (root: any, args: any, context: any) => {
      context.auth(["ADMIN"]).grant(["user.delete"]);
      const { id } = args;
      return await userService.delete(id);
    },
  },
};
function checkEmailIsValid(email: any) {
  if (validateEmail(email) == false) {
    throw new Error("Email is invalid");
  }
}

async function checkUsernameIsExist(username: any) {
  const user = await UserModel.findOne({ username });
  if (user) {
    throw new Error("Username is existed");
  }
  return user;
}
