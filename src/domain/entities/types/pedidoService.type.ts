export type IniciaPedidoInput = {
  clienteId?: string | null;
};

export type RealizaPedidoInput = {
  pedidoId: string;
<<<<<<< HEAD
  clienteId: string;
  metodoDePagamentoId: string;
};

// export type AdicionaItemInput = {
//   pedidoId: string;
//   produtoId: string;
//   quantidade: number;
//   observacao?: string | null;
// };

=======
  metodoDePagamentoId: string;
};

>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
export type AdicionaItemInput = {
  pedidoId: string;
  produtoId: string;
  quantidade: number;
<<<<<<< HEAD
  valorUnitario: number;
  valorTotal: number;
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  observacao?: string | null;
};

export type RemoveItemInput = {
  pedidoId: string;
  itemId: string;
<<<<<<< HEAD
  clienteId: string;
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
};
