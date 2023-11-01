import Usuario from 'core/domain/users';
import { DataTypes, Model, Sequelize } from 'sequelize';

import OrderModel from './orderModel';

class UsuarioModel extends Model<Usuario> implements Usuario {
    public id!: string;
    public cpf?: string | null;
    public nome?: string | null;
    public email?: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static initialize(sequelize: Sequelize): void {
        UsuarioModel.init({
            
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            cpf: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            }
        }, {
            paranoid: true,
            sequelize,
            tableName: 'Users',
            timestamps: true,
            underscored: true,
        });
    }

    static associate(): void {
        this.hasMany(OrderModel, {
            foreignKey: "client_id",
            sourceKey: "id",
            as: "order",
          });
    }

}

export default UsuarioModel;