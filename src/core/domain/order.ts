import { Invoice } from "./invoice";
import { ItensOrder } from "./itemOrder";

export interface Order {
  id: string;
  clientId: string | null /** Todo: Vincular ao client */;
  client?: any /** Todo: Vincular ao client */;
  invoiceId?: string;
  invoice?: Invoice;
  status: StatusOrder;
  valor: number;
  itens?: ItensOrder;
  retiradoEm: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export const statusOrder = {
  RASCUNHO: "Rascunho",
  AGUARDANDO_PAGAMENTO: "Aguardando pagamento",
  FALHA: "Falha em gerar order",
  AGUARDANDO_PREPARO: "Aguardando preparo",
  EM_PREPARO: "Em preparo",
  PRONTO: "Pronto",
  ENTREGUE: "Entregue",
} as const;

export type StatusOrder =
  (typeof statusOrder)[keyof typeof statusOrder];
