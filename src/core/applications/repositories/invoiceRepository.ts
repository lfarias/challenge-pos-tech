import { Invoice, StatusDePagamento } from "~core/domain/invoice";

export type CreateInvoiceInput = {
  orderId: string;
  paymentMethodId: string;
  qrCode: string | null
  statusDePagamento: StatusDePagamento;
};

export type UpdateInvoiceInput = {
  id: string;
  pagoEm: Date;
  qrCode?: string
};

export default interface InvoiceRepository {
  updateInvoice(updateInvoice: UpdateInvoiceInput): Promise<Invoice>;
  createInvoice(createrInvoiceInput: CreateInvoiceInput): Promise<Invoice>;
}
