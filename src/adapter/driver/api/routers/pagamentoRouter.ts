import express from "express";

import PaymentMethodService from "~core/applications/services/paymentMethodService";
import PaymentMethodDatabaseRepository from "~driven/infra/repository/paymentMethodDatabaseRepository";

import PaymentMethodController from "../controllers/paymentMethodController";

import { ListPagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { validaRequisicao } from "./utils";

const paymentMethod = express.Router();

const dbPaymentMethodRepository = new PaymentMethodDatabaseRepository();
const paymentMethodService = new PaymentMethodService(dbPaymentMethodRepository);
const paymentMethodController = new PaymentMethodController(paymentMethodService);

/**
 * @openapi
 * /paymentMethod:
 *   get:
 *     summary: List metodos de pagamento
 *     tags:
 *       - PaymentMethods
 *     responses:
 *       200:
 *         description: list de metodos de pagamento.
 *       500:
 *         description: Erro na api.
 */
paymentMethod.get("/",
  validaRequisicao(ListPagamentosSchema),
  paymentMethodController.listPagamentos.bind(paymentMethodController)
);

export default paymentMethod;
