<<<<<<< HEAD
import throwError from "handlerError/handlerError";

=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
export default class Email {
  private readonly valor: string;

  constructor(valor: string) {
    if (!this.validacao(valor)) {
<<<<<<< HEAD
      throwError("BAD_REQUEST", 'Endereço de e-mail inválido');
=======
      throw new Error('Endereço de e-mail inválido');
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }

    this.valor = valor;
  }

  retornaValor(): string {
    return this.valor;
  }

  private validacao(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}