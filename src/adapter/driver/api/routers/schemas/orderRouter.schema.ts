import { z } from "zod";

/** Inicia Order */
export const iniciaOrderSchema = z.object({
  body: z.object({
    clientId: z
      .string()
      .uuid({ message: "O id do client deve ser UUID" })
      .optional(),
  }),
});

export type IniciaOrderPayload = z.infer<typeof iniciaOrderSchema>;

/** Adicionar Item */
export const adicionarItemSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do order é obrigatório",
        invalid_type_error: "O id order deve ser um texto",
      })
      .uuid({ message: "O id do order deve ser UUID" }),
  }),
  body: z.object({
    productId: z
      .string({
        required_error: "O id do product é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id do product deve ser UUID" }),
    quantidade: z
      .number({
        required_error: "Quantidade é obrigatória",
        invalid_type_error: "Quantidade deve ser um número",
      })
      .positive({ message: "Quantidade deve ser maior que zero" }),
    observacao: z
      .string({ invalid_type_error: "Observação deve ser um texto" })
      .optional(),
  }),
});

export type AdicionarItemPayload = z.infer<typeof adicionarItemSchema>;

export type AdicionarItemBody = AdicionarItemPayload["body"];
export type AdicionarItemParams = AdicionarItemPayload["params"];

/** Remove Item */
export const removeItemSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do order é obrigatório",
        invalid_type_error: "O id order deve ser um texto",
      })
      .uuid({ message: "O id do order deve ser UUID" }),
    idItem: z
      .string({
        required_error: "O id do item é obrigatório",
        invalid_type_error: "O id item deve ser um texto",
      })
      .uuid({ message: "O id do item deve ser UUID" }),
  }),
});

export type RemoveItemPayload = z.infer<typeof removeItemSchema>;
export type RemoveItemParams = RemoveItemPayload["params"];

/** Accomplish Order */
export const accomplishOrderSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do order é obrigatório",
        invalid_type_error: "O id order deve ser um texto",
      })
      .uuid({ message: "O id do order deve ser UUID" }),
  }),
  body: z.object({
    paymentMethodId: z
      .string({
        required_error: "O id do método de pagamento é obrigatório",
        invalid_type_error: "O id do método de pagamento deve ser um texto",
      })
      .uuid({ message: "O id do método de pagamento deve ser UUID" }),
  }),
});

export type AccomplishOrderPayload = z.infer<typeof accomplishOrderSchema>;
export type AccomplishOrderBody = AccomplishOrderPayload["body"];
export type AccomplishOrderParams = AccomplishOrderPayload["params"];

/** Start Preparo */
export const startPreparoSchema = z.object({});

export type StartPreparoParams = z.infer<typeof startPreparoSchema>;

/** Finish Preparo */
export const finishPreparoSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do order é obrigatório",
        invalid_type_error: "O id order deve ser um texto",
      })
      .uuid({ message: "O id do order deve ser UUID" }),
  }),
});

export type FinishPreparoPayload = z.infer<typeof finishPreparoSchema>;
export type FinishPreparoParams = FinishPreparoPayload["params"];

/** Delivery Order */
export const deliveryOrderSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do order é obrigatório",
        invalid_type_error: "O id order deve ser um texto",
      })
      .uuid({ message: "O id do order deve ser UUID" }),
  }),
});

export type DeliveryOrderPayload = z.infer<typeof deliveryOrderSchema>;
export type DeliveryOrderParams = DeliveryOrderPayload["params"];

/** List Orders */
export const listrOrdersSchema = z.object({
  query: z.object({
    status: z
      .string({
        invalid_type_error: "O status do order deve ser um texto",
      })
      .optional(),
  }),
});

export type ListOrdersPayload = z.infer<typeof listrOrdersSchema>;
export type ListOrdersQuery = ListOrdersPayload["query"];
