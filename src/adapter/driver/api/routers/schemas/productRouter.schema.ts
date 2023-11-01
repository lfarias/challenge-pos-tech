import { z } from "zod";

/** Create Product */
export const CreateProductSchema = z.object({
  body: z.object({
    nome: z
      .string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "id inválido",
      }),
    preco: z
      .number({
        required_error: "O preco é obrigatório",
        invalid_type_error: "O preço deve ser um numero",
      })
      .positive({ message: "valor deve ser maior que zero" }),
    descricao: z
      .string(),
    categoryId: z
      .string({
        required_error: "O id da category é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "categoryId deve ser UUID" }),
    //images - TODO 
  }),
});

export type CreateProductPayload = z.infer<typeof CreateProductSchema>;
export type CreateProductBody = CreateProductPayload["body"];


/** List Product */
export const ListProductSchema = z.object({
  params: z.object({
    categoryId: z
      .string({
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" })
      .optional(),
  }),
});
export type ListProductPayload = z.infer<typeof ListProductSchema>;
export type ListProductParams = ListProductPayload["params"];

/** return Product */
export const ReturnProductSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do Product é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type ReturnProductPayload = z.infer<typeof ReturnProductSchema>;
export type ReturnProductParams = ReturnProductPayload["params"];


/** Delete Product */
export const DeleteProductSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do Product é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type DeleteProductPayload = z.infer<typeof DeleteProductSchema>;
export type DeleteProductBody = DeleteProductPayload["params"];

/** Edita Product */
export const EditaProductSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O Id do product é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
  body: z.object({
    nome: z
      .string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "id inválido",
      })
      .optional(),
    preco: z
      .number({
        required_error: "O preco é obrigatório",
        invalid_type_error: "O id deve ser um numer",
      })
      .optional(),
    descricao: z
      .string()
      .optional(),
    categoryId: z
      .string({
        required_error: "O id da category é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "categoryId deve ser UUID" })
    //images - TODO 
  }),
});

export type EditaProductPayload = z.infer<typeof EditaProductSchema>;
export type EditaProductParams = EditaProductPayload["params"];
export type EditaProductBody = EditaProductPayload["body"];


/** Delete imagem Product */
export const RemoveImagemSchema = z.object({
  params: z.object({
    idProduct: z
      .string({
        required_error: "O id do Product é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
    idImagem: z
      .string({
        required_error: "O id da imagem é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id da imagem deve ser UUID" }),
  }),
});

export type RemoveImagemPayload = z.infer<typeof RemoveImagemSchema>;
export type RemoveImagemParams = RemoveImagemPayload["params"];

/** Edita Product */
export const AdicionaImagenSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do product é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
  body: z.object({
    //images - TODO 
  }),
});

export type AdicionaImagenPayload = z.infer<typeof AdicionaImagenSchema>;