import userRepository from "core/applications/repositories/userRepository";
import Usuario from "core/domain/users";
import { Op } from "sequelize";

import UsuarioModel from "../models/userModel";

class UsuarioDataBaseRepository implements userRepository {
    async createUsuario(user: Usuario): Promise<Usuario> {
        try {
            return await UsuarioModel.create(user);
        } catch (err: any) {
            console.error('Erro ao creater Category: ', err);
            throw new Error(err);
        }
    }

    async filtraUsuario(cpf: string | null, email: string | null): Promise<Usuario | null> {
        try {
            const filtro = [];
            if (cpf) {
                filtro.push([{ cpf }])
            }
            if (email) {
                filtro.push([{ email }])
            }


            return await UsuarioModel.findOne({
                where: {
                    [Op.or]: filtro
                }
            });
        } catch (err: any) {
            console.error('Erro ao filtrar user: ', err);
            throw new Error(err);
        }
    }

    async listUsers(): Promise<Usuario[]> {
        try {
            return await UsuarioModel.findAll();
        } catch (err: any) {
            console.error('Erro ao listr Category: ', err);
            throw new Error(err);
        }
    }

    async returnUsuario(cpf: string): Promise<Usuario | null> {
        try {
            return await UsuarioModel.findOne({ where: { cpf: cpf } });
        } catch (err: any) {
            console.error('Erro ao returnr Category: ', err);
            throw new Error(err);
        }

    }
}
export default UsuarioDataBaseRepository;