export interface PagamentoDTO {
  id: string;
  isPago: boolean;
  valorPagamento: number;
  tipoDePagamento: string;
<<<<<<< HEAD
  pagamentoId: string;
=======
  faturaId: string;
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}

export interface PagamentoInput {
  id: string;
  isPago: boolean;
  valorPagamento: number;
  tipoDePagamento: string;
<<<<<<< HEAD
  pagamentoId: string;
=======
  faturaId: string;
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}
