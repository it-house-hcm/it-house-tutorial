import { validateEmail } from "../../helpers/functions/string";
import { UserModel } from "./user.model";
import passwordHash from "password-hash";

export default {
  Query: {
    getAllUser: async (root: any, args: any, context: any) => {
      const { q } = args;
      return await fetch(q);
    },
    getOneUser: async (root: any, args: any, context: any) => {
      const { id } = args;
      // step 1: check user is exist
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  },
  Mutation: {
    createUser: async (root: any, args: any, context: any) => {
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

      const user = await UserModel.create({
        username: username,
        name: name,
        email: email,
        phone: phone,
        password: passwordHash.generate(password),
        role: role,
      });
      return user;
    },
    updateUser: async (root: any, args: any, context: any) => {
      const { id, data } = args;
      const { name, email, phone } = data;
      // step 1: check user is exist
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      // step 2: if has email, then check email is valid
      if (email) {
        checkEmailIsValid(email);
      }
      // step 3: update user
      return await UserModel.findByIdAndUpdate(
        id,
        {
          $set: data,
        },
        { new: true }
      );
    },
    deleteUser: async (root: any, args: any, context: any) => {
      const { id } = args;
      // step 1: check user is exist
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      // step 2: delete user
      await UserModel.findByIdAndDelete(id);
      return true;
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

type QueryInput = {
  limit?: number;
  page?: number;
  filter?: any;
  order?: any;
  search?: string;
};

async function fetch(queryInput: QueryInput, select?: string) {
  const limit = queryInput.limit || 10;
  const skip = ((queryInput.page || 1) - 1) * limit || 0;
  const order = queryInput.order;
  const search = queryInput.search;
  const model = UserModel;
  const query = model.find();

  //   if (search) {
  //     if (search.includes(" ")) {
  //       set(queryInput, "filter.$text.$search", search);
  //       query.select({ _score: { $meta: "textScore" } });
  //       query.sort({ _score: { $meta: "textScore" } });
  //     } else {
  //       const textSearchIndex = this.model.schema
  //         .indexes()
  //         .filter((c: any) => values(c[0]!).some((d: any) => d == "text"));
  //       if (textSearchIndex.length > 0) {
  //         const or: any[] = [];
  //         textSearchIndex.forEach((index) => {
  //           Object.keys(index[0]!).forEach((key) => {
  //             or.push({ [key]: { $regex: search, $options: "i" } });
  //           });
  //         });
  //         set(queryInput, "filter.$or", or);
  //       }
  //     }
  //   }

  if (order) {
    query.sort(order);
  }
  if (queryInput.filter) {
    const filter = JSON.parse(
      JSON.stringify(queryInput.filter).replace(/\"(\_\_)(\w+)\"\:/g, `"$$$2":`)
    );
    query.setQuery({ ...filter });
  }
  const countQuery = model.find().merge(query);
  query.limit(limit);
  query.skip(skip);
  if (select) {
    query.select(select);
  }
  return await Promise.all([
    query.exec().then((res) => {
      // console.timeEnd("Fetch");
      return res;
    }),
    countQuery.count().then((res) => {
      // console.timeEnd("Count");
      return res;
    }),
  ]).then((res) => {
    return {
      data: res[0],
      pagination: {
        page: queryInput.page || 1,
        limit: limit,
        total: res[1],
      },
    };
  });
}
