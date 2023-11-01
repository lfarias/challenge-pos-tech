import { PaymentMethod } from "~core/domain/paymentMethod";

import PaymentMethodRepository from "../repositories/paymentMethodRepository";

export default class PaymentMethodService {
    constructor(
      private readonly checkoutRepository: PaymentMethodRepository,
    ) {}

    async listPagamentos(): Promise<PaymentMethod[]> {
        return this.checkoutRepository.listPagamentos();
    }
}