import ProductRepository from "~core/applications/repositories/productRepository";
import { ImagemProduct, Product } from "~core/domain/product";

import CategoryModel from "../models/categoryModel";
import ImagensProductModel from "../models/productImagensModel";
import ProductModel from "../models/productModel";

class ProductsDataBaseRepository implements ProductRepository {
  async adicionaImagens(
    imagensProduct: ImagemProduct[]
  ): Promise<ImagemProduct[]> {
    try {
      const productExiste = ProductModel.findByPk(imagensProduct[0]?.productId);
      if (!productExiste) {
        throw new Error("product_inexistente");
      }
      return await ImagensProductModel.bulkCreate(imagensProduct);
    } catch (err: any) {
      console.error("Erro ao adicionar imagens ao product: ", err);
      throw new Error(err);
    }
  }
  async removeImagem(productId: string, imagemId: string): Promise<number> {
    try {
      return ImagensProductModel.destroy({
        where: { id: imagemId, productId },
      });
    } catch (err: any) {
      console.error("Erro ao remove imagem do product: ", err);
      throw new Error(err);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const categoryExiste = await CategoryModel.findByPk(
        product.categoryId
      );

      if (!categoryExiste) {
        throw new Error("category_inexistente");
      }

      const productCreatedo = await ProductModel.create(
        {
          ...product,
          ...{
            imagens: product?.imagens ?? [],
          },
        },
        {
          include: [
            {
              model: ImagensProductModel,
              as: "imagens",
            },
          ],
        }
      );
      return productCreatedo;
    } catch (err: any) {
      console.error("Erro ao creater Product: ", err);
      throw new Error(err);
    }
  }

  async deleteProduct(idProduct: string): Promise<number> {
    try {
      return ProductModel.destroy({ where: { id: idProduct } });
    } catch (err: any) {
      console.error("Erro ao deleter product: ", err);
      throw new Error(err);
    }
  }

  async editaProduct(
    idProduct: string,
    product: Product
  ): Promise<Product | null> {
    try {
      const categoryExiste = await CategoryModel.findByPk(
        product.categoryId
      );

      if (!categoryExiste) {
        throw new Error("category_inexistente");
      }

      const productAtual = await ProductModel.findByPk(idProduct);

      if (productAtual) {
        Object.assign(productAtual, product);
        await productAtual.save();
      }
      return productAtual;
    } catch (err: any) {
      console.error("Erro ao editar Product: ", err);
      throw new Error(err);
    }
  }

  async listProducts(filtro: object): Promise<Product[]> {
    try {
      const products = await ProductModel.findAll({
        attributes: {
          exclude: ["categoryId"],
        },
        include: [
          {
            model: ImagensProductModel,
            as: "imagens",
          },
          {
            model: CategoryModel,
            as: "category",
          },
        ],
        where: { ...filtro },
      });
      return products;
    } catch (err: any) {
      console.error("Erro ao listr Product: ", err);
      throw new Error(err);
    }
  }

  async returnProduct(idProduct: string): Promise<Product | null> {
    try {
      const product = await ProductModel.findOne({
        attributes: {
          exclude: ["categoryId"],
        },
        include: [
          {
            model: ImagensProductModel,
            as: "imagens",
          },
          {
            model: CategoryModel,
            as: "category",
          },
        ],
        where: { id: idProduct },
      });
      return product;
    } catch (err: any) {
      console.error("Erro ao returnr Product: ", err);
      throw new Error(err);
    }
  }
}

export default ProductsDataBaseRepository;
