import { ItemOrder } from "~core/domain/itemOrder";
import { Order, StatusOrder } from "~core/domain/order";

export type CreateOrderInput = {
  clientId?: string | null;
  valor: number;
  status: StatusOrder;
};

export type UpdateOrderInput = {
  id: string;
  status?: StatusOrder;
  retiradoEm?: Date;
  invoiceId?: string;
};

export type AdicionaItemInput = {
  orderId: string;
  productId: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao?: string | null;
};

export type RemoveItemInput = {
  orderId: string;
  itemId: string;
  valorOrder: number;
};

export type ReturnItemInput = {
  id: string;
};

export default interface OrderRepository {
  createOrder(createrOrderInput: CreateOrderInput): Promise<Order>;
  updateOrder(updateOrderInput: UpdateOrderInput): Promise<Order>;
  adicionaItem(adicionarItemInput: AdicionaItemInput): Promise<Order | null>;
  returnOrder(id: string): Promise<Order | null>;
  listOrders(status?: Array<string>, clientId?: string): Promise<Array<Order> | null>;
  returnProximoOrderFila(): Promise<Order | null>;
  removeItem(removeItemInput: RemoveItemInput): Promise<Order | null>;
  returnItem(id: string): Promise<ItemOrder | null>;
}
