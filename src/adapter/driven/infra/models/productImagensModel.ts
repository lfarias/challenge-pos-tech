import { DataTypes, Model, Sequelize } from "sequelize";

import { ImagemProduct } from "~core/domain/product";

import ProductModel from "./productModel";

class ImagensProductModel
  extends Model<ImagemProduct>
  implements ImagemProduct
{
  public id!: string;
  public url!: string;
  public productId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    ImagensProductModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
          onDelete: "CASCADE",
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
        tableName: "ImagensProduct",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(ProductModel, {
      foreignKey: "productId",
      targetKey: "id",
    });
  }
}

export default ImagensProductModel;
