<<<<<<< HEAD
import express, { NextFunction } from "express";
import { Request, Response } from "express";
import throwError from "handlerError/handlerError";

import MetodoPagamentoDatabaseRepository from "~datasources/database/repository/metodoPagamentoDatabaseRepository";
import { TipoUsuario } from "~domain/repositories/authenticationRepository";
import MetodoPagamentoUseCase from "~domain/useCases/metodoPagamentoUseCase";

import authenticate from "../middleware/auth";

=======
import express from "express";
import { Request, Response } from "express";

import MetodoPagamentoDatabaseRepository from "~datasources/database/repository/metodoPagamentoDatabaseRepository";
import MetodoPagamentoUseCase from "~domain/useCases/metodoPagamentoUseCase";

>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
import { ListaPagamentosParams, ListaPagamentosPayload, ListaPagamentosSchema } from "./schemas/metodoPagamentoRouter.schema";
import { validaRequisicao } from "./utils";

const metodoPagamentoRouter = express.Router();

const dbMetodoPagamentoRepository = new MetodoPagamentoDatabaseRepository();

/**
 * @openapi
 * /metodo-pagamento:
 *   get:
 *     summary: Lista metodos de pagamento
 *     tags:
 *       - MetodoPagamentos
<<<<<<< HEAD
 *     security:
 *       - bearerAuth: []
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
 *     responses:
 *       200:
 *         description: lista de metodos de pagamento.
 *       500:
 *         description: Erro na api.
 */
metodoPagamentoRouter.get("/",
<<<<<<< HEAD
  authenticate(TipoUsuario.CLIENT),
  validaRequisicao(ListaPagamentosSchema),
  async (
    req: Request<ListaPagamentosParams, ListaPagamentosPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pagamentos = await MetodoPagamentoUseCase.listaPagamentos(dbMetodoPagamentoRepository);

      if (!pagamentos) {
        throwError('NOT_FOUND', 'Pagamentos nao Encontrado');
      }


=======
  validaRequisicao(ListaPagamentosSchema),
  async (
    req: Request<ListaPagamentosParams, ListaPagamentosPayload>, 
    res: Response
  ) => {
    try {
      const pagamentos = await MetodoPagamentoUseCase.listaPagamentos(dbMetodoPagamentoRepository);
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
      return res.status(201).json({
        status: "success",
        message: pagamentos,
      });
<<<<<<< HEAD
    } catch (err: unknown) {
      console.log(`Erro ao buscar pagamento: ${err}`)
      return next(err);
=======
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }
  },
);

export default metodoPagamentoRouter;
