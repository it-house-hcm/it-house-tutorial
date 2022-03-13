import _ from "lodash";
import { Context } from "../../helpers/graphql/context";
import { NotificationModel } from "./notification.model";
import { notificationService } from "./notification.service";

export default {
  Query: {
    getAllNotification: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN", "USER"]);
      const { q } = args;
      _.set(q, "filter.userId", context.userId);
      return await notificationService.fetch(q);
    },
    getOneNotification: async (root: any, args: any, context: any) => {
      context.auth(["ADMIN", "USER"]);
      const { id } = args;
      return notificationService.findById(id);
    },
  },
};
