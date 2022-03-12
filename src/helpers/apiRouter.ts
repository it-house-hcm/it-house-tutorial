import { Application, Request, Response, Router } from "express";
import { loadRouter } from "./autoloader";
import logger from "./logger";

export type RouterConfig = {
  method: "get" | "post" | "put" | "delete";
  path: string;
  midd: ((req: Request, res: Response, next: () => void) => void)[];
  handler: (req: Request, res: Response) => Promise<void>;
};

export class ApiRouter {
  router = Router();
  constructor(private app: Application) {}

  async start(path = "/api") {
    const configs = await loadRouter();

    for (const { method, path, midd, handler } of configs) {
      this.router[method](path, midd, handler);
    }

    this.app.use(path, this.router);

    logger.info(`API router started at ${path}`);
  }
}
