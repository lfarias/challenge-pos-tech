import Usuario from "core/domain/users";

import CPF from "~core/domain/valueObjects/cpf";
import Email from "~core/domain/valueObjects/email";

import userRepository from "../repositories/userRepository";

export default class UsuarioService {
    constructor(private readonly userRepository: userRepository) { }

    async createUsuario(user: Usuario) {
        if (!user.cpf && !user.email) {
            if (!user.nome) {
                user.nome = 'Anonimo'
            }
        } else {
            if (user.cpf) {
                const cpfValidado = new CPF(user.cpf);
                user.cpf = cpfValidado.returnValor();
            }

            if (user.email) {
                const emailValidado = new Email(user.email);
                user.email = emailValidado.returnValor();
            }

            const userExistente = await this.userRepository.filtraUsuario(user.cpf ?? null, user.email ?? null);

            if (userExistente) {
                throw new Error("user_duplicado");
            }
        }

        return this.userRepository.createUsuario(user);
    }

    async listUsers(): Promise<Usuario[]> {
        const users = this.userRepository.listUsers();
        return users;
    }

    async returnUsuario(cpf: string): Promise<Usuario | null> {
        const cpfValidado = new CPF(cpf);
        return this.userRepository.returnUsuario(cpfValidado.returnValor());
    }

}