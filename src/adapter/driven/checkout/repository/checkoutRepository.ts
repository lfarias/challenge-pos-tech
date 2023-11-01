import QRCode from 'qrcode';

import CheckoutRepository, { GeraPagamentoInput } from "~core/applications/repositories/checkoutRepository";
import InvoiceRepository from '~core/applications/repositories/invoiceRepository';
import { Invoice, StatusDePagamento, statusDePagamento } from '~core/domain/invoice';


// FAKE CHECKOUT 
export default class FakeCheckout implements CheckoutRepository {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
  ) { }
  async geraPagamento(geraPagamentoInput: GeraPagamentoInput): Promise<Invoice> {
    // Deve validar a forma de pagamento e enviar o valor do order para o pagamento externo
    // O Fake checkout apenas vai gerar o fake qrcode e automaticamente mudar o status para aguardando preparo
    let qrCode: string | null = null;
    let status: StatusDePagamento = statusDePagamento.PAGAMENTO_APROVADO; // FIXADO
 
    try {
     qrCode = await QRCode.toDataURL('FAKE CHECKOUT') as string // Em um checkout real aqui seria a chamada externa
      
    } catch (err) {
      console.error(err);
      status = statusDePagamento.ERRO_AO_PROCESSAR_PAGAMENTO
    }

    return this.invoiceRepository.createInvoice({
      orderId:  geraPagamentoInput.order.id,
      paymentMethodId:  geraPagamentoInput.paymentMethodId,
      qrCode,
      statusDePagamento: status,
    });
  }
}
