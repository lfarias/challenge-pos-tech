import express from "express";

import CategoryService from "~core/applications/services/categoryService";
import DBCategorysRepository from "~driven/infra/repository/categoryDatabaseRepository";

import CategoryController from "../controllers/categoryController";

import {
  CreateCategorySchema,
  DeleteCategorySchema,
  EditaCategorySchema,
  ListCategorySchema,
  ReturnCategorySchema,
} from "./schemas/categoryRouter.schema";
import { validaRequisicao } from "./utils";

const categoryRouter = express.Router();

const dbCategorysRepository = new DBCategorysRepository();
const categoryService = new CategoryService(dbCategorysRepository);
const categoryController = new CategoryController(categoryService);

/** 
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: string
 *         nome:
 *           type: string
 *           example: Category Exemplo
 *         deletedAt:
 *           type: null
 *           example: null
 *         updatedAt:
 *           type: string
 *           example: string
 *         createdAt:
 *           type: string
 *           example: string
 *       required:
 *         - nome
 *   parameters: {} 
 */

/**
 * @openapi
 * /category:
 *   post:
 *     summary: Create a category
 *     tags:
 *       - category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *             required:
 *               - nome
 *     responses:
 *       201:
 *         description: Return a category created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Category"
 *               required:
 *                 - body
 *             status: success
 *       500:
 *         description: Error create category.
 */
categoryRouter.post("/",
  validaRequisicao(CreateCategorySchema),
  categoryController.createCategory.bind(categoryController)
);

/**
 * @openapi
 * /category:
 *   get:
 *     summary: List todas as categorys
 *     tags:
 *       - category
 *     responses:
 *       200:
 *         description: Return a list de categorys.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 categorys:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Category" 
 *       500:
 *         description: Error.
 */
categoryRouter.get("/",
  validaRequisicao(ListCategorySchema),
  categoryController.listCategorys.bind(categoryController)
);
/**
 * @openapi
 * /category/{id}:
 *   get:
 *     summary: Return category por id
 *     tags:
 *       - category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da category
 *     responses:
 *       200:
 *         description: Return a category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 category:
 *                   $ref: "#/components/schemas/Category"
 *               required:
 *                 - params
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
 *       500:
 *         description: Erro na api.
 */
categoryRouter.get("/:id",
  validaRequisicao(ReturnCategorySchema),
  categoryController.returnCategory.bind(categoryController)
);
/**
 * @openapi
 * /category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da category
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
 *       500:
 *         description: Erro na api.
 */
categoryRouter.delete("/:id", 
  validaRequisicao(DeleteCategorySchema),
  categoryController.deleteCategory.bind(categoryController)
);
/**
 * @openapi
 * /category/{id}:
 *   put:
 *     summary: Update a category
 *     tags:
 *       - category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *             required:
 *               - nome
 *     responses:
 *       200:
 *         description: Return category updateda.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Category"
 *               required:
 *                 - params
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
 *       500:
 *         description: Erro na api.
 */
categoryRouter.put("/:id",
  validaRequisicao(EditaCategorySchema), 
  categoryController.editaCategory.bind(categoryController)
);


export default categoryRouter;
