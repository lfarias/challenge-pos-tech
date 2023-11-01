import { z } from "zod";

/** Create Category */
export const CreateCategorySchema = z.object({
  body: z.object({
    nome: z
      .string()
  }),
});

export type CreateCategoryPayload = z.infer<typeof CreateCategorySchema>;

/** List Category */
export const ListCategorySchema = z.object({});
export type ListCategoryPayload = z.infer<typeof ListCategorySchema>;

/** return Category */
export const ReturnCategorySchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da category é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type ReturnCategoryPayload = z.infer<typeof ReturnCategorySchema>;
export type ReturnCategoryParams = ReturnCategoryPayload["params"];

/** Delete Category */
export const DeleteCategorySchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da category é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type DeleteCategoryPayload = z.infer<typeof DeleteCategorySchema>;
export type DeleteCategoryParams = DeleteCategoryPayload["params"];

/** Edita Category */
export const EditaCategorySchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da category é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
  body: z.object({
    nome: z
      .string({
        required_error: "O nome da category é obrigatório",
        invalid_type_error: "O nome deve ser um texto",
      })
  }),
});

export type EditaCategoryPayload = z.infer<typeof EditaCategorySchema>;
export type EditaCategoryBody = EditaCategoryPayload["body"];
export type EditaCategoryParams = EditaCategoryPayload["params"];