import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormProps, useForm as useHookForm } from "react-hook-form"
import { ZodSchema } from "zod"

export const useForm = <TSchema extends Record<string, unknown>>(
  props: UseFormProps<TSchema> & {
    schema: ZodSchema<TSchema>
    onSubmit: (values: TSchema) => void | Promise<void>
  }
) => {
  const { schema, onSubmit, ...other } = props
  const form = useHookForm<TSchema>({
    resolver: zodResolver(props.schema),
    ...other,
  })
  const handleSubmit = form.handleSubmit(onSubmit as any)
  return { ...form, handleSubmit }
}
