import { Context } from "../../helpers/graphql/context";
import { gql } from "apollo-server-express";

export default {
  schema: gql`
    extend type Query {
      orderItemAttrubute: Mixed
    }
  `,
  resolvers: {
    Query: {
      orderItemAttrubute: async (root: any, args: any, context: Context) => {
        return true;
      },
    },
  },
};
