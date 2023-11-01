import { Request, Response } from "express";

import CategoryService from "~core/applications/services/categoryService";

import { 
  CreateCategoryPayload,
  DeleteCategoryParams,
  EditaCategoryParams,
  EditaCategoryPayload,
  ListCategoryPayload,
  ReturnCategoryParams 
} from "../routers/schemas/categoryRouter.schema";

export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  async createCategory(req: Request<unknown, CreateCategoryPayload>, res: Response) {
    try {
      const category = req.body;

      const categoryCreatedo = await this.categoryService.createCategory(
        category
      );
      return res.status(201).json({
        status: "success",
        message: categoryCreatedo,
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async deleteCategory(req: Request<DeleteCategoryParams, unknown>, res: Response) {
    try {
      const { id } = req.params;

      const categoryDeletedo = await this.categoryService.deleteCategory(id);

      if (categoryDeletedo > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Category não encontrada!",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async editaCategory(req: Request<EditaCategoryParams, EditaCategoryPayload>, res: Response) {
    try {
      const { id } = req.params;
      const category = req.body;

      const categoryUpdateda = await this.categoryService.editaCategory(
        id,
        category
      );

      if (categoryUpdateda) {
        return res.status(200).json({
          status: "success",
          message: categoryUpdateda,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Category não encontrada!",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async listCategorys(req: Request<unknown, ListCategoryPayload>, res: Response) {
    try {
      const categorys = await this.categoryService.listCategorys();

      return res.status(200).json({
        status: "success",
        categorys,
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async returnCategory(req: Request<ReturnCategoryParams, unknown>, res: Response) {
    try {
      const { id } = req.params;

      const category = await this.categoryService.returnCategory(id);

      if (category) {
        return res.status(200).json({
          status: "success",
          category,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Category não encontrada!",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
}
