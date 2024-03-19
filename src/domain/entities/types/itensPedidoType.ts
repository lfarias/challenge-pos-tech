
export interface ItemDoPedidoInput {
  id?: string;
<<<<<<< HEAD
  clienteId?: string | null;
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  valorUnitario?: number;
  observacao?: string | null;
  createdAt?: Date;
  deletedAt?: Date | null;
  updatedAt?: Date | null;
}

export type ItensDoPedido = Array<ItemDoPedidoInput>;

export interface ItemDoPedidoDTO {
  id: string;
  produtoId: string;
  pedidoId: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
} 