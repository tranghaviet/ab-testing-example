import { ZodTypeAny } from "zod"

export function validateQuery(request: Request, schema: ZodTypeAny) {
  // Get the query parameters from the URL
  const { searchParams } = new URL(request.url)

  // Convert URLSearchParams to a plain object
  const queryParams = Object.fromEntries(searchParams.entries())

  return schema.parse(queryParams)
}
