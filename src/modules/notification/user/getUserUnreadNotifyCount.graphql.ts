import { Context } from "../../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { NotificationModel } from "../notification.model";
import DataLoader from "dataloader";
import { Types } from "mongoose";
import _ from "lodash";

export default {
  schema: gql`
    extend type User {
      unreadNotify: Int
    }
  `,
  resolvers: {
    User: {
      unreadNotify: async (root: any, args: any, context: Context) => {
        return UserUnreadNotifyLoader.load(root._id.toString());
      },
    },
  },
};

const UserUnreadNotifyLoader = new DataLoader<string, number>((ids) => {
  const objectIds = ids.map((id) => new Types.ObjectId(id));
  return NotificationModel.aggregate([
    { $match: { userId: { $in: objectIds }, read: false } },
    { $group: { _id: "$userId", count: { $sum: 1 } } },
  ]).then((res) => {
    const keyByIds = _.keyBy(res, "_id");
    return ids.map((id) => _.get(keyByIds, `${id}.count`, 0)) as number[];
  });
});
