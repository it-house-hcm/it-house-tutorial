import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllCategory(q: QueryInput): CategoryPageData
    getOneCategory(id: ID!): Category
  }
  extend type Mutation {
    createCategory(data: CreateCategoryInput!): Category
    updateCategory(id: ID!, data: UpdateCategoryInput!): Category
    deleteCategory(id: ID!): Boolean
  }
  type CategoryPageData {
    data: [Category]
    pagination: Pagination
  }
  type Category {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime

    "Tên danh mục"
    name: String
    "Mô tả"
    description: String
    "Trạng thái"
    active: Boolean
    "Ưu tiên"
    priority: Int
    "Mã sản phẩm"
    productIds: [ID]

    "Sản phẩm"
    products: [Product]
  }

  input CreateCategoryInput {
    "Tên danh mục"
    name: String!
    "Mô tả"
    description: String
    "Trạng thái"
    active: Boolean
    "Ưu tiên"
    priority: Int
    "Mã sản phẩm"
    productIds: [ID]
  }

  input UpdateCategoryInput {
    "Tên danh mục"
    name: String
    "Mô tả"
    description: String
    "Trạng thái"
    active: Boolean
    "Ưu tiên"
    priority: Int
    "Mã sản phẩm"
    productIds: [ID]
  }
`;
