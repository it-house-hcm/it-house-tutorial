import DataLoader from "dataloader";
import _ from "lodash";
import { Model } from "mongoose";
import { ttlCache } from "./ttlCache";

export function getModelDataLoader<T>(model: Model<T>) {
  return new DataLoader(
    async (ids) => {
      const items = await model.find({ _id: { $in: ids } });
      const keyById = _.keyBy(items, "_id");
      return ids.map((id) => _.get(keyById, id as string, null)) as T[];
    },
    { cache: true, cacheMap: ttlCache({ ttl: 10000, maxSize: 100 }) }
  );
}
