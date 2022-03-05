import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllProduct(q: QueryInput): ProductPageData
    getOneProduct(id: ID!): Product
  }
  extend type Mutation {
    createProduct(data: CreateProductInput!): Product
    updateProduct(id: ID!, data: UpdateProductInput!): Product
    deleteProduct(id: ID!): Boolean
  }
  type ProductPageData {
    data: [Product]
    pagination: Pagination
  }
  type Product {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime

    "Mã sản phẩm"
    code: String
    "Tên sản phẩm"
    name: String
    "Mô tả"
    description: String
    "Ảnh"
    images: [String]
    "Giá gốc"
    basePrice: Float
    "Giá bán"
    sellPrice: Float
    "Trạng thái"
    active: Boolean
    "ID danh mục"
    categoryId: ID
    "Lượt xem"
    view: Int
    "Thuộc tính"
    attributes: [Attribute]

    "Danh mục"
    category: Category
  }

  input CreateProductInput {
    "Mã sản phẩm"
    code: String
    "Tên sản phẩm"
    name: String!
    "Mô tả"
    description: String
    "Ảnh"
    images: [String]
    "Giá gốc"
    basePrice: Float
    "Giá bán"
    sellPrice: Float
    "Trạng thái"
    active: Boolean
    "ID danh mục"
    categoryId: ID
    "Thuộc tính"
    attributes: [AttributeInput]
  }

  input UpdateProductInput {
    "Mã sản phẩm"
    code: String
    "Tên sản phẩm"
    name: String
    "Mô tả"
    description: String
    "Ảnh"
    images: [String]
    "Giá gốc"
    basePrice: Float
    "Giá bán"
    sellPrice: Float
    "Trạng thái"
    active: Boolean
    "ID danh mục"
    categoryId: ID
    "Thuộc tính"
    attributes: [AttributeInput]
  }
`;
