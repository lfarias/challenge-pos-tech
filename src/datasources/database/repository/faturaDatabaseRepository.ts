import { v4 as uuidv4 } from "uuid";

import { Fatura, StatusDePagamento } from "~domain/entities/fatura";
import FaturaRepository, {
  AtualizaFaturaInput,
  CriaFaturaInput,
} from "~domain/repositories/faturaRepository";

import FaturaModel from "../models/faturaModel";

class FaturaDataBaseRepository implements FaturaRepository {
  async atualizaFatura({
    id,
    pagoEm,
    qrCode,
  }: AtualizaFaturaInput): Promise<Fatura> {
<<<<<<< HEAD
=======
    try {
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
      return (await FaturaModel.update(
        {
          pagoEm,
          qrCode,
        },
        { where: { id: id } }
      ).then(() =>
        FaturaModel.findOne({
          where: { id: id },
        })
      )) as Fatura;
<<<<<<< HEAD
=======
    } catch (err: any) {
      console.error("Erro ao criar Fatura: ", err);
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }

  async criaFatura({
    metodoDePagamentoId,
    pedidoId,
    qrCode,
    statusDePagamento,
  }: CriaFaturaInput): Promise<Fatura> {
<<<<<<< HEAD
=======
    try {
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
      const fatura = await FaturaModel.create({
        id: uuidv4(),
        pedidoId,
        qrCode,
        statusDePagamento,
        metodoDePagamentoId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return fatura.dataValues as Fatura;
<<<<<<< HEAD

  }

  async retornaFatura(faturaId: string): Promise<Fatura | null> {
=======
    } catch (err: any) {
      console.error("Erro ao criar Fatura: ", err);
      throw new Error(err);
    }
  }

  async retornaFatura(faturaId: string): Promise<Fatura | null> {
    try {
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
      return await FaturaModel.findOne({
        where: {
          id: faturaId,
        },
      });
<<<<<<< HEAD
  }

  async pegaFatura(id: string): Promise<Fatura> {
      const fatura = await FaturaModel.findByPk(id);
      return fatura as Fatura;
=======
    } catch (err: any) {
      console.error("Erro ao retornar Fatura: ", err);
      throw new Error(err);
    }
  }

  async pegaFatura(id: string): Promise<Fatura> {
    try {
      const fatura = await FaturaModel.findByPk(id);
      return fatura as Fatura;
    } catch (err: any) {
      console.error("Erro ao recuperar Fatura: ", err);
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }

  async atualizaStatusPagamentoFatura(
    id: string,
    statusDePagamento: StatusDePagamento
  ): Promise<Fatura> {
    const fatura = await FaturaModel.findByPk(id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fatura!.statusDePagamento = statusDePagamento;
    await fatura?.save();
    return fatura as Fatura;
  }
}

export default FaturaDataBaseRepository;
