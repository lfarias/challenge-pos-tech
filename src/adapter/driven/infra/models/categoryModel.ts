import { DataTypes, Model, Sequelize } from "sequelize";

import Category from "~core/domain/category";

import ProductModel from "./productModel";

class CategoryModel extends Model<Category> implements Category {
  public id!: string;
  public nome!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    CategoryModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        nome: {
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
        tableName: "Categorys",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasMany(ProductModel, {
      as: "categorys",
      foreignKey: "categoryId",
    });
  }
}

export default CategoryModel;
