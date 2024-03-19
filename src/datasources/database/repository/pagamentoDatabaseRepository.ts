import { PagamentoDTO } from "~domain/entities/types/PagamentoType";
import PagamentoRepository from "~domain/repositories/pagamentoRepository";

import PagamentoModel from "../models/pagamentoModel";

export default class PagamentoDatabaseRepository implements PagamentoRepository {
  async criaPagamento(pagamento: PagamentoDTO): Promise<PagamentoDTO> {
<<<<<<< HEAD
    return (await PagamentoModel.create(pagamento)) as PagamentoDTO;
  }
}
=======
    try {
      return (await PagamentoModel.create(pagamento)) as PagamentoDTO;
    } catch (err: any) {
      console.log("PRINT PAGAMENTO", pagamento);
      console.error("Erro ao criar pagamento ", err);
      throw new Error(err);
    }
  }
}
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
