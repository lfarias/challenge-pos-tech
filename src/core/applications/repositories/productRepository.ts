import { ImagemProduct, Product } from "~core/domain/product";

export default interface ProductRepository {
  adicionaImagens(imagens: ImagemProduct[]): Promise<ImagemProduct[]>;
  removeImagem(idProduct: string, idImagem: string): Promise<number>;
  createProduct(product: Product): Promise<Product>;
  deleteProduct(idProduct: string): Promise<number>;
  editaProduct(idProduct: string, product: Product): Promise<Product | null>;
  listProducts(filtro: object): Promise<Product[]>;
  returnProduct(idProduct: string): Promise<Product | null>;
}
