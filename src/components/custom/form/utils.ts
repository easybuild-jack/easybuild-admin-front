import type { FormField } from './types'

// 嵌套 WeakMap 缓存：(data, fields) -> 格式化结果，修复原每次新建 { data, fields } 键导致缓存永不命中的问题
const formatCache = new WeakMap<object, WeakMap<FormField[], Record<string, any>>>()

function buildFieldMap(fields: FormField[]): Map<string, FormField> {
  const map = new Map<string, FormField>()
  for (const field of fields) {
    map.set(field.name, field)
  }
  return map
}

// 格式化表单数据
export function formatFormData(data: Record<string, any>, fields: FormField[]) {
  let fieldsCache = formatCache.get(data)
  if (fieldsCache?.has(fields)) {
    return fieldsCache.get(fields)!
  }

  const fieldMap = buildFieldMap(fields)
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(data)) {
    const field = fieldMap.get(key)
    result[key] = field?.transform?.input ? field.transform.input(value) : formatValue(value)
  }

  if (!fieldsCache) {
    fieldsCache = new WeakMap()
    formatCache.set(data, fieldsCache)
  }
  fieldsCache.set(fields, result)
  return result
}

// 优化值格式化
function formatValue(value: any): any {
  if (typeof value === 'string' && value !== '' && !isNaN(Number(value))) {
    return Number(value)
  }

  if (Array.isArray(value)) {
    return value.map(formatValue)
  }

  return value
}

// 处理表单提交数据
export function formatSubmitData(data: Record<string, any>, fields: FormField[]) {
  const fieldMap = buildFieldMap(fields)
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(data)) {
    const field = fieldMap.get(key)
    result[key] = field?.transform?.output ? field.transform.output(value) : value
  }
  return result
}

// 处理数字值
export function formatNumberValue(
  value: string | number,
  options?: {
    min?: number
    max?: number
    precision?: number
    step?: number
  }
) {
  if (!options) return value

  const { min, max, precision = 0 } = options
  let numValue = Number(value)

  if (isNaN(numValue)) return ''

  if (min !== undefined) numValue = Math.max(min, numValue)
  if (max !== undefined) numValue = Math.min(max, numValue)
  if (precision >= 0) {
    numValue = Number(numValue.toFixed(precision))
  }

  return numValue
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      fn(...args)
      lastCall = now
    }
  }
}

// 批量更新
export function batchUpdate(callback: () => void) {
  Promise.resolve().then(callback)
}
