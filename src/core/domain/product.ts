export interface ImagemProduct {
  id?: string;
  url: string;
  productId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface Product {
  id?: string;
  nome: string;
  categoryId?: string;
  preco: number;
  descricao: string;
  imagens?: ImagemProduct[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
