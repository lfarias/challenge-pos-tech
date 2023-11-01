import { statusDePagamento } from "~core/domain/invoice";
import { Order, statusOrder } from "~core/domain/order";

import CheckoutRepository from "../repositories/checkoutRepository";
import OrderRepository from "../repositories/orderRepository";
import ProductRepository from "../repositories/productRepository";

import {
  AdicionaItemInput,
  IniciaOrderInput,
  RealizaOrderInput,
  RemoveItemInput,
} from "./orderService.type";

export default class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly checkoutRepository: CheckoutRepository,
  ) { }

  async iniciaOrder({ clientId = null }: IniciaOrderInput): Promise<Order> {
    return this.orderRepository.createOrder({
      clientId,
      valor: 0,
      status: statusOrder.RASCUNHO,
    });
  }

  async realizaOrder({
    orderId,
    paymentMethodId,
  }: RealizaOrderInput): Promise<Order> {
    const order = await this.orderRepository.returnOrder(orderId);

    if (order?.status !== statusOrder.RASCUNHO) {
      throw new Error(
        `Não é possível accomplish um order que não está em rascunho. Status atual do order é ${order?.status}`
      );
    }
    if (order.valor <= 0) {
      throw new Error(
        `Não é possível accomplish um order sem nenhum valor`
      );
    }

    const invoice = await this.checkoutRepository.geraPagamento({ paymentMethodId, order });

    return this.orderRepository.updateOrder({
      id: orderId,
      status: invoice.statusDePagamento === statusDePagamento.PAGAMENTO_APROVADO
        ? statusOrder.AGUARDANDO_PREPARO
        : statusOrder.FALHA,
      invoiceId: invoice.id,
    });
  }

  async iniciaPreparo(orderId?: string): Promise<Order | null> {
    const order = orderId
      ? await this.orderRepository.returnOrder(orderId)
      : await this.orderRepository.returnProximoOrderFila();

    if (order && order?.status !== statusOrder.AGUARDANDO_PREPARO) {
      throw new Error(
        `Não é possível start preparo de um order que não está aguardando preparo. Status atual do order é ${order?.status}`
      );
    }

    if (order) {
      return this.orderRepository.updateOrder({
        id: order.id,
        status: statusOrder.EM_PREPARO,
      });
    }

    return null;
  }

  async finalizaPreparo(orderId: string): Promise<Order> {
    const order = await this.orderRepository.returnOrder(orderId);

    if (order?.status !== statusOrder.EM_PREPARO) {
      throw new Error(
        `Não é possível finish preparo de um order que não está em prepar. Status atual do order é ${order?.status}`
      );
    }

    return this.orderRepository.updateOrder({
      id: orderId,
      status: statusOrder.PRONTO,
    });
  }

  async entregaOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.returnOrder(orderId);

    if (order?.status !== statusOrder.PRONTO) {
      throw new Error(
        `Não é possível delivery um order que não está pronto. Status atual do order é ${order?.status}`
      );
    }

    return this.orderRepository.updateOrder({
      id: orderId,
      status: statusOrder.ENTREGUE,
      retiradoEm: new Date(),
    });
  }

  async adicionaItem(
    adicionaItemInput: AdicionaItemInput
  ): Promise<Order | null> {
    const order = await this.orderRepository.returnOrder(
      adicionaItemInput.orderId
    );

    if (order?.status !== statusOrder.RASCUNHO) {
      throw new Error(
        `Não é possível adicionar itens a um order que não está em rascunho`
      );
    }

    const product = await this.productRepository.returnProduct(
      adicionaItemInput.productId
    );

    const valorUnitario = product?.preco || 0;
    const valorTotal = valorUnitario * adicionaItemInput.quantidade;

    return this.orderRepository.adicionaItem({
      ...adicionaItemInput,
      valorTotal,
      valorUnitario,
    });
  }

  async removeItem(removeItemInput: RemoveItemInput): Promise<Order | null> {
    const order = await this.orderRepository.returnOrder(
      removeItemInput.orderId
    );

    if (order?.status !== statusOrder.RASCUNHO) {
      throw new Error(
        `Não é possível adicionar itens a um order que não está em rascunho`
      );
    }

    const itemOrder = await this.orderRepository.returnItem(
      removeItemInput.itemId
    );

    const valorOrder = order?.valor ?? 0;
    const valorParaReduzir = itemOrder?.valorTotal ?? 0;

    const novoValorOrder = valorOrder - valorParaReduzir;

    return this.orderRepository.removeItem({
      ...removeItemInput,
      valorOrder: novoValorOrder,
    });
  }

  async listOrders(status?: Array<string>, clientId?: string): Promise<Array<Order> | null> {
    return this.orderRepository.listOrders(status, clientId);
  }
}
