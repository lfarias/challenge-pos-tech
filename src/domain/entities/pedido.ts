// import { ItensDoPedido } from "./itemPedido";
<<<<<<< HEAD
import throwError from "handlerError/handlerError";
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
import { v4 as uuidv4 } from "uuid";

import { PedidoInput, StatusDoPedido, statusDoPedido } from "./types/pedidoType";
import { StatusDePagamento, statusDePagamento } from "./fatura";
import ItemPedido from "./itemPedido";

export default class Pedido {
  public id: string;
  public clienteId: string;
  public faturaId: string | null;
  public status: StatusDoPedido;
  public valor: number;
  public itens: ItemPedido[];
  public retiradoEm: Date | null;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;

  constructor(pedidoInput: PedidoInput, itens: ItemPedido[] | null = []) {
    this.id = pedidoInput.id ?? uuidv4();
    this.clienteId = pedidoInput.clienteId;
    this.faturaId = pedidoInput.faturaId ?? null;
    this.status = pedidoInput.status ?? this.criaRascunho();
<<<<<<< HEAD
    this.itens = itens ?? [];
=======
    this.itens =  itens ?? [];
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    this.retiradoEm = pedidoInput.retiradoEm ?? null;
    this.createdAt = pedidoInput.createdAt ?? new Date();
    this.deletedAt = pedidoInput.deletedAt ?? null;
    this.updatedAt = pedidoInput.updatedAt ?? null;


    this.valor = pedidoInput.valor ?? 0;
    this.calculaTotal();
  }

  criaRascunho() {
    this.status = statusDoPedido.RASCUNHO;
  }

  entregaRascunho() {
    if (this.status !== statusDoPedido.RASCUNHO) {
<<<<<<< HEAD
      throwError("BAD_REQUEST", `Não é possível alterar o status para ${statusDoPedido.RASCUNHO}. Status atual do pedido é ${this.status}`);
=======
      throw new Error(
        `Não é possível alterar o status para ${statusDoPedido.RASCUNHO}. Status atual do pedido é ${this.status}`
      );
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }

    this.validaValor();
    this.status = statusDoPedido.AGUARDANDO_PAGAMENTO;
  }

  // aguardaPagamento() {
  //   if (this.status !== statusDoPedido.AGUARDANDO_PAGAMENTO) {
<<<<<<< HEAD
  //     throwError("BAD_REQUEST", `Não é possível alterar o status para ${statusDoPedido.AGUARDANDO_PAGAMENTO}. Status atual do pedido é ${this.status}`);
=======
  //     throw new Error(
  //       `Não é possível alterar o status para ${statusDoPedido.AGUARDANDO_PAGAMENTO}. Status atual do pedido é ${this.status}`
  //     );
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  //   }
  //   this.status = statusDoPedido.AGUARDANDO_PREPARO;
  // }

  atualizaPagamento(statusPagamento: StatusDePagamento) {

    if (statusPagamento !== statusDePagamento.AGUARDANDO_PAGAMENTO) {
      this.status = statusPagamento === statusDePagamento.PAGAMENTO_APROVADO
        ? statusDoPedido.AGUARDANDO_PREPARO
        : statusDoPedido.FALHA;
    }

<<<<<<< HEAD

=======
    
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }

  emPreparo() {
    if (this.status !== statusDoPedido.AGUARDANDO_PREPARO) {
<<<<<<< HEAD
      throwError("BAD_REQUEST", `Não é possível alterar o status para ${statusDoPedido.AGUARDANDO_PREPARO}. Status atual do pedido é ${this.status}`);
=======
      throw new Error(
        `Não é possível alterar o status para ${statusDoPedido.AGUARDANDO_PREPARO}. Status atual do pedido é ${this.status}`
      );
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }
    this.status = statusDoPedido.EM_PREPARO;
  }

  pronto() {
    if (this.status !== statusDoPedido.EM_PREPARO) {
<<<<<<< HEAD
      throwError("BAD_REQUEST", `Não é possível alterar o status para ${statusDoPedido.EM_PREPARO}. Status atual do pedido é ${this.status}`);
=======
      throw new Error(
        `Não é possível alterar o status para ${statusDoPedido.EM_PREPARO}. Status atual do pedido é ${this.status}`
      );
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }
    this.status = statusDoPedido.PRONTO;
  }

  entregue() {
    if (this.status !== statusDoPedido.PRONTO) {
<<<<<<< HEAD
      throwError("BAD_REQUEST", `Não é possível alterar o status para ${statusDoPedido.PRONTO}. Status atual do pedido é ${this.status}`);
=======
      throw new Error(
        `Não é possível alterar o status para ${statusDoPedido.PRONTO}. Status atual do pedido é ${this.status}`
      );
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }
    this.retiradoEm = new Date();
    this.status = statusDoPedido.ENTREGUE;
  }

  registrarFatura(faturaId: string) {
    this.faturaId = faturaId;
  }

  validaValor() {
    if (this.valor <= 0) {
<<<<<<< HEAD
      throwError("BAD_REQUEST", `Não é possível realizar um pedido sem nenhum valor`);
=======
      throw new Error(
        `Não é possível realizar um pedido sem nenhum valor`
      );
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }
  }

  adicionarItem(item: ItemPedido) {
<<<<<<< HEAD
    console.log(this.status)
    if (this.status !== statusDoPedido.RASCUNHO) {
      throwError("BAD_REQUEST", `Não é possível adicionar itens a um pedido que não está em rascunho`);
=======
    if (this.status !== statusDoPedido.RASCUNHO) {
      throw new Error(
        `Não é possível adicionar itens a um pedido que não está em rascunho`
      );
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }

    this.itens.push(item);
    this.calculaTotal();
  }

  removeItem(itemId: string) {
    if (this.status !== statusDoPedido.RASCUNHO) {
<<<<<<< HEAD
      throwError("BAD_REQUEST", `Não é possível remover itens a um pedido que não está em rascunho`);
=======
      throw new Error(
        `Não é possível remover itens a um pedido que não está em rascunho`
      );
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }

    this.itens = this.itens?.filter(item => item.id !== itemId);
    this.calculaTotal();
  }
<<<<<<< HEAD

=======
  
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  calculaTotal() {
    this.valor = this.itens?.reduce((total: number, item: ItemPedido,) => total + item.calculaTotal(), 0) ?? 0;
  }
}
