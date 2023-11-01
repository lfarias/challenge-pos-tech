import UsuarioService from "core/applications/services/userService";
import { Request, Response } from "express";

import { CreateUsuarioBody, ReturnUsuarioBody } from "../routers/schemas/userRouter.schema";

export default class UsuarioController {
  constructor(private readonly userService: UsuarioService) { }

  async createUsuario(
    req: Request<unknown, CreateUsuarioBody>,
    res: Response
  ) {
    try {
      const user = req.body;

      const userCreatedo = await this.userService.createUsuario(user);
      return res.status(201).json({
        status: "success",
        message: userCreatedo,
      });
    } catch (err: any) {
      if (err.message === "user_duplicado") {
        return res.status(400).json({
          status: "error",
          message: "Email ou CPF já em uso!"
        })
      }
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async listUsers(
    req: Request,
    res: Response
  ) {
    try {
      const users = await this.userService.listUsers();

      return res.status(200).json({
        status: "success",
        users,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async returnUsuario(
    req: Request<unknown, ReturnUsuarioBody>,
    res: Response
  ) {
    try {
      const { body } = req;

      const user = await this.userService.returnUsuario(body.cpf);

      if (user) {
        return res.status(200).json({
          status: "success",
          user,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Usuário não encontrado!",
      });

    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

}