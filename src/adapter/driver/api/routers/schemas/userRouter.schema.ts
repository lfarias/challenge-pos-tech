import { z } from "zod";


/** Create user */
export const CreateUsuarioSchema = z.object({
  body: z.object({
    nome: z
      .string({
        invalid_type_error: "O nome deve ser um texto",
      })
      .optional(),
    cpf: z
      .string({
        invalid_type_error: "O CPF deve ser string",
      })
      .optional(),
    email: z
      .string({ invalid_type_error: "O Email deve ser string" })
      .optional(),
  }),
});
export type CreateUsuarioPayload = z.infer<typeof CreateUsuarioSchema>;
export type CreateUsuarioBody = CreateUsuarioPayload["body"];


/** List users */
export const ListUsersSchema = z.object({
  params: z.object({}),
  body: z.object({}),
});
export type ListUsersPayload = z.infer<typeof ListUsersSchema>;
export type ListUsersParams = ListUsersPayload["params"];
export type ListUsersBody = ListUsersPayload["body"];

/** return user */
export const ReturnUsuarioSchema = z.object({
  body: z.object({
    cpf: z
      .string({
        required_error: "CPF é obrigatório",
        invalid_type_error: "O CPF deve ser string",
      }),
  }),
});
export type ReturnUsuarioPayload = z.infer<typeof ReturnUsuarioSchema>;
export type ReturnUsuarioBody = ReturnUsuarioPayload["body"];
