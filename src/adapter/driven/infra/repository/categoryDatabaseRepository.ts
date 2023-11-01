import CategoryRepository from "~core/applications/repositories/categoryRepository";
import Category from "~core/domain/category";

import CategoryModel from "../models/categoryModel";

class CategorysDataBaseRepository implements CategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    try {
      return await CategoryModel.create(category);
    } catch (err: any) {
      console.error("Erro ao creater Category: ", err);
      throw new Error(err);
    }
  }

  async deleteCategory(idCategory: string): Promise<number> {
    try {
      return CategoryModel.destroy({ where: { id: idCategory } });
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async editaCategory(
    idCategory: string,
    category: Category
  ): Promise<Category | null> {
    try {
      const categoryAtual = await CategoryModel.findByPk(idCategory);

      if (categoryAtual) {
        Object.assign(categoryAtual, category);
        await categoryAtual.save();
      }
      return categoryAtual;
    } catch (err: any) {
      console.error("Erro ao editar Category: ", err);
      throw new Error(err);
    }
  }

  async listCategorys(): Promise<Category[]> {
    try {
      return await CategoryModel.findAll();
    } catch (err: any) {
      console.error("Erro ao listr Category: ", err);
      throw new Error(err);
    }
  }

  async returnCategory(idCategory: string): Promise<Category | null> {
    try {
      return await CategoryModel.findByPk(idCategory);
    } catch (err: any) {
      console.error("Erro ao returnr Category: ", err);
      throw new Error(err);
    }
  }
}

export default CategorysDataBaseRepository;
