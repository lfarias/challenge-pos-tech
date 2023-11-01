import { Invoice, StatusDePagamento } from "~core/domain/invoice";
import { Order } from "~core/domain/order";

export interface Pagamento {
  qrCode?: string;
  statusDePagamento: StatusDePagamento;
}

export type GeraPagamentoInput = { paymentMethodId: string; order: Order }

export default interface CheckoutRepository {
  geraPagamento(geraPagamentoInput: GeraPagamentoInput): Promise<Invoice>;
}
