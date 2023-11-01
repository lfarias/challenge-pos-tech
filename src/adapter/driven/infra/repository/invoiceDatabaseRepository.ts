import { v4 as uuidv4 } from "uuid";

import InvoiceRepository, {
  UpdateInvoiceInput,
  CreateInvoiceInput,
} from "~core/applications/repositories/invoiceRepository";
import { Invoice } from "~core/domain/invoice";

import InvoiceModel from "../models/invoiceModel";

class InvoiceDataBaseRepository implements InvoiceRepository {
  async updateInvoice({
    id,
    pagoEm,
    qrCode, }: UpdateInvoiceInput): Promise<Invoice> {
    try {
      return (await InvoiceModel.update(
        {
          pagoEm,
          qrCode,
        }, { where: { id: id } }).then(() =>
          InvoiceModel.findOne({
            where: { id: id },
          }))
      ) as Invoice;

    } catch (err: any) {
      console.error("Erro ao creater Invoice: ", err);
      throw new Error(err);
    }
  }

  async createInvoice({
    paymentMethodId,
    orderId,
    qrCode,
    statusDePagamento,
  }: CreateInvoiceInput): Promise<Invoice> {
    try {
      const invoice = await InvoiceModel.create({
        id: uuidv4(),
        orderId,
        qrCode,
        statusDePagamento,
        paymentMethodId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return invoice.dataValues as Invoice;
    } catch (err: any) {
      console.error("Erro ao creater Invoice: ", err);
      throw new Error(err);
    }
  }
}

export default InvoiceDataBaseRepository;
