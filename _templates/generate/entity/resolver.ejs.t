---
to: <%= h.dir(name) %>/<%= h.name(name, true) %>.resolver.ts
---
import { Context } from "<%= h.importPath(name, 'src/helpers/graphql/context') %>";
import { <%= h.name(name) %>Model } from "./<%= h.name(name, true) %>.model";
import { <%= h.name(name, true) %>Service } from "./<%= h.name(name, true) %>.service";

export default {
  Query: {
    getAll<%= h.name(name) %>: async (root: any, args: any, context: Context) => {
      const { q } = args;
      return await <%= h.name(name, true) %>Service.fetch(q);
    },
    getOne<%= h.name(name) %>: async (root: any, args: any, context: any) => {
      const { id } = args;

      return <%= h.name(name, true) %>Service.findById(id);
    },
  },
  Mutation: {
    create<%= h.name(name) %>: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { data } = args;
      const <%= h.name(name, true) %> = await <%= h.name(name, true) %>Service.create(data);
      return <%= h.name(name, true) %>;
    },
    update<%= h.name(name) %>: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { id, data } = args;
      return await <%= h.name(name, true) %>Service.update(id, data);
    },
    delete<%= h.name(name) %>: async (root: any, args: any, context: any) => {
      context.auth(["ADMIN"]);
      const { id } = args;
      return await <%= h.name(name, true) %>Service.delete(id);
    },
  },
};