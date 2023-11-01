import { DataTypes, Model, Sequelize } from "sequelize";

import { Product } from "~core/domain/product";

import CategoryModel from "./categoryModel";
import ImagensProductModel from "./productImagensModel";

class ProductModel extends Model<Product> implements Product {
  public id!: string;
  public nome!: string;
  public categoryId!: string;
  public preco!: number;
  public descricao!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    ProductModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          onDelete: "CASCADE",
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Categorys",
            key: "id",
          },
        },
        preco: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.STRING,
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
        tableName: "Products",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasMany(ImagensProductModel, {
      as: "imagens",
      foreignKey: "productId",
      onDelete: "cascade",
      hooks: true,
    });
    this.belongsTo(CategoryModel, {
      as: "category",
      hooks: true,
    });
  }
}

export default ProductModel;
