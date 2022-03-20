import _ from "lodash";
import { Context } from "../../../helpers/graphql/context";
import { BranchModel } from "./branch.model";
import { branchService } from "./branch.service";

export default {
  Query: {
    getAllBranch: async (root: any, args: any, context: Context) => {
      const { q } = args;
      if (!context.isAdmin) {
        _.set(q, "filter.active", true);
      }
      return await branchService.fetch(q);
    },
    getOneBranch: async (root: any, args: any, context: any) => {
      const { id } = args;

      return branchService.findById(id);
    },
  },
  Mutation: {
    createBranch: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { data } = args;
      const branch = await branchService.create(data);
      return branch;
    },
    updateBranch: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { id, data } = args;
      return await branchService.update(id, data);
    },
    deleteBranch: async (root: any, args: any, context: any) => {
      context.auth(["ADMIN"]);
      const { id } = args;
      return await branchService.delete(id);
    },
  },
};
