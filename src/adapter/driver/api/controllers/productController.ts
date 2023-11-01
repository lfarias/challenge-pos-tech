import { Request, Response } from "express";

import ProductService from "~core/applications/services/productService";
import { ImagemProduct } from "~core/domain/product";

import { AdicionarItemBody, AdicionarItemParams } from "../routers/schemas/orderRouter.schema";
import {
  CreateProductBody,
  DeleteProductBody,
  EditaProductBody,
  EditaProductParams,
  ListProductParams,
  RemoveImagemParams,
  ReturnProductParams
} from "../routers/schemas/productRouter.schema";

export default class ProductController {
  constructor(private readonly productService: ProductService) { }
  async adicionaImagens(
    req: Request<AdicionarItemParams, AdicionarItemBody>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const body = req.body;

      const imagens = body?.imagens.map((imagem: ImagemProduct) => {
        return { ...imagem, productId: id };
      });

      const imagensAdicionadas = await this.productService.adicionaImagens(
        imagens
      );
      return res.status(201).json({
        status: "success",
        message: imagensAdicionadas,
      });
    } catch (err: any) {
      if (err.message === "product_inexistente") {
        return res.status(404).json({
          status: "error",
          message: "Product não encontrado!",
        });
      }
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async removeImagem(
    req: Request<RemoveImagemParams, unknown>,
    res: Response
  ) {
    try {
      const { idProduct } = req.params;
      const { idImagem } = req.params;

      if (!idProduct) {
        return res.status(404).json({
          status: "error",
          message: "Product não encontrado!",
        });
      }

      if (!idImagem) {
        return res.status(404).json({
          status: "error",
          message: "Imagem não encontrada!",
        });
      }

      const imagemDeleteda = await this.productService.removeImagem(
        idProduct,
        idImagem
      );

      if (imagemDeleteda > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Imagem ou product não encontrado!",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async createProduct(
    req: Request<unknown, CreateProductBody>,
    res: Response
  ) {
    try {
      const product = req.body;

      const productCreatedo = await this.productService.createProduct(product);
      return res.status(201).json({
        status: "success",
        message: productCreatedo,
      });
    } catch (err: any) {
      if (err.message === "category_inexistente") {
        return res.status(404).json({
          status: "error",
          message: "Category não encontrada!",
        });
      }

      if (err.message === "preco_zerado") {
        return res.status(400).json({
          status: "error",
          message: "O preço deve ser maior que zero!",
        });
      }
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async deleteProduct(
    req: Request<DeleteProductBody, unknown>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const productDeletedo = await this.productService.deleteProduct(id);

      if (productDeletedo > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "product não encontrado!",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async editaProduct(
    req: Request<EditaProductParams, EditaProductBody>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const product = req.body;

      const productUpdatedo = await this.productService.editaProduct(
        id,
        product
      );

      if (productUpdatedo) {
        return res.status(200).json({
          status: "success",
          message: productUpdatedo,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Product não encontrado!",
      });
    } catch (err: any) {
      if (err.message === "category_inexistente") {
        return res.status(404).json({
          status: "error",
          message: "Category não encontrada!",
        });
      }

      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async listProducts(
    req: Request<ListProductParams, unknown>,
    res: Response
  ) {
    try {
      const categoryId = req.query.categoryId;
      const filtro: {
        categoryId?: string;
      } = {};

      if (categoryId) {
        filtro.categoryId = categoryId as string;
      }

      const products = await this.productService.listProducts(filtro);

      return res.status(200).json({
        status: "success",
        products,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async returnProduct(
    req: Request<ReturnProductParams, unknown>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const product = await this.productService.returnProduct(id);

      if (product) {
        return res.status(200).json({
          status: "success",
          product,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Product não encontrado!",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
}
