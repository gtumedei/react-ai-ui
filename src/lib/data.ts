import { createSafeActionClient, ServerCodeFn } from "next-safe-action"
import { revalidateTag, unstable_cache } from "next/cache"
import { ZodType, ZodTypeDef } from "zod"

const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    console.error(e)
    return e.message
  },
})

export const action = <TSchema, TInputSchema, TOutput>(
  actionSchema: ZodType<TSchema, ZodTypeDef, TInputSchema>,
  actionFn: ServerCodeFn<
    undefined,
    {},
    ZodType<TSchema, ZodTypeDef, TInputSchema>,
    readonly [],
    TOutput
  >
) => actionClient.schema(actionSchema).action(actionFn)

type AnyFunction = (...args: any[]) => Promise<any>

export const cache =
  <TFunction extends AnyFunction>(
    cb: TFunction,
    options: {
      key: string | ((...args: Parameters<TFunction>) => string | Promise<string>)
      tags: string[] | ((...args: Parameters<TFunction>) => string[] | Promise<string[]>)
    }
  ) =>
  async (...args: Parameters<TFunction>) => {
    const key = typeof options.key === "string" ? options.key : await options.key(...args)
    const tags = Array.isArray(options.tags) ? options.tags : await options.tags(...args)
    return unstable_cache(cb, [key], { tags })(...args) as ReturnType<TFunction>
  }

export const revalidateTags = (...tags: string[]) => {
  for (const tag of tags) {
    revalidateTag(tag)
  }
}

export { revalidatePath } from "next/cache"
