import DataLoader from "dataloader";
import { BaseDocument } from "../../base/baseModel";

export namespace GraphqlResolver {
  export function loadMany<T extends BaseDocument>(
    loader: DataLoader<string, T>,
    field: string
  ) {
    return async (root: any, args: any, context: any) => {
      if (!root[field]) return [];
      const ids = root[field] as string[];
      return await loader.loadMany(ids.map((id) => id.toString()));
    };
  }

  export function load<T extends BaseDocument>(
    loader: DataLoader<string, T>,
    field: string
  ) {
    return async (root: any, args: any, context: any) => {
      if (!root[field]) return null;
      const id = root[field] as string;
      return await loader.load(id.toString());
    };
  }
}
