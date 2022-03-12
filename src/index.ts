import { GraphqlServer } from "./helpers/graphql/apollo";
import app, { startExpressServer } from "./helpers/express";
import { ApiRouter } from "./helpers/apiRouter";

startExpressServer();

const graphqlServer = new GraphqlServer(app);

graphqlServer.start();

const apiRouter = new ApiRouter(app);

apiRouter.start();
