import { GraphqlServer } from "./helpers/graphql/apollo";
import app, { startExpressServer } from "./helpers/express";

startExpressServer();

const graphqlServer = new GraphqlServer(app);

graphqlServer.start();
