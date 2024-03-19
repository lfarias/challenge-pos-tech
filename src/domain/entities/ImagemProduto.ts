<<<<<<< HEAD
import throwError from "handlerError/handlerError";
=======
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
import { v4 as uuidv4 } from "uuid";

import { ImagemProdutoInput } from "./types/produtoType";

export default class ImagemProduto {
  public id: string;
  public produtoId: string | null;
  public url: string;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;


  constructor(imageProdutoInput: ImagemProdutoInput) {
    this.id = imageProdutoInput.id ?? uuidv4();
    this.produtoId = imageProdutoInput.produtoId ?? null;
    this.url = imageProdutoInput.url;
    this.createdAt = imageProdutoInput.createdAt ?? new Date();
    this.deletedAt = imageProdutoInput.deletedAt ?? null;
    this.updatedAt = imageProdutoInput.updatedAt ?? null;

    this.validar();
  }

  validar() {
    if (this.url.length <= 0) {
<<<<<<< HEAD
      throwError("BAD_REQUEST","Url da imagem nao fornecida");
=======
      throw new Error('Url da imagem nao fornecida');
>>>>>>> adf27ff2c8ad196742a99bd5cc1f6859403f0778
    }
  }
}

