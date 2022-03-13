import { Context } from "../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { UserLoader } from "../user/user.model";
import { NotificationModel } from "./notification.model";
import firebase from "../../helpers/firebase";
import _ from "lodash";

export default {
  schema: gql`
    extend type Mutation {
      sendNotify(data: SendNotifyInput!): String
    }
    input SendNotifyInput {
      sendTo: ID!
      title: String!
      body: String!
      image: String
      action: ActionInput
    }
  `,
  resolvers: {
    Mutation: {
      sendNotify: async (root: any, args: any, context: Context) => {
        // context.auth(["ADMIN"]);

        const { sendTo, title, body, image, action } = args.data;

        // check user is exists
        const user = await UserLoader.load(sendTo);
        if (!user) {
          throw new Error("User not found");
        }

        // create notification
        const notification = await NotificationModel.create({
          userId: user._id,
          title: title,
          body: body,
          image: image,
          read: false,
          action: action,
        });

        const deviceTokens = user.deviceTokens;
        if (deviceTokens && deviceTokens.length > 0) {
          for (const token of deviceTokens) {
            const fcmPayload = {
              notification: {
                title: title,
                body: body,
                clickAction: "https://www.google.com",
              },
            };
            if (image) {
              _.set(fcmPayload, "notification.icon", image);
            }
            console.log(fcmPayload);
            // send fcm to user
            firebase.messaging().sendToDevice(token, fcmPayload);
          }
        }

        return "ok";
      },
    },
  },
};
