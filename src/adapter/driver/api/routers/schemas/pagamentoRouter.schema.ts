import { z } from "zod";


/** List Category */
export const ListPagamentosSchema = z.object({
    params: z.object({}),
    body: z.object({}),
});
export type ListPagamentosPayload = z.infer<typeof ListPagamentosSchema>;
export type ListPagamentosBody = ListPagamentosPayload["body"];
export type ListPagamentosParams = ListPagamentosPayload["params"];