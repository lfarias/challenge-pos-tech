/* eslint-disable @typescript-eslint/no-non-null-assertion */
<<<<<<< HEAD
import throwError from "handlerError/handlerError";
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
import sequelize, { Op, WhereOptions } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { ItemDoPedidoDTO } from "~domain/entities/types/itensPedidoType";
<<<<<<< HEAD
import { AdicionaItemInput, RemoveItemInput } from "~domain/entities/types/pedidoService.type";
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
import {
  PedidoDTO,
  StatusDoPedido,
  statusDoPedido,
} from "~domain/entities/types/pedidoType";
<<<<<<< HEAD
import PedidoRepository from "~domain/repositories/pedidoRepository";
=======
import PedidoRepository, {
  AdicionaItemInput,
  RemoveItemInput,
} from "~domain/repositories/pedidoRepository";
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778

import FaturaModel from "../models/faturaModel";
import ItemDoPedidoModel from "../models/itemPedidoModel";
import PedidoModel from "../models/pedidoModel";

class PedidoDataBaseRepository implements PedidoRepository {
  async retornaItensPedido(
    pedidoId: string
  ): Promise<ItemDoPedidoDTO[] | null> {
<<<<<<< HEAD
    return await ItemDoPedidoModel.findAll({
      where: { pedidoId },
    });

  }
  async criaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
    return (await PedidoModel.create(pedido)) as PedidoDTO;

=======
    try {
      return await ItemDoPedidoModel.findAll({
        where: { pedidoId },
      });
    } catch (err: any) {
      console.error("Erro ao criar Pedido: ", err);
      throw new Error(err);
    }
  }
  async criaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
    try {
      return (await PedidoModel.create(pedido)) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao criar Pedido: ", err);
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }

  async atualizaStatusDoPedido(
    id: string,
    statusDoPedido: StatusDoPedido
  ): Promise<PedidoDTO> {
<<<<<<< HEAD
    const pedido = await PedidoModel.findByPk(id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    pedido!.status = statusDoPedido;
    await pedido?.save();
    return pedido as PedidoDTO;

  }

  async atualizaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
    // TODO - refatorar

    const pedidoAtual = await PedidoModel.findByPk(pedido.id, {
      include: ["itens"],
    });

    if (pedido.faturaId) {
      pedidoAtual!.faturaId = pedido.faturaId;
    }

    const idsPostsExistentes = pedidoAtual?.itens?.map(
      (item) => item.id
    ) as [];

    if (idsPostsExistentes) {
      const idsPostsParaRemover = idsPostsExistentes?.filter(
        (id) => !pedido?.itens?.some((item) => item.id === id)
      );
      await ItemDoPedidoModel.destroy({ where: { id: idsPostsParaRemover } });
    }

    if (pedido.itens) {
      await ItemDoPedidoModel.bulkCreate(pedido.itens, {
        updateOnDuplicate: ["id"],
      });
    }

    if (pedidoAtual) {
      Object.assign(pedidoAtual, pedido);
      await pedidoAtual.save();
    }

    return pedido;

  }

  async retornaPedido(id: string, clienteId: string | null = null): Promise<PedidoDTO | null> {
    return (await PedidoModel.findOne({
      include: [
        {
          model: ItemDoPedidoModel,
          as: "itens",
        },
        {
          model: FaturaModel,
          as: "fatura",
        },
      ],
      where: clienteId ? { id, clienteId } : { id },
    })) as PedidoDTO;
  }

  async retornaProximoPedidoFila(): Promise<PedidoDTO | null> {
    return (await PedidoModel.findOne({
      where: { status: statusDoPedido.AGUARDANDO_PREPARO },
      order: [["updatedAt", "ASC"]],
    })) as PedidoDTO;
=======
    try {
      const pedido = await PedidoModel.findByPk(id);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pedido!.status = statusDoPedido;
      await pedido?.save();
      return pedido as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao atualizar status do pedido: ", err);
      throw new Error(err);
    }
  }

  async atualizaPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
    try {
      // TODO - refatorar

      const pedidoAtual = await PedidoModel.findByPk(pedido.id, {
        include: ["itens"],
      });

      if (pedido.faturaId) {
        pedidoAtual!.faturaId = pedido.faturaId;
      }

      const idsPostsExistentes = pedidoAtual?.itens?.map(
        (item) => item.id
      ) as [];

      if (idsPostsExistentes) {
        const idsPostsParaRemover = idsPostsExistentes?.filter(
          (id) => !pedido?.itens?.some((item) => item.id === id)
        );
        await ItemDoPedidoModel.destroy({ where: { id: idsPostsParaRemover } });
      }

      if (pedido.itens) {
        await ItemDoPedidoModel.bulkCreate(pedido.itens, {
          updateOnDuplicate: ["id"],
        });
      }

      if (pedidoAtual) {
        Object.assign(pedidoAtual, pedido);
        await pedidoAtual.save();
      }

      return pedido;
    } catch (err: any) {
      console.error("Erro ao atualizar Pedido: ", err);
      throw new Error(err);
    }
  }

  async retornaPedido(id: string): Promise<PedidoDTO | null> {
    try {
      return (await PedidoModel.findOne({
        include: [
          {
            model: ItemDoPedidoModel,
            as: "itens",
          },
          {
            model: FaturaModel,
            as: "fatura",
          },
        ],
        where: { id },
      })) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao retornar pedido: ", err);
      throw new Error(err);
    }
  }

  async retornaProximoPedidoFila(): Promise<PedidoDTO | null> {
    try {
      return (await PedidoModel.findOne({
        where: { status: statusDoPedido.AGUARDANDO_PREPARO },
        order: [["updatedAt", "ASC"]],
      })) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao retornar proximo pedido da fila: ", err);
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }

  async adicionaItem(
    adicionaItem: AdicionaItemInput
  ): Promise<PedidoDTO | null> {
<<<<<<< HEAD
    await ItemDoPedidoModel.create({
      ...adicionaItem,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const pedido = await PedidoModel.findOne({
      where: { id: adicionaItem.pedidoId },
    });

    if (!pedido) throwError("NOT_FOUND", "Pedido não encontrado");

    const valor = pedido.valor + adicionaItem.valorTotal;

    return (await PedidoModel.update(
      { valor },
      { where: { id: adicionaItem.pedidoId } }
    ).then(() =>
      PedidoModel.findOne({
        where: { id: adicionaItem.pedidoId },
        include: "itens",
      })
    )) as PedidoDTO;
=======
    try {
      await ItemDoPedidoModel.create({
        ...adicionaItem,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const pedido = await PedidoModel.findOne({
        where: { id: adicionaItem.pedidoId },
      });

      if (!pedido) throw new Error("Pedido não encontrado");

      const valor = pedido.valor + adicionaItem.valorTotal;

      return (await PedidoModel.update(
        { valor },
        { where: { id: adicionaItem.pedidoId } }
      ).then(() =>
        PedidoModel.findOne({
          where: { id: adicionaItem.pedidoId },
          include: "itens",
        })
      )) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao adicionar item: ", err);
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }

  async removeItem(
    removeItemInput: RemoveItemInput
  ): Promise<PedidoDTO | null> {
<<<<<<< HEAD
    await ItemDoPedidoModel.destroy({
      where: { id: removeItemInput.itemId },
    });

    return (await PedidoModel.update(
      // { valor: removeItemInput.valorPedido }, // todo
      { valor: 0 }, // todo
      { where: { id: removeItemInput.pedidoId } }
    ).then(() =>
      PedidoModel.findOne({
        where: { id: removeItemInput.pedidoId },
        include: ["itens"],
      })
    )) as PedidoDTO;
  }

  async retornaItem(id: string): Promise<ItemDoPedidoDTO | null> {
    return (await ItemDoPedidoModel.findOne({
      where: { id },
    })) as ItemDoPedidoDTO;
=======
    try {
      await ItemDoPedidoModel.destroy({
        where: { id: removeItemInput.itemId },
      });

      return (await PedidoModel.update(
        // { valor: removeItemInput.valorPedido }, // todo
        { valor: 0 }, // todo
        { where: { id: removeItemInput.pedidoId } }
      ).then(() =>
        PedidoModel.findOne({
          where: { id: removeItemInput.pedidoId },
          include: ["itens"],
        })
      )) as PedidoDTO;
    } catch (err: any) {
      console.error("Erro ao remover item: ", err);
      throw new Error(err);
    }
  }

  async retornaItem(id: string): Promise<ItemDoPedidoDTO | null> {
    try {
      return (await ItemDoPedidoModel.findOne({
        where: { id },
      })) as ItemDoPedidoDTO;
    } catch (err: any) {
      console.error("Erro ao retornar item: ", err);
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }

  async listaPedidos(
    status?: Array<string>,
    clienteId?: string
  ): Promise<Array<PedidoDTO> | null> {
<<<<<<< HEAD
    let where: WhereOptions<PedidoDTO> = {
      deletedAt: null,
      status: {
        [Op.or]: [
          statusDoPedido.PRONTO,
          statusDoPedido.EM_PREPARO,
          statusDoPedido.AGUARDANDO_PREPARO,
        ],
      },
    };

    if (status && status.length > 0) {
      where = { ...where, status };
    }

    if (clienteId && clienteId.length > 0) {
      where = { ...where, clienteId };
    }

    return (await PedidoModel.findAll({
      where,
      order: [
        sequelize.fn(
          "field",
          sequelize.col("status"),
          statusDoPedido.PRONTO,
          statusDoPedido.EM_PREPARO,
          statusDoPedido.AGUARDANDO_PREPARO
        ),
        ["createdAt", "ASC"],
      ],
      include: ["itens", "fatura"],
    })) as PedidoDTO[];
=======
    try {
      let where: WhereOptions<PedidoDTO> = {
        deletedAt: null,
        status: {
          [Op.or]: [
            statusDoPedido.PRONTO,
            statusDoPedido.EM_PREPARO,
            statusDoPedido.AGUARDANDO_PREPARO,
          ],
        },
      };

      if (status && status.length > 0) {
        where = { ...where, status };
      }

      if (clienteId && clienteId.length > 0) {
        where = { ...where, clienteId };
      }

      return (await PedidoModel.findAll({
        where,
        order: [
          sequelize.fn(
            "field",
            sequelize.col("status"),
            statusDoPedido.PRONTO,
            statusDoPedido.EM_PREPARO,
            statusDoPedido.AGUARDANDO_PREPARO
          ),
          ["createdAt", "ASC"],
        ],
        include: ["itens", "fatura"],
      })) as PedidoDTO[];
    } catch (err: any) {
      console.error("Erro ao listar pedidos: ", err);
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }
}

export default PedidoDataBaseRepository;
