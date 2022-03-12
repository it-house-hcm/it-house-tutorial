import { Autoloader } from "autoloader-ts";
import _ from "lodash";
import { RouterConfig } from "./apiRouter";

export async function loadGraphqlSchema() {
  const loader = await Autoloader.dynamicImport();
  await loader.fromGlob(__dirname + "/../modules/**/*.schema.ts");
  const exports = loader.getResult().exports;
  return exports;
}

export async function loadGraphqlResolver() {
  const loader = await Autoloader.dynamicImport();
  await loader.fromGlob(__dirname + "/../modules/**/*.resolver.ts");
  const exports = loader.getResult().exports;
  return _.reduce(
    exports,
    (pre, value) => {
      return _.merge(pre, value);
    },
    {} as any
  );
}

export async function loadGraphql() {
  const loader = await Autoloader.dynamicImport();
  await loader.fromGlob(__dirname + "/../modules/**/*.graphql.ts");
  const exports = loader.getResult().exports;
  return _.reduce(
    exports,
    (pre, value) => {
      if (value.schema) {
        pre.typedefs.push(value.schema);
      }
      if (value.resolvers) {
        pre.resolvers = _.merge(pre.resolvers, value.resolvers);
      }
      return pre;
    },
    { typedefs: [], resolvers: {} } as { typedefs: any[]; resolvers: any }
  );
}

export async function loadRouter() {
  const loader = await Autoloader.dynamicImport();
  await loader.fromGlob(__dirname + "/../modules/**/*.router.ts");
  const exports = loader.getResult().exports;
  return _.reduce(
    exports,
    (pre, value) => {
      return pre.concat(value);
    },
    [] as RouterConfig[]
  );
}
