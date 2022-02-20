import { json } from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

export function startExpressServer() {
  app.use(json());
  app.use(cors());
  app.use(
    morgan(
      ":date[clf] :method :url :status :res[content-length] - :response-time ms"
    )
  );

  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.post("/post", (req, res) => {
    console.log("body", req.body);
    res.json(req.body);
  });
  app.listen(4000, () => {
    console.log("listening on port http://localhost:4000");
  });
}

export default app;
