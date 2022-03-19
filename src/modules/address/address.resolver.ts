import _ from "lodash";
import logger from "../../helpers/logger";
import redis from "../../helpers/redis";
import { AddressModel } from "./address.model";

export default {
  Query: {
    getProvince: async (root: any, args: any, context: any) => {
      redis.incr("address:province:view");
      return await getProvince();
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
  Province: {
    view: async (root: any, args: any, context: any) => {
      return (await redis.get("address:province:view")) || 0;
    },
  },
};

async function getProvince() {
  const key = `address:province`;
  const result = await redis.get(key);
  if (_.isEmpty(result) == false) {
    logger.info(`Get province from redis`);
    return JSON.parse(result as string);
  }
  logger.info(`Get province from db`);

  const data = await AddressModel.aggregate([
    {
      $group: {
        _id: "$provinceId",
        name: { $first: "$province" },
        id: { $first: "$provinceId" },
      },
    },
  ]);

  await redis.set(key, JSON.stringify(data));

  return data;
}
