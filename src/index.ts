import dotenv from "dotenv";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { DataBaseConfig } from "./adapter/driven/infra/config/db.config";
import Modelos from "./adapter/driven/infra/models";
import { Server } from "./adapter/driver/api/config/server.config";
import {
  categoryRouter,
  paymentMethod,
  orderRouter,
  productRouter,
  userRouter,
} from "./adapter/driver/api/routers/index";
import specs from "./adapter/driver/api/swaggerConfig";

dotenv.config();

const database = new DataBaseConfig({
  database: process.env.DB_NAME ?? "projeto",
  host: process.env.DB_HOST ?? "localhost",
  userName: process.env.DB_USERNAME ?? "root",
  password: process.env.DB_PASSWORD ?? "CieloArv4",
  port: 3306,
});

async function init() {
  
  await database.authenticate();
  await database.synchronizeModels(Modelos);

  const app: Express = express();

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  const server = new Server({ appConfig: app });

  server.addRouter("/api/category", categoryRouter);
  server.addRouter("/api/product", productRouter);
  server.addRouter("/api/order", orderRouter);
  server.addRouter("/api/user", userRouter);
  server.addRouter("/api/paymentMethod", paymentMethod);

  server.init();
}

init();
