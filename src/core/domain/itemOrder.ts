import { Product } from "./product";

export interface ItemOrder {
  id: string;
  productId: string;
  product?: Product;
  orderId: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ItensOrder = Array<ItemOrder>;
