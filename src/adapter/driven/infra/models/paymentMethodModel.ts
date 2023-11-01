import { DataTypes, Model, Sequelize } from "sequelize";

import { PaymentMethod } from "~core/domain/paymentMethod";

class PaymentMethodModel
  extends Model<PaymentMethod>
  implements PaymentMethod
{
  public id!: string;
  public nome!: string;
  public ativo!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    PaymentMethodModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ativo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
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
        tableName: "PaymentMethods",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    // Sem associação
  }
}

export default PaymentMethodModel;
