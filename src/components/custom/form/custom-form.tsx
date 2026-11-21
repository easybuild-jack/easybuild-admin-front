import { usePreventAutofocus } from "@/hooks/use-prevent-autofocus"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form as UIForm } from "@/components/ui/form"
import { Layout } from './layout'
import { Field } from './field'
import { cn } from "@/lib/utils"
import type { CustomFormProps, CustomFormRef, FormField } from './types'

// 处理字段值的函数
const processFieldValue = (value: any, type?: string) => {
  if (value === null || value === undefined) {
    return type === 'number' ? 0 : ''
  }

  if (type === 'number' && typeof value !== 'number') {
    return Number(value)
  }

  return value
}

export const CustomForm = React.forwardRef<CustomFormRef, CustomFormProps>((props, ref) => {
  const [isInitializing, setIsInitializing] = React.useState(false)
  const isFirstMount = React.useRef(true)
  const lastInitialDataJsonRef = React.useRef<string | undefined>(undefined)
  const formContainerRef = React.useRef<HTMLDivElement>(null)

  const [updatingFields, setUpdatingFields] = React.useState<Set<string>>(() => new Set())

  // O(1) 字段配置映射，替代循环内 fields.find
  const fieldMap = React.useMemo(() => {
    const map = new Map<string, FormField>()
    for (const f of props.fields) {
      map.set(f.name, f)
    }
    return map
  }, [props.fields])

  const watchFieldsSet = React.useMemo(
    () => (props.watchFields && props.watchFields.length > 0 ? new Set(props.watchFields) : null),
    [props.watchFields]
  )

  // @ts-ignore - Zod resolver type compatibility issue between versions
  const form = useForm<any>({
    // @ts-ignore
    resolver: zodResolver(props.schema),
    defaultValues: props.defaultValues,
    mode: props.mode,
    criteriaMode: props.criteriaMode || "firstError",
    shouldUnregister: props.shouldUnregister
  })

  React.useImperativeHandle(ref, () => ({
    form,
    reset: () => form.reset(props.defaultValues)
  }), [form, props.defaultValues])

  // 仅在集合确实包含该字段时才返回新 Set，避免挂载阶段每个 Field 触发一次全表单重渲染
  const handleFieldRendered = React.useCallback((fieldName: string) => {
    setUpdatingFields(prev => {
      if (!prev.has(fieldName)) return prev
      const next = new Set(prev)
      next.delete(fieldName)
      return next
    })
  }, [])

  const handleSubmit = React.useCallback(async (data: any) => {
    try {
      await props.onSubmit(data)
    } catch (error) {
      if (props.onError) {
        props.onError(error)
      } else {
        console.error('Form submission error:', error)
      }
    }
  }, [props.onSubmit, props.onError])

  React.useEffect(() => {
    if (!props.onChange) return

    if (watchFieldsSet) {
      const subscription = form.watch((value, { name }) => {
        if (name && watchFieldsSet.has(name)) {
          const field = fieldMap.get(name)
          const processedValue = processFieldValue(value[name], field?.type)
          props.onChange?.({ [name]: processedValue })
        }
      })

      return () => subscription.unsubscribe()
    }

    if (props.watchAll) {
      const subscription = form.watch((value) => {
        const processedValue: Record<string, any> = {}
        for (const [key, val] of Object.entries(value)) {
          const field = fieldMap.get(key)
          processedValue[key] = processFieldValue(val, field?.type)
        }
        props.onChange?.(processedValue)
      })

      return () => subscription.unsubscribe()
    }
  }, [form, props.onChange, watchFieldsSet, props.watchAll, fieldMap])

  const fieldMapRef = React.useRef(fieldMap)
  fieldMapRef.current = fieldMap

  React.useEffect(() => {
    const nextJson = JSON.stringify(props.initialData)
    if (!isFirstMount.current && lastInitialDataJsonRef.current === nextJson) {
      return
    }

    const initializeForm = async () => {
      try {
        setIsInitializing(true)
        const initialValues = props.initialData || props.defaultValues
        const processedValues: Record<string, any> = {}
        if (initialValues) {
          for (const [key, value] of Object.entries(initialValues)) {
            const field = fieldMapRef.current.get(key)
            processedValues[key] = processFieldValue(value, field?.type)
          }
        }

        await form.reset(processedValues)
        lastInitialDataJsonRef.current = nextJson
        props.onInitialized?.()
      } catch (error) {
        if (props.onError) {
          props.onError(error)
        } else {
          console.error('Form initialization error:', error)
        }
      } finally {
        setIsInitializing(false)
        isFirstMount.current = false
      }
    }

    initializeForm()
  }, [props.initialData, form, props.defaultValues, props.onInitialized, props.onError])

  usePreventAutofocus()

  const isDisabled = Boolean(props.disabled || props.loading || isInitializing)
  const errors = form.formState.errors

  return (
    <div className="relative" ref={formContainerRef}>
      <UIForm {...form}>
        <form
          id={props.id}
          onSubmit={form.handleSubmit(handleSubmit)}
          className={cn(
            "w-full",
            props.className,
            (props.loading || isInitializing) && "pointer-events-none opacity-60"
          )}
          noValidate
          autoComplete={props.autoComplete || "off"}
        >
          <Layout {...props.layout}>
            {props.fields.map((field) => (
              <Field
                key={field.name}
                field={field}
                form={form}
                error={errors[field.name]?.message as string}
                disabled={isDisabled}
                onRendered={handleFieldRendered}
                forceUpdate={updatingFields.has(field.name)}
              />
            ))}
          </Layout>
        </form>
      </UIForm>
    </div>
  )
})

CustomForm.displayName = 'CustomForm'
