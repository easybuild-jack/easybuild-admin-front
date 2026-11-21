'use client'

import { useState, useEffect, useCallback, useRef, useMemo, memo } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronsUpDown, X, Search, ChevronRight, Loader2 } from "lucide-react"
import { getCategoryDropdownList } from "@/api/category"
import type { CategoryCascaderProps, CategoryCascaderValue, CategoryCascaderOption } from "./types"

const EMPTY_VALUE: CategoryCascaderValue = {}

interface CascaderColumnProps {
    options: CategoryCascaderOption[]
    loading: boolean
    selectedId: string | undefined
    keyword: string
    onSearch: (keyword: string) => void
    onSelect: (option: CategoryCascaderOption) => void
    showArrow: boolean
    placeholder: string
}

const CascaderColumn = memo(function CascaderColumn({
    options,
    loading,
    selectedId,
    keyword,
    onSearch,
    onSelect,
    showArrow,
    placeholder
}: CascaderColumnProps) {
    return (
        <div className="flex flex-col w-[160px] border-r last:border-r-0 min-h-[140px] max-h-[280px] overflow-hidden">
            {/* 搜索框 */}
            <div className="flex items-center border-b px-2 shrink-0">
                <Search className="h-3.5 w-3.5 shrink-0 opacity-50" />
                <input
                    value={keyword}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder={placeholder}
                    className="flex h-9 w-full bg-transparent py-2 pl-2 text-sm outline-none placeholder:text-muted-foreground"
                />
            </div>
            {/* 选项列表 */}
            <div className="flex-1 overflow-y-auto scrollbar-custom">
                {loading ? (
                    <div className="flex items-center justify-center h-full py-8">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                ) : options.length === 0 ? (
                    <div className="flex items-center justify-center h-full py-8 text-sm text-muted-foreground">
                        暂无数据
                    </div>
                ) : (
                    <div className="p-1">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={cn(
                                    "flex items-center justify-between px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-accent",
                                    selectedId === option.value && "bg-accent"
                                )}
                                onClick={() => onSelect(option)}
                            >
                                <span className="truncate">{option.label}</span>
                                {showArrow && (
                                    <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
})

export function CategoryCascader({
    value = EMPTY_VALUE,
    onChange,
    groupId,
    placeholder = "选择分类...",
    className,
    disabled = false,
    maxLevel = 3,
    width = "240px"
}: CategoryCascaderProps) {
    const [open, setOpen] = useState(false)
    const [tempValue, setTempValue] = useState<CategoryCascaderValue>(EMPTY_VALUE)
    const tempValueRef = useRef(tempValue)
    tempValueRef.current = tempValue
    const valueRef = useRef(value)
    valueRef.current = value

    // 各级分类选项
    const [firstOptions, setFirstOptions] = useState<CategoryCascaderOption[]>([])
    const [secondOptions, setSecondOptions] = useState<CategoryCascaderOption[]>([])
    const [thirdOptions, setThirdOptions] = useState<CategoryCascaderOption[]>([])

    // 各级搜索关键词
    const [firstKeyword, setFirstKeyword] = useState("")
    const [secondKeyword, setSecondKeyword] = useState("")
    const [thirdKeyword, setThirdKeyword] = useState("")

    // 各级加载状态
    const [firstLoading, setFirstLoading] = useState(false)
    const [secondLoading, setSecondLoading] = useState(false)
    const [thirdLoading, setThirdLoading] = useState(false)

    // 防抖定时器与竞态控制
    const firstDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const secondDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const thirdDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const requestIdsRef = useRef({ first: 0, second: 0, third: 0 })

    // 组件卸载时清理所有防抖定时器
    useEffect(() => {
        return () => {
            if (firstDebounceRef.current) clearTimeout(firstDebounceRef.current)
            if (secondDebounceRef.current) clearTimeout(secondDebounceRef.current)
            if (thirdDebounceRef.current) clearTimeout(thirdDebounceRef.current)
        }
    }, [])

    // 加载一级分类
    const loadFirstLevel = useCallback(async (keyword?: string) => {
        const reqId = ++requestIdsRef.current.first
        setFirstLoading(true)
        try {
            const options = await getCategoryDropdownList({
                level: 1,
                groupId,
                categoryName: keyword || undefined
            })
            if (reqId === requestIdsRef.current.first) {
                setFirstOptions(options)
            }
        } catch (error) {
            console.error('Failed to load first level categories:', error)
        } finally {
            if (reqId === requestIdsRef.current.first) {
                setFirstLoading(false)
            }
        }
    }, [groupId])

    // 加载二级分类
    const loadSecondLevel = useCallback(async (parentId: string, keyword?: string) => {
        if (!parentId) {
            setSecondOptions([])
            return
        }
        const reqId = ++requestIdsRef.current.second
        setSecondLoading(true)
        try {
            const options = await getCategoryDropdownList({
                level: 2,
                parentId,
                groupId,
                categoryName: keyword || undefined
            })
            if (reqId === requestIdsRef.current.second) {
                setSecondOptions(options)
            }
        } catch (error) {
            console.error('Failed to load second level categories:', error)
        } finally {
            if (reqId === requestIdsRef.current.second) {
                setSecondLoading(false)
            }
        }
    }, [groupId])

    // 加载三级分类
    const loadThirdLevel = useCallback(async (parentId: string, keyword?: string) => {
        if (!parentId) {
            setThirdOptions([])
            return
        }
        const reqId = ++requestIdsRef.current.third
        setThirdLoading(true)
        try {
            const options = await getCategoryDropdownList({
                level: 3,
                parentId,
                groupId,
                categoryName: keyword || undefined
            })
            if (reqId === requestIdsRef.current.third) {
                setThirdOptions(options)
            }
        } catch (error) {
            console.error('Failed to load third level categories:', error)
        } finally {
            if (reqId === requestIdsRef.current.third) {
                setThirdLoading(false)
            }
        }
    }, [groupId])

    // 初始化加载一级分类
    useEffect(() => {
        loadFirstLevel()
    }, [loadFirstLevel])

    // 当外部 value 变化时，回显加载二级、三级
    useEffect(() => {
        if (value.firstCategoryId) {
            loadSecondLevel(value.firstCategoryId)
        }
    }, [value.firstCategoryId, loadSecondLevel])

    useEffect(() => {
        if (value.secondCategoryId) {
            loadThirdLevel(value.secondCategoryId)
        }
    }, [value.secondCategoryId, loadThirdLevel])

    // 仅在弹窗打开瞬间同步临时值，避免父组件重渲染导致临时选择和搜索词被重置
    useEffect(() => {
        if (open) {
            setTempValue(valueRef.current)
            setFirstKeyword("")
            setSecondKeyword("")
            setThirdKeyword("")
        }
    }, [open])

    // 一级搜索防抖
    const handleFirstSearch = useCallback((keyword: string) => {
        setFirstKeyword(keyword)
        if (firstDebounceRef.current) clearTimeout(firstDebounceRef.current)
        firstDebounceRef.current = setTimeout(() => {
            loadFirstLevel(keyword)
        }, 500)
    }, [loadFirstLevel])

    // 二级搜索防抖
    const handleSecondSearch = useCallback((keyword: string) => {
        setSecondKeyword(keyword)
        if (secondDebounceRef.current) clearTimeout(secondDebounceRef.current)
        secondDebounceRef.current = setTimeout(() => {
            const parentId = tempValueRef.current.firstCategoryId
            if (parentId) {
                loadSecondLevel(parentId, keyword)
            }
        }, 500)
    }, [loadSecondLevel])

    // 三级搜索防抖
    const handleThirdSearch = useCallback((keyword: string) => {
        setThirdKeyword(keyword)
        if (thirdDebounceRef.current) clearTimeout(thirdDebounceRef.current)
        thirdDebounceRef.current = setTimeout(() => {
            const parentId = tempValueRef.current.secondCategoryId
            if (parentId) {
                loadThirdLevel(parentId, keyword)
            }
        }, 500)
    }, [loadThirdLevel])

    // 选择一级分类
    const handleFirstSelect = useCallback((option: CategoryCascaderOption) => {
        const updates: CategoryCascaderValue = {
            firstCategoryId: option.value,
            firstCategoryName: option.label,
            secondCategoryId: '',
            secondCategoryName: '',
            thirdCategoryId: '',
            thirdCategoryName: ''
        }
        setTempValue(updates)
        setSecondOptions([])
        setThirdOptions([])
        setSecondKeyword("")
        setThirdKeyword("")

        if (maxLevel >= 2) {
            loadSecondLevel(option.value)
        }

        if (maxLevel === 1) {
            onChange?.(updates)
            setOpen(false)
        }
    }, [maxLevel, loadSecondLevel, onChange])

    // 选择二级分类
    const handleSecondSelect = useCallback((option: CategoryCascaderOption) => {
        const updates: CategoryCascaderValue = {
            ...tempValueRef.current,
            secondCategoryId: option.value,
            secondCategoryName: option.label,
            thirdCategoryId: '',
            thirdCategoryName: ''
        }
        setTempValue(updates)
        setThirdOptions([])
        setThirdKeyword("")

        if (maxLevel >= 3) {
            loadThirdLevel(option.value)
        }

        if (maxLevel === 2) {
            onChange?.(updates)
            setOpen(false)
        }
    }, [maxLevel, loadThirdLevel, onChange])

    // 选择三级分类（直接确认）
    const handleThirdSelect = useCallback((option: CategoryCascaderOption) => {
        const updates: CategoryCascaderValue = {
            ...tempValueRef.current,
            thirdCategoryId: option.value,
            thirdCategoryName: option.label
        }
        onChange?.(updates)
        setOpen(false)
    }, [onChange])

    // 清除选择
    const handleClear = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        const clearedValue: CategoryCascaderValue = {
            firstCategoryId: '',
            firstCategoryName: '',
            secondCategoryId: '',
            secondCategoryName: '',
            thirdCategoryId: '',
            thirdCategoryName: ''
        }
        onChange?.(clearedValue)
        setTempValue(clearedValue)
        setSecondOptions([])
        setThirdOptions([])
    }, [onChange])

    // 获取显示文本（完整路径）
    const displayText = useMemo(() => {
        const parts: string[] = []
        if (value.firstCategoryName) parts.push(value.firstCategoryName)
        if (value.secondCategoryName) parts.push(value.secondCategoryName)
        if (value.thirdCategoryName) parts.push(value.thirdCategoryName)
        return parts.join(' / ')
    }, [value.firstCategoryName, value.secondCategoryName, value.thirdCategoryName])

    const buttonStyle = useMemo(() => ({ width }), [width])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        "flex h-[40px] rounded-md border border-input bg-transparent text-sm transition-colors",
                        "placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "justify-between items-center px-3",
                        className
                    )}
                    style={buttonStyle}
                >
                    <span className={cn("truncate", !displayText && "text-muted-foreground")}>
                        {displayText || placeholder}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                        {displayText && !disabled && (
                            <span
                                className="h-4 w-4 rounded-sm opacity-70 hover:opacity-100 flex items-center justify-center"
                                onClick={handleClear}
                            >
                                <X className="h-3.5 w-3.5" />
                            </span>
                        )}
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0 w-auto"
                align="start"
            >
                <div className="flex">
                    {/* 一级分类列 */}
                    <CascaderColumn
                        options={firstOptions}
                        loading={firstLoading}
                        selectedId={tempValue.firstCategoryId}
                        keyword={firstKeyword}
                        onSearch={handleFirstSearch}
                        onSelect={handleFirstSelect}
                        showArrow={maxLevel >= 2}
                        placeholder="搜索一级"
                    />

                    {/* 二级分类列 */}
                    {maxLevel >= 2 && tempValue.firstCategoryId && (
                        <CascaderColumn
                            options={secondOptions}
                            loading={secondLoading}
                            selectedId={tempValue.secondCategoryId}
                            keyword={secondKeyword}
                            onSearch={handleSecondSearch}
                            onSelect={handleSecondSelect}
                            showArrow={maxLevel >= 3}
                            placeholder="搜索二级"
                        />
                    )}

                    {/* 三级分类列 */}
                    {maxLevel >= 3 && tempValue.secondCategoryId && (
                        <CascaderColumn
                            options={thirdOptions}
                            loading={thirdLoading}
                            selectedId={tempValue.thirdCategoryId}
                            keyword={thirdKeyword}
                            onSearch={handleThirdSearch}
                            onSelect={handleThirdSelect}
                            showArrow={false}
                            placeholder="搜索三级"
                        />
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
