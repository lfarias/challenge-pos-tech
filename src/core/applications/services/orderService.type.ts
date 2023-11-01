export type IniciaOrderInput = {
  clientId?: string | null;
};

export type RealizaOrderInput = {
  orderId: string;
  paymentMethodId: string;
};

export type AdicionaItemInput = {
  orderId: string;
  productId: string;
  quantidade: number;
  observacao?: string | null;
};

export type RemoveItemInput = {
  orderId: string;
  itemId: string;
};
