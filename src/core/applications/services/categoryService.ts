import CategoryRepository from "~core/applications/repositories/categoryRepository";
import Category from "~core/domain/category";

export default class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(category: Category): Promise<Category> {
    return this.categoryRepository.createCategory(category);
  }

  async deleteCategory(idCategory: string): Promise<number> {
    return this.categoryRepository.deleteCategory(idCategory);
  }

  async editaCategory(
    idCategory: string,
    category: Category
  ): Promise<Category | null> {
    return this.categoryRepository.editaCategory(idCategory, category);
  }

  async listCategorys(): Promise<Category[]> {
    const categorys = this.categoryRepository.listCategorys();
    return categorys;
  }

  async returnCategory(idCategory: string): Promise<Category | null> {
    return this.categoryRepository.returnCategory(idCategory);
  }
}
