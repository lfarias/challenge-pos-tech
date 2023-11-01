import { DataTypes, Model, Sequelize } from "sequelize";

import { ItemOrder } from "~core/domain/itemOrder";
import { Product } from "~core/domain/product";

import OrderModel from "./orderModel";
import ProductModel from "./productModel";

class ItemOrderModel extends Model<ItemOrder> implements ItemOrder {
  public id!: string;
  public productId!: string;
  public product?: Product;
  public orderId!: string;
  public quantidade!: number;
  public valorUnitario!: number;
  public valorTotal!: number;
  public observacao!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    ItemOrderModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        quantidade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        valorUnitario: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorTotal: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        observacao: {
          type: DataTypes.STRING,
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
        tableName: "ItensOrder",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(OrderModel, {
      as: "order",
    });

    this.belongsTo(ProductModel, {
      as: "product",
    });
  }
}

export default ItemOrderModel;
