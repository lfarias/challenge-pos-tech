import Category from "~core/domain/category";

export default interface CategoryRepository {
  createCategory(Category: Category): Promise<Category>;
  deleteCategory(idCategory: string): Promise<number>;
  editaCategory(
    idCategory: string,
    Category: Category
  ): Promise<Category | null>;
  listCategorys(): Promise<Category[]>;
  returnCategory(idCategory: string): Promise<Category | null>;
}
