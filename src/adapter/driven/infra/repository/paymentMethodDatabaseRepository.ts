import PaymentMethodRepository from "~core/applications/repositories/paymentMethodRepository";
import { PaymentMethod } from "~core/domain/paymentMethod";

import PaymentMethodModel from "../models/paymentMethodModel";

export default class PaymentMethodDatabaseRepository implements PaymentMethodRepository {
    listPagamentos(): Promise<PaymentMethod[]> {
        try {
            return PaymentMethodModel.findAll({ where: { ativo: 1 } });
        } catch (err: any) {
            console.error("Erro ao returnr list de pagamento: ", err);
            throw new Error(err);
        }

    }

}