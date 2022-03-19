---
to: <%= h.dir(name, true) %>/<%= h.name(name, true) %>.graphql.ts
---
import { Context } from "<%= h.importPath(name, 'src/helpers/graphql/context', true) %>";
import { gql } from "apollo-server-express";

export default {
  schema: gql`
    extend type Query {
        <%= h.name(name, true) %>: Mixed
    }
  `,
  resolvers: {
      Query: {
          <%= h.name(name, true) %>: async (root: any, args: any, context: Context) => {
              return true;
          },
      }
  },
};
