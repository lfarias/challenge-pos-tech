import { ImagemProduct, Product } from "~core/domain/product";

import ProductRepository from "../repositories/productRepository";

export default class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async adicionaImagens(imagens: ImagemProduct[]) {
    if (imagens.length > 0) {
      return this.productRepository.adicionaImagens(imagens);
    }
    return null;
  }

  async removeImagem(idProduct: string, idImagem: string): Promise<number> {
    return this.productRepository.removeImagem(idProduct, idImagem);
  }

  async createProduct(product: Product): Promise<Product> {
    if (product?.preco <= 0) {
      throw new Error("preco_zerado")
    }
    return this.productRepository.createProduct(product);
  }

  async deleteProduct(idProduct: string): Promise<number> {
    return this.productRepository.deleteProduct(idProduct);
  }

  async editaProduct(
    idProduct: string,
    product: Product
  ): Promise<Product | null> {
    return this.productRepository.editaProduct(idProduct, product);
  }

  async listProducts(filtro: object): Promise<Product[]> {
    const products = this.productRepository.listProducts(filtro);
    return products;
  }

  async returnProduct(idProduct: string): Promise<Product | null> {
    return this.productRepository.returnProduct(idProduct);
  }
}
