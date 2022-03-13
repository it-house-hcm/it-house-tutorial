import { Context } from "../../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { UserModel } from "../../user/user.model";
import { Types } from "mongoose";

export default {
  schema: gql`
    extend type Mutation {
      regisDeviceToken(token: String!): String
    }
  `,
  resolvers: {
    Mutation: {
      regisDeviceToken: async (root: any, args: any, context: Context) => {
        context.auth(["ADMIN", "USER"]);

        const { token } = args;

        // update device token to user
        await UserModel.updateOne(
          { _id: context.userId },
          { $addToSet: { deviceTokens: token } }
        );

        // remove device token from another user if it duplicate
        await UserModel.updateMany(
          {
            _id: { $ne: context.userId },
            deviceTokens: token,
          },
          {
            $pull: { deviceTokens: token },
          }
        );

        return "ok";
      },
    },
  },
};
