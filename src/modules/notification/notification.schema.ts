import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllNotification(q: QueryInput): NotificationPageData
    getOneNotification(id: ID!): Notification
  }
  type NotificationPageData {
    data: [Notification]
    pagination: Pagination
  }
  type Notification {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime

    "Mã người dùng"
    userId: ID
    "Tiêu đề"
    title: String
    "Nội dung"
    body: String
    "Ảnh"
    image: String
    "Đã đọc"
    read: Boolean
    "Thao tác"
    action: Action
  }
`;
