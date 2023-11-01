import Usuario from 'core/domain/users';

export default interface userRepository {
    createUsuario(Usuario: Usuario): Promise<Usuario>;
    listUsers(): Promise<Usuario[]>;
    returnUsuario(cpf: string | null): Promise<Usuario | null>;
    filtraUsuario(cpf: string | null, email: string | null): Promise<Usuario | null>;
}
