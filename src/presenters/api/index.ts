import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { Server } from "./config/server.config";
import {
<<<<<<< HEAD
  categoriaRouter,
  metodoPagamentoRouter,
  pagamentoRouter,
  pedidoRouter,
  produtoRouter,
=======
    categoriaRouter,
    metodoPagamentoRouter,
    pagamentoRouter,
    pedidoRouter,
    produtoRouter,
    usuarioRouter,
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
} from "./routers/index";
import specs from "./swaggerConfig";

export default class API {
<<<<<<< HEAD
  private app: Express;

  constructor() {
    this.app = express();
  }

  start() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    const server = new Server({ appConfig: this.app });

    server.addRouter("/api/categoria", categoriaRouter);
    server.addRouter("/api/produto", produtoRouter);
    server.addRouter("/api/pedido", pedidoRouter);
    server.addRouter("/api/metodo-pagamento", metodoPagamentoRouter);
    server.addRouter("/api/pagamento", pagamentoRouter);

    server.init();
  }
=======
    private app: Express;

    constructor() {
        this.app = express();
    }

    start() {
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

        const server = new Server({ appConfig: this.app });

        server.addRouter("/api/categoria", categoriaRouter);
        server.addRouter("/api/produto", produtoRouter);
        server.addRouter("/api/pedido", pedidoRouter);
        server.addRouter("/api/usuario", usuarioRouter);
        server.addRouter("/api/metodo-pagamento", metodoPagamentoRouter);
        server.addRouter("/api/pagamento", pagamentoRouter);

        server.init();
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
}


