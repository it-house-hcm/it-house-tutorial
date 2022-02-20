import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getProvince: [Province]
    getDistrict(provinceId: String!): [District]
    getWard(districtId: String!): [Ward]
  }
  type Province {
    id: ID!
    name: String!
    view: Int
  }
  type District {
    id: ID!
    name: String!
  }
  type Ward {
    id: ID!
    name: String!
  }
`;
