import { MetodoPagamentoDTO } from "~domain/entities/types/metodoPagamentoType";
import MetodoPagamentoRepository from "~domain/repositories/metodoPagamentoRepository";

import MetodoDePagamentoModel from "../models/metodoDePagamentoModel";

export default class MetodoPagamentoDatabaseRepository implements MetodoPagamentoRepository {
    listaPagamentos(): Promise<MetodoPagamentoDTO[]> {
<<<<<<< HEAD
        return MetodoDePagamentoModel.findAll({ where: { ativo: 1 } });
    }
=======
        try {
            return MetodoDePagamentoModel.findAll({ where: { ativo: 1 } });
        } catch (err: any) {
            console.error("Erro ao retornar lista de pagamento: ", err);
            throw new Error(err);
        }

    }

>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
}