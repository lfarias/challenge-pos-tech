<<<<<<< HEAD
import express, { NextFunction } from "express";
=======
import express from "express";
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
import { Request, Response } from "express";

import FaturaDataBaseRepository from "~datasources/database/repository/faturaDatabaseRepository";
import PagamentoDatabaseRepository from "~datasources/database/repository/pagamentoDatabaseRepository";
import PedidoDataBaseRepository from "~datasources/database/repository/pedidoDatabaseRepository";
<<<<<<< HEAD
import { TipoUsuario } from "~domain/repositories/authenticationRepository";
import { PagamentoController } from "~interfaceAdapters/controllers/pagamentoController";

import authenticate from "../middleware/auth";

=======
import { PagamentoController } from "~interfaceAdapters/controllers/pagamentoController";

>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
import { RecebimentoDePagamentosPayload, RecebimentoDePagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { validaRequisicao } from "./utils";

const pagamentoRouter = express.Router();

const dbPagamentoRepository = new PagamentoDatabaseRepository();
const pedidoRepository = new PedidoDataBaseRepository()
const faturaRepository = new FaturaDataBaseRepository()


/**
 * @openapi
 * /pagamento:
 *   post:
 *     summary: Recebe confirmação ou negação de pagamento (Para teste pagamentoId=7ef6e15a-9f11-40fe-9d19-342505377600 )
 *     tags:
 *       - Pagamento
<<<<<<< HEAD
 *     security:
 *       - bearerAuth: []
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pagamentoId:
 *                 type: string
 *                 default: 7ef6e15a-9f11-40fe-9d19-342505377600 
 *               faturaId:
 *                 type: string
 *               isPago:
 *                 type: boolean
 *               valorPagamento:
 *                 type: number
 *               tipoDePagamento:
 *                 type: string
 *                 default: "QRCode"
 *     responses:
 *       200:
 *         description: lista de metodos de pagamento.
 *       500:
 *         description: Erro na api.
 */
pagamentoRouter.post("/",
<<<<<<< HEAD
  authenticate(TipoUsuario.ADMIN),
  validaRequisicao(RecebimentoDePagamentosSchema),
  async (
    req: Request<unknown, RecebimentoDePagamentosPayload>,
    res: Response,
    next: NextFunction
=======
  validaRequisicao(RecebimentoDePagamentosSchema),
  async (
    req: Request<unknown, RecebimentoDePagamentosPayload>,
    res: Response
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  ) => {
    try {
      const { body } = req;
      const pagamentoCriado = await PagamentoController.recebePagamento(
        faturaRepository,
        pedidoRepository,
        dbPagamentoRepository,
        body);
<<<<<<< HEAD

=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
      return res.status(201).json({
        status: "success",
        message: pagamentoCriado,
      });
<<<<<<< HEAD
    } catch (err: unknown) {
      console.log(`Erro ao criar  pagamento: ${err}`)
      return next(err);
=======
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }
  })

export default pagamentoRouter;
