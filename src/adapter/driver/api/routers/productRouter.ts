import express from "express";

import ProductService from "~core/applications/services/productService";
import DBProductsRepository from "~driven/infra/repository/productDatabaseRepository";

import ProductController from "../controllers/productController";

import {
  AdicionaImagenSchema,
  CreateProductSchema,
  DeleteProductSchema,
  EditaProductSchema,
  ListProductSchema,
  RemoveImagemSchema,
  ReturnProductSchema
} from "./schemas/productRouter.schema";
import { validaRequisicao } from "./utils";

const productRouter = express.Router();

const dbProductsRepository = new DBProductsRepository();
const productService = new ProductService(dbProductsRepository);
const productController = new ProductController(productService);

/** 
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: Product Exemplo
 *         preco:
 *           type: number
 *           minimum: 0
 *           exclusiveMinimum: true
 *           example: 10
 *         descricao:
 *           type: string
 *           example: Descrição do product
 *         categoryId:
 *           type: string
 *           format: uuid
 *           example: 64ada07b-7c8e-46df-815c-c7d485595bee
 *         deletedAt:
 *           type: null
 *           example: null
 *         updatedAt:
 *           type: string
 *           example: string
 *         createdAt:
 *           type: string
 *           example: string
 *         imagens:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *       required:
 *         - nome
 *         - preco
 *         - descricao
 *         - categoryId
 *   parameters: {} 
 */

/**
 * @openapi
 * /product:
 *   post:
 *     summary: Creater um product
 *     tags:
 *       - product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *             required:
 *               - nome
 *               - preco
 *               - categoryId
 *     responses:
 *       201:
 *         description: Return o product createdo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Product"
 *               required:
 *                 - body
 *             status: success
 *       404:
 *         description: Category nao identificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Category não encontrada!
 *       400:
 *         description: Preço abaixo do mínimo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: O preço deve ser maior que zero!
 *       500:
 *         description: Erro na createcao do product.
 */
productRouter.post("/",
  validaRequisicao(CreateProductSchema),
  productController.createProduct.bind(productController)
);

/**
 * @openapi
 * /product:
 *   get:
 *     summary: List todos os products
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: false
 *         description: Id da category
 *     tags:
 *       - product
 *     responses:
 *       200:
 *         description: Return a list de products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product" 
 *               required:
 *                 - params
 *       500:
 *         description: Erro na createcao da product.
 */
productRouter.get("/",
  validaRequisicao(ListProductSchema),
  productController.listProducts.bind(productController)
);

/**
 * @openapi
 * /product/{id}:
 *   get:
 *     summary: Return product por id
 *     tags:
 *       - product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do product
 *     responses:
 *       200:
 *         description: Return um product por id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 product:
 *                   $ref: "#/components/schemas/Product"
 *               required:
 *                 - params
 *       404:
 *         description: product nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Product não encontrado!
 *       500:
 *         description: Erro na api.
 */
productRouter.get("/:id",
  validaRequisicao(ReturnProductSchema),
  productController.returnProduct.bind(productController)
);

/**
 * @openapi
 * /product/{id}:
 *   delete:
 *     summary: Delete uma product
 *     tags:
 *       - product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do product
 *     responses:
 *       200:
 *         description: Return sucesso na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *               required:
 *                 - params
 *       404:
 *         description: product nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: product não encontrado!
 *       500:
 *         description: Erro na api.
 */
productRouter.delete("/:id",
  validaRequisicao(DeleteProductSchema),
  productController.deleteProduct.bind(productController)
);

/**
 * @openapi
 * /product/{id}:
 *   put:
 *     summary: Update um product
 *     tags:
 *       - product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Return product updatedo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Product"
 *               required:
 *                 - params
 *       404:
 *         description: product nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Product não encontrado!
 *       500:
 *         description: Erro na api.
 */
productRouter.put("/:id",
  validaRequisicao(EditaProductSchema),
  productController.editaProduct.bind(productController)
);

/**
 * @openapi
 * /product/{idProduct}/imagem/{idImagem}:
 *   delete:
 *     summary: Delete imagem do product
 *     tags:
 *       - product
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do product
 *       - in: path
 *         name: idImagem
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da imagem
 *     responses:
 *       200:
 *         description: Return sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *               required:
 *                 - params
 *       404:
 *         description: product ou imagem nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             examples:
 *               erroImagem:
 *                 value:
 *                   status: error
 *                   message: Imagem não encontrada!
 *               erroProduct:
 *                 value:
 *                   status: error
 *                   message: Product não encontrado!
 *       500:
 *         description: Erro na api.
 */
productRouter.delete(
  "/:idProduct/imagem/:idImagem",
  validaRequisicao(RemoveImagemSchema),
  productController.removeImagem.bind(productController)
);

/**
 * @openapi
 * /product/{id}/imagens:
 *   post:
 *     summary: Adiciona list de imagens ao product
 *     tags:
 *       - product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *     responses:
 *       201:
 *         description: Adiciona uma imagem a um product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: string
 *                       url:
 *                         type: string
 *                         example: string
 *                       productId:
 *                         type: string
 *                         format: uuid
 *                         example: string
 *                       deletedAt:
 *                         type: null
 *                         example: null
 *                       updatedAt:
 *                         type: string
 *                         example: string
 *                       createdAt:
 *                         type: string
 *               required:
 *                 - params
 *       404:
 *         description: product nao identificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Product não encontrado!
 *       500:
 *         description: Erro na api.
 */
productRouter.post(
  "/:id/imagens",
  validaRequisicao(AdicionaImagenSchema),
  productController.adicionaImagens.bind(productController)
);

export default productRouter;
