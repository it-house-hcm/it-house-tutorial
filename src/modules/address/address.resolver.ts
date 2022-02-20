import { AddressModel } from "./address.model";

export default {
  Query: {
    getProvince: async (root: any, args: any, context: any) => {
      const result = await AddressModel.aggregate([
        {
          $group: {
            _id: "$provinceId",
            name: { $first: "$province" },
            id: { $first: "$provinceId" },
          },
        },
      ]);
      return result;
    },
    getDistrict: async (root: any, args: any, context: any) => {
      const { provinceId } = args;
      const query = [
        { $match: { provinceId, districtId: { $exists: true } } },
        {
          $group: {
            _id: "$districtId",
            name: { $first: "$district" },
            id: { $first: "$districtId" },
          },
        },
        { $sort: { name: 1 } },
      ] as any;
      console.log("query", query);
      const result = await AddressModel.aggregate(query);
      console.log("result", result);
      return result;
    },
    getWard: async (root: any, args: any, context: any) => {
      const { districtId } = args;
      return await AddressModel.aggregate([
        { $match: { districtId, wardId: { $exists: true } } },
        {
          $group: {
            _id: "$wardId",
            name: { $first: "$ward" },
            id: { $first: "$wardId" },
          },
        },
        { $sort: { name: 1 } },
      ]);
    },
  },
};
