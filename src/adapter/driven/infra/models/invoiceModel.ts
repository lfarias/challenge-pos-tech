import { DataTypes, Model, Sequelize } from "sequelize";

import {
  Invoice,
  StatusDePagamento,
  statusDePagamento,
} from "~core/domain/invoice";
import { PaymentMethod } from "~core/domain/paymentMethod";
import { Order } from "~core/domain/order";

import PaymentMethodModel from "./paymentMethodModel";
import OrderModel from "./orderModel";

class InvoiceModel extends Model<Invoice> implements Invoice {
  public id!: string;
  public orderId!: string;
  public order?: Order;
  public paymentMethodId!: string;
  public paymentMethod?: PaymentMethod;
  public statusDePagamento!: StatusDePagamento;
  public pagoEm!: Date | null;
  public qrCode!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    InvoiceModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        paymentMethodId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        statusDePagamento: {
          type: DataTypes.ENUM,
          allowNull: true,
          values: [
            statusDePagamento.AGUARDANDO_PAGAMENTO,
            statusDePagamento.ERRO_AO_PROCESSAR_PAGAMENTO,
            statusDePagamento.PAGAMENTO_APROVADO,
            statusDePagamento.PAGAMENTO_NEGADO,
          ],
        },
        pagoEm: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        qrCode: {
          type: DataTypes.STRING(1000),
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        paranoid: true,
        sequelize,
        tableName: "Invoices",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(PaymentMethodModel, {
      as: "paymentMethod",
    });

    this.belongsTo(OrderModel, {
      as: "order",
    });
  }
}

export default InvoiceModel;
