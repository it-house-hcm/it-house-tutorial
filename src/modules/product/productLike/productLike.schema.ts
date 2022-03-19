import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllProductLike(q: QueryInput): ProductLikePageData
    getOneProductLike(id: ID!): ProductLike
  }
  type ProductLikePageData {
    data: [ProductLike]
    pagination: Pagination
  }
  type ProductLike {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime

    "Mã sản phẩm"
    productId: ID
    "Mã người dùng"
    userId: ID
  }
`;
