import express from "express";

import OrderService from "~core/applications/services/orderService";
import FakeCheckout from "~driven/checkout/repository/checkoutRepository";
import InvoiceDataBaseRepository from "~driven/infra/repository/invoiceDatabaseRepository";
import OrderDataBaseRepository from "~driven/infra/repository/orderDatabaseRepository";
import ProductsDataBaseRepository from "~driven/infra/repository/productDatabaseRepository";

import OrderController from "../controllers/orderController";

import {
  adicionarItemSchema,
  deliveryOrderSchema,
  finishPreparoSchema,
  iniciaOrderSchema,
  startPreparoSchema,
  listrOrdersSchema,
  accomplishOrderSchema,
  removeItemSchema,
} from "./schemas/orderRouter.schema";
import { validaRequisicao } from "./utils";

const orderRouter = express.Router({});

const dbOrdersRepository = new OrderDataBaseRepository();
const dbProductRepository = new ProductsDataBaseRepository();
const dbInvoiceRepository = new InvoiceDataBaseRepository();
const checkoutRepository = new FakeCheckout(dbInvoiceRepository);

const orderService = new OrderService(
  dbOrdersRepository,
  dbProductRepository,
  checkoutRepository
);

const orderController = new OrderController(orderService);

/**
 * @openapi
 * /order/{id}/adicionar-item:
 *   post:
 *     summary: Adiciona um product ao order
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do order
 *     tags:
 *       - order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantidade:
 *                 type: number
 *               observacao:
 *                 type: string
 *     responses:
 *       201:
 *         description: product adicionado.
 *       404:
 *         description: order ou product nao encontrado.
 *       500:
 *         description: Erro na api.
 */
orderRouter.post(
  "/:id/adicionar-item",
  validaRequisicao(adicionarItemSchema),
  orderController.adicionaItem.bind(orderController)
);

/**
 * @openapi
 * /order/{id}/remove-item/{idItem}:
 *   delete:
 *     summary: Remove um product ao order
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do order
 *       - in: path
 *         name: idItem
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do item do order
 *     tags:
 *       - order
 *     responses:
 *       200:
 *         description: return order.
 *       404:
 *         description: order nao encontrado.
 *       500:
 *         description: Erro na api.
 */
orderRouter.delete(
  "/:id/remove-item/:idItem",
  validaRequisicao(removeItemSchema),
  orderController.removeItem.bind(orderController)
);

/**
 * @openapi
 * /order/start-order:
 *   post:
 *     summary: Create um rascunho de order
 *     tags:
 *       - order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *     responses:
 *       201:
 *         description: order createdo.
 *       404:
 *         description: order ou product nao encontrado.
 *       500:
 *         description: Erro na api.
 */
orderRouter.post(
  "/start-order",
  validaRequisicao(iniciaOrderSchema),
  orderController.iniciaOrder.bind(orderController)
);

/**
 * @openapi
 * /order/accomplish-order/{id}:
 *   patch:
 *     summary: Finaliza a customizacao do order e envia para checkout (fake checkou já aprova)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do order
 *     tags:
 *       - order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethodId:
 *                 type: string
 *     responses:
 *       201:
 *         description: updatecao do order.
 *       404:
 *         description: order ou product nao encontrado.
 *       500:
 *         description: Erro na api.
 */
orderRouter.patch(
  "/accomplish-order/:id",
  validaRequisicao(accomplishOrderSchema),
  orderController.realizaOrder.bind(orderController)
);

/**
 * @openapi
 * /order/start-preparo/:
 *   patch:
 *     summary: Muda status do proximo order da fila para "Em preparo" ou um order especifico
 *     tags:
 *       - order
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         required: false
 *         description: Id do order
 *     responses:
 *       201:
 *         description: updatecao do order.
 *       404:
 *         description: order ou product nao encontrado.
 *       500:
 *         description: Erro na api.
 */
orderRouter.patch(
  "/start-preparo/",
  validaRequisicao(startPreparoSchema),
  orderController.iniciaPreparo.bind(orderController)
);

/**
 * @openapi
 * /order/finish-preparo/{id}:
 *   patch:
 *     summary: Muda status para "Pronto"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do order
 *     tags:
 *       - order
 *     responses:
 *       201:
 *         description: updatecao do order.
 *       404:
 *         description: order ou product nao encontrado.
 *       500:
 *         description: Erro na api.
 */
orderRouter.patch(
  "/finish-preparo/:id",
  validaRequisicao(finishPreparoSchema),
  orderController.finalizaPreparo.bind(orderController)
);

/**
 * @openapi
 * /order/delivery-order/{id}:
 *   patch:
 *     summary: Muda status para "Finalizado"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do order
 *     tags:
 *       - order
 *     responses:
 *       201:
 *         description: updatecao do order.
 *       404:
 *         description: order ou product nao encontrado.
 *       500:
 *         description: Erro na api.
 */
orderRouter.patch(
  "/delivery-order/:id",
  validaRequisicao(deliveryOrderSchema),
  orderController.entregaOrder.bind(orderController)
);

/**
 * @openapi
 * /order/:
 *   get:
 *     summary: List os orders e filtra a fila por status
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Status do order que deseja filtrar
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: false
 *         description: Return os orders do client
 *     tags:
 *       - order
 *     responses:
 *       200:
 *         description: list de orders.
 *       404:
 *         description: order ou product nao encontrado.
 *       500:
 *         description: Erro na api.
 */
orderRouter.get(
  "/",
  validaRequisicao(listrOrdersSchema),
  orderController.listOrders.bind(orderController)
);

export default orderRouter;
