import { DataTypes, Model, Sequelize } from "sequelize";

import { Invoice } from "~core/domain/invoice";
import { ItensOrder } from "~core/domain/itemOrder";
import { Order, StatusOrder, statusOrder } from "~core/domain/order";

import InvoiceModel from "./invoiceModel";
import ItemOrderModel from "./itemOrderModel";
import UsuarioModel from "./userModel";

class OrderModel extends Model<Order> implements Order {
  public id!: string;
  public clientId!: string | null;
  public client?: any;
  public invoiceId?: string;
  public invoice?: Invoice;
  public status!: StatusOrder;
  public valor!: number;
  public itens?: ItensOrder;
  public retiradoEm!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    OrderModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        clientId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        invoiceId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM,
          allowNull: false,
          defaultValue: statusOrder.RASCUNHO,
          values: [
            statusOrder.RASCUNHO,
            statusOrder.AGUARDANDO_PAGAMENTO,
            statusOrder.AGUARDANDO_PREPARO,
            statusOrder.EM_PREPARO,
            statusOrder.PRONTO,
            statusOrder.ENTREGUE,
            statusOrder.FALHA
          ],
        },
        valor: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        retiradoEm: {
          type: DataTypes.DATE,
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
        tableName: "Orders",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(InvoiceModel, {
      as: "invoice",
    });

    this.hasMany(ItemOrderModel, {
      foreignKey: "orderId",
      sourceKey: "id",
      as: "itens",
    });

    this.belongsTo(UsuarioModel, {
      as: "client",
    });
  }
}

export default OrderModel;
