import { StatusDePagamento } from "~domain/entities/fatura";
<<<<<<< HEAD
import { AdicionaItemInput, RealizaPedidoInput, RemoveItemInput } from "~domain/entities/types/pedidoService.type";
=======
import { RealizaPedidoInput } from "~domain/entities/types/pedidoService.type";
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
import { PedidoDTO, PedidoInput } from "~domain/entities/types/pedidoType";
import CheckoutRepository from "~domain/repositories/checkoutRepository";
import FaturaRepository from "~domain/repositories/faturaRepository";
import PedidoRepository, {
<<<<<<< HEAD
  queryStatusPagamentoInput,
=======
  AdicionaItemInput,
  RemoveItemInput,
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
} from "~domain/repositories/pedidoRepository";
import ProdutoRepository from "~domain/repositories/produtoRepository";
import PedidoUseCase from "~domain/useCases/pedidoUseCase";

export class PedidoController {
  static async iniciaPedido(
    pedidoRepository: PedidoRepository,
<<<<<<< HEAD
    clienteId: string
  ): Promise<PedidoDTO | null> {
    const pedidoInput: PedidoInput = {
      clienteId,
      faturaId: null,
      status: "Rascunho",
      valor: 0,
      retiradoEm: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }

    const pedidoCriada = await PedidoUseCase.iniciaPedido(
      pedidoRepository,
      pedidoInput
=======
    pedido: PedidoInput
  ): Promise<PedidoDTO | null> {
    const pedidoCriada = await PedidoUseCase.iniciaPedido(
      pedidoRepository,
      pedido
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    );
    return pedidoCriada;
  }

  static async realizaPedido(
    checkoutRepository: CheckoutRepository,
    faturaRepository: FaturaRepository,
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    realizaPedidoInput: RealizaPedidoInput
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.realizaPedido(
      checkoutRepository,
      faturaRepository,
      pedidoRepository,
      produtoRepository,
      realizaPedidoInput
    );
  }

  static async iniciaPreparo(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    id: string
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.iniciaPreparo(
      pedidoRepository,
      produtoRepository,
      id
    );
  }

  static async finalizaPreparo(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    id: string
  ): Promise<PedidoDTO> {
    return await PedidoUseCase.finalizaPreparo(
      pedidoRepository,
      produtoRepository,
      id
    );
  }

  static async adicionaItem(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    adicionaItemInput: AdicionaItemInput
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.adicionaItem(
      pedidoRepository,
      produtoRepository,
      adicionaItemInput
    );
  }

  static async removeItem(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    removeItemInput: RemoveItemInput
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.removeItem(
      pedidoRepository,
      produtoRepository,
      removeItemInput
    );
  }

  static async entregaPedido(
    pedidoRepository: PedidoRepository,
    produtoRepository: ProdutoRepository,
    id: string
  ): Promise<PedidoDTO | null> {
    return await PedidoUseCase.entregaPedido(
      pedidoRepository,
      produtoRepository,
      id
    );
  }

  static async listaPedidos(
    pedidoRepository: PedidoRepository,
    status: Array<string>,
    clienteId: string
  ): Promise<PedidoDTO[] | null> {
    return await PedidoUseCase.listaPedidos(
      pedidoRepository,
      status,
      clienteId
    );
  }

  static async statusDePagamento(
    pedidoRepository: PedidoRepository,
    faturaRepository: FaturaRepository,
<<<<<<< HEAD
    queryStatusPagamento: queryStatusPagamentoInput
=======
    pedidoId: string
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  ): Promise<StatusDePagamento | null | undefined> {
    return await PedidoUseCase.statusDePagamento(
      pedidoRepository,
      faturaRepository,
<<<<<<< HEAD
      queryStatusPagamento
=======
      pedidoId
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    );
  }
}
