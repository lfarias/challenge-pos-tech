import { PaymentMethod } from "./paymentMethod";
import { Order } from "./order";

export const statusDePagamento = {
  AGUARDANDO_PAGAMENTO: "Aguardando pagamento",
  ERRO_AO_PROCESSAR_PAGAMENTO: "Erro ao processar pagamento",
  PAGAMENTO_APROVADO: "Pagamento aprovado",
  PAGAMENTO_NEGADO: "Pagamento negado",
} as const;

export type StatusDePagamento =
  (typeof statusDePagamento)[keyof typeof statusDePagamento];

export interface Invoice {
  id: string;
  orderId: string;
  order?: Order;
  paymentMethodId: string;
  paymentMethod?: PaymentMethod;
  statusDePagamento: StatusDePagamento;
  pagoEm: Date | null;
  qrCode: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
