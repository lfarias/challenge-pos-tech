import { PaymentMethod } from "~core/domain/paymentMethod";

export default interface PaymentMethodRepository {
    listPagamentos(): Promise<PaymentMethod[]>;
  }
  