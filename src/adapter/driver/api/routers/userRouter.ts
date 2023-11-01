import express from "express";

import UsuarioService from "../../../../core/applications/services/userService";
import DBUsersRepository from "../../../driven/infra/repository/userDatabaseRepository";
import UsuarioController from "../controllers/userController";

import { ListPagamentosSchema } from "./schemas/pagamentoRouter.schema";
import { CreateUsuarioSchema, ReturnUsuarioSchema } from "./schemas/userRouter.schema";
import { validaRequisicao } from "./utils";

const userRouter = express.Router();

const dbUsersRepository = new DBUsersRepository();
const userService = new UsuarioService(dbUsersRepository);
const userController = new UsuarioController(userService);

/** 
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: string
 *         cpf:
 *           type: string
 *           example: string
 *         email:
 *           type: string
 *           example: string
 *         nome:
 *           type: string
 *           example: string
 *         deletedAt:
 *           type: null
 *           example: null
 *         updatedAt:
 *           type: string
 *           example: string
 *         createdAt:
 *           type: string
 *           example: string
 *   parameters: {} 
 */

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create user
 *     tags:
 *       - user
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Return novo user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   $ref: "#/components/schemas/Usuario"
 *               required:
 *                 - body
 *             status: success
 *       400:
 *         description: Body invalido ou dados de users duplicados.
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
 *                   example: Email ou CPF já em uso!
 *       500:
 *         description: Erro na api.
 */
userRouter.post("/",
  validaRequisicao(CreateUsuarioSchema),
  userController.createUsuario.bind(userController)
);

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Return list de users
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: return lists de users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Usuario" 
 *       500:
 *         description: Erro na api.
 */
userRouter.get("/",
  validaRequisicao(ListPagamentosSchema),
  userController.listUsers.bind(userController)
);

/**
 * @openapi
 * /user/query:
 *   post:
 *     summary: Filtra user pelo CPF
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: return user por id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   $ref: "#/components/schemas/Usuario"
 *               required:
 *                 - params
 *       404:
 *         description: user nao encontrado.
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
 *                   example: Usuário não encontrado!
 *       500:
 *         description: Erro na api.
 */
userRouter.post("/query",
  validaRequisicao(ReturnUsuarioSchema),
  userController.returnUsuario.bind(userController)
);

export default userRouter;