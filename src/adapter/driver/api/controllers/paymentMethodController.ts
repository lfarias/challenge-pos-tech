import { Request, Response } from "express";

import PaymentMethodService from "~core/applications/services/paymentMethodService";

import { ListPagamentosParams, ListPagamentosPayload } from "../routers/schemas/pagamentoRouter.schema";

export default class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) { }

  async listPagamentos(
    req: Request<ListPagamentosParams, ListPagamentosPayload>, 
    res: Response
  ) {
    try {
      const pagamentos = await this.paymentMethodService.listPagamentos();
      return res.status(201).json({
        status: "success",
        message: pagamentos,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}