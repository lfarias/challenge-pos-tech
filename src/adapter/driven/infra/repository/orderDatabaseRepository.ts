import { WhereOptions } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import OrderRepository, {
  AdicionaItemInput,
  UpdateOrderInput,
  CreateOrderInput,
  RemoveItemInput,
} from "~core/applications/repositories/orderRepository";
import { ItemOrder } from "~core/domain/itemOrder";
import { Order, statusOrder } from "~core/domain/order";

import ItemOrderModel from "../models/itemOrderModel";
import OrderModel from "../models/orderModel";

class OrderDataBaseRepository implements OrderRepository {
  async createOrder({
    status,
    valor,
    clientId = null,
  }: CreateOrderInput): Promise<Order> {
    try {
      return OrderModel.create({
        id: uuidv4(),
        clientId,
        status,
        valor,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err: any) {
      console.error("Erro ao creater Order: ", err);
      throw new Error(err);
    }
  }

  async updateOrder({
    id,
    status,
    retiradoEm,
    invoiceId,
  }: UpdateOrderInput): Promise<Order> {
    try {
      return (await OrderModel.update(
        { status, retiradoEm, invoiceId },
        { where: { id } }
      ).then(() =>
        OrderModel.findOne({
          where: { id },
          include: ["itens", "invoice"],
        })
      )) as Order;
    } catch (err: any) {
      console.error("Erro ao updater Order: ", err);
      throw new Error(err);
    }
  }

  async returnOrder(id: string): Promise<Order | null> {
    try {
      return OrderModel.findOne({
        where: { id },
      });
    } catch (err: any) {
      console.error("Erro ao returnr order: ", err);
      throw new Error(err);
    }
  }

  async returnProximoOrderFila(): Promise<Order | null> {
    try {
      return await OrderModel.findOne({
        where: { status: statusOrder.AGUARDANDO_PREPARO },
        order: [['updatedAt', 'ASC']]
      });

    } catch (err: any) {
      console.error("Erro ao returnr proximo order da fila: ", err);
      throw new Error(err);
    }
  }

  async adicionaItem(adicionaItem: AdicionaItemInput): Promise<Order | null> {
    try {
      await ItemOrderModel.create({
        ...adicionaItem,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const order = await OrderModel.findOne({
        where: { id: adicionaItem.orderId },
      });

      if (!order) throw new Error("Order não encontrado");

      const valor = order.valor + adicionaItem.valorTotal;

      return (await OrderModel.update(
        { valor },
        { where: { id: adicionaItem.orderId } }
      ).then(() =>
        OrderModel.findOne({
          where: { id: adicionaItem.orderId },
          include: "itens",
        })
      )) as Order;
    } catch (err: any) {
      console.error("Erro ao adicionar item: ", err);
      throw new Error(err);
    }
  }

  async removeItem(removeItemInput: RemoveItemInput): Promise<Order | null> {
    try {
      await ItemOrderModel.destroy({
        where: { id: removeItemInput.itemId },
      });

      return (await OrderModel.update(
        { valor: removeItemInput.valorOrder },
        { where: { id: removeItemInput.orderId } }
      ).then(() =>
        OrderModel.findOne({
          where: { id: removeItemInput.orderId },
          include: "itens",
        })
      )) as Order;
    } catch (err: any) {
      console.error("Erro ao remove item: ", err);
      throw new Error(err);
    }
  }

  async returnItem(id: string): Promise<ItemOrder | null> {
    try {
      return ItemOrderModel.findOne({
        where: { id },
      });
    } catch (err: any) {
      console.error("Erro ao returnr item: ", err);
      throw new Error(err);
    }
  }

  async listOrders(status?: Array<string>, clientId?: string): Promise<Array<Order> | null> {
    try {
      let where: WhereOptions<Order> = { deletedAt: null };

      if (status && status.length > 0) {
        where = { ...where, status };
      }

      if (clientId && clientId.length > 0) {
        where = { ...where, clientId };
      }

      return OrderModel.findAll({
        where,
        order: [
          ["updatedAt", "ASC"],
          ["status", "ASC"],
        ],
        include: ["itens", "invoice"],
      });
    } catch (err: any) {
      console.error("Erro ao listr orders: ", err);
      throw new Error(err);
    }
  }
}

export default OrderDataBaseRepository;
