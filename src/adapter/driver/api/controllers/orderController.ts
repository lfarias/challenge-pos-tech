import { Request, Response } from "express";

import OrderService from "~core/applications/services/orderService";

import {
  AdicionarItemBody,
  AdicionarItemParams,
  DeliveryOrderParams,
  FinishPreparoParams,
  IniciaOrderPayload,
  StartPreparoParams,
  ListOrdersQuery,
  AccomplishOrderBody,
  AccomplishOrderParams,
  RemoveItemParams,
} from "../routers/schemas/orderRouter.schema";

export default class OrderController {
  constructor(private readonly orderService: OrderService) { }

  async iniciaOrder(
    req: Request<unknown, IniciaOrderPayload>,
    res: Response
  ) {
    try {
      const { body } = req;

      const orderCreatedo = await this.orderService.iniciaOrder(body);

      return res.status(201).json({
        status: "success",
        message: orderCreatedo,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async realizaOrder(
    req: Request<AccomplishOrderParams, AccomplishOrderBody>,
    res: Response
  ) {
    try {
      const { params, body } = req;

      const orderCreatedo = await this.orderService.realizaOrder({
        orderId: params.id,
        paymentMethodId: body.paymentMethodId,
      });

      return res.status(201).json({
        status: "success",
        message: orderCreatedo,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async iniciaPreparo(req: Request<StartPreparoParams>, res: Response) {
    try {
      const { orderId } = req.query;

      const order = await this.orderService.iniciaPreparo(orderId as string);

      if (order) {
        return res.status(201).json({
          status: "success",
          message: order,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Nenhum order na fila",
      })

    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async finalizaPreparo(req: Request<FinishPreparoParams>, res: Response) {
    try {
      const { params } = req;

      const order = await this.orderService.finalizaPreparo(params.id);

      return res.status(201).json({
        status: "success",
        message: order,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async entregaOrder(req: Request<DeliveryOrderParams>, res: Response) {
    try {
      const { params } = req;

      const order = await this.orderService.entregaOrder(params.id);

      return res.status(201).json({
        status: "success",
        message: order,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async adicionaItem(
    req: Request<AdicionarItemParams, AdicionarItemBody>,
    res: Response
  ) {
    try {
      const { body, params } = req;

      const order = await this.orderService.adicionaItem({
        ...body,
        orderId: params.id,
      });

      return res.status(201).json({
        status: "success",
        message: order,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async removeItem(req: Request<RemoveItemParams>, res: Response) {
    try {
      const { params } = req;

      const order = await this.orderService.removeItem({
        orderId: params.id,
        itemId: params.idItem,
      });

      return res.status(201).json({
        status: "success",
        message: order,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async listOrders(
    req: Request<unknown, unknown, ListOrdersQuery>,
    res: Response
  ) {
    try {
      const { query } = req;

      let status: Array<string> = [];
      const clientId = query.clientId as string;
      if (query?.status && typeof query.status === "string") {
        status = query.status.split(",");
      }

      const orders = await this.orderService.listOrders(status, clientId);

      return res.status(200).json({
        status: "success",
        message: orders,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}
