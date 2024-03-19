import { CategoriaDTO } from "~domain/entities/types/CategoriaType";
import CategoriaRepository from "~domain/repositories/categoriaRepository";

import CategoriaModel from "../models/categoriaModel";


class CategoriasDataBaseRepository implements CategoriaRepository {
  async criaCategoria(categoria: CategoriaDTO): Promise<CategoriaDTO> {
<<<<<<< HEAD
    return await CategoriaModel.create(categoria) as CategoriaDTO;
  }

  async deletaCategoria(idCategoria: string): Promise<number> {
    return CategoriaModel.destroy({ where: { id: idCategoria } });
=======
    try {
      return await CategoriaModel.create(categoria) as CategoriaDTO;
    } catch (err: any) {
      console.error("Erro ao criar Categoria: ", err);
      throw new Error(err);
    }
  }

  async deletaCategoria(idCategoria: string): Promise<number> {
    try {
      return CategoriaModel.destroy({ where: { id: idCategoria } });
    } catch (err: any) {
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }
  async editaCategoria(
    idCategoria: string,
    categoria: CategoriaDTO
  ): Promise<CategoriaDTO | null> {
<<<<<<< HEAD
    const categoriaAtual = await CategoriaModel.findByPk(idCategoria);

    if (categoriaAtual) {
      Object.assign(categoriaAtual, categoria);
      await categoriaAtual.save();
    }
    return categoriaAtual as CategoriaDTO;
  }

  async listaCategorias(): Promise<CategoriaDTO[]> {
    return await CategoriaModel.findAll();
  }

  async retornaCategoria(idCategoria: string): Promise<CategoriaDTO | null> {
    return await CategoriaModel.findByPk(idCategoria);
=======
    try {
      const categoriaAtual = await CategoriaModel.findByPk(idCategoria);

      if (categoriaAtual) {
        Object.assign(categoriaAtual, categoria);
        await categoriaAtual.save();
      }
      return categoriaAtual as CategoriaDTO;
    } catch (err: any) {
      console.error("Erro ao editar Categoria: ", err);
      throw new Error(err);
    }
  }

  async listaCategorias(): Promise<CategoriaDTO[]> {
    try {
      return await CategoriaModel.findAll();
    } catch (err: any) {
      console.error("Erro ao listar Categoria: ", err);
      throw new Error(err);
    }
  }

  async retornaCategoria(idCategoria: string): Promise<CategoriaDTO | null> {
    try {
      return await CategoriaModel.findByPk(idCategoria);
    } catch (err: any) {
      console.error("Erro ao retornar Categoria: ", err);
      throw new Error(err);
    }
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
  }
}

export default CategoriasDataBaseRepository;
