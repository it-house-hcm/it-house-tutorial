import { Context } from "../../helpers/graphql/context";
import { gql } from "apollo-server-express";
import { Schema } from "mongoose";
import { getDistance } from "../../helpers/functions/location";

export type Place = {
  address?: string; // Địa chỉ
  provinceId?: string; // ID tỉnh
  districtId?: string; // ID quận
  wardId?: string; // ID phường
  provinceName?: string; // Tên tỉnh
  districtName?: string; // Tên quận
  wardName?: string; // Tên phường
  location?: any; // Vị trí
};

export const PlaceSchema = new Schema({
  address: { type: String },
  provinceId: { type: String },
  districtId: { type: String },
  wardId: { type: String },
  provinceName: { type: String },
  districtName: { type: String },
  wardName: { type: String },
  location: { type: Schema.Types.Mixed },
});

PlaceSchema.index({ location: "2dsphere" });

export default {
  schema: gql`
    type Place {
      "Địa chỉ"
      address: String
      "ID tỉnh"
      provinceId: String
      "ID quận"
      districtId: String
      "ID phường"
      wardId: String
      "Tên tỉnh"
      provinceName: String
      "Tên quận"
      districtName: String
      "Tên phường"
      wardName: String
      "Vị trí"
      location: Mixed

      "Khoảng cách"
      distance(lng: Float!, lat: Float!): Float
    }
    input PlaceInput {
      "Địa chỉ"
      address: String
      "ID tỉnh"
      provinceId: String
      "ID quận"
      districtId: String
      "ID phường"
      wardId: String
      "Tên tỉnh"
      provinceName: String
      "Tên quận"
      districtName: String
      "Tên phường"
      wardName: String
      "Vị trí"
      location: Mixed
    }
  `,
  resolvers: {
    Place: {
      distance: (place: Place, { lng, lat }: { lng: number; lat: number }) => {
        return getDistance(
          place.location.coordinates[0],
          place.location.coordinates[1],
          lng,
          lat
        );
      },
    },
  },
};
