'use client'

import React, { useMemo, useRef, useEffect, useCallback, memo } from 'react'
import type { CSSProperties } from 'react'
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination } from "@/components/ui/pagination"
import type { TableProps, TableColumn, TableSelection } from "./custom-table.types"
import { DEFAULT_HEIGHTS, TABLE_STYLES } from "./table-config"
import type { BorderType } from "./table-config"
import type { CheckedState } from "@radix-ui/react-checkbox"

interface ColumnMeta<T> {
    column: TableColumn<T>
    colStyle: CSSProperties
    headerStyle: CSSProperties
    cellStyle?: CSSProperties
    headerAlignClass: string
    cellAlignClass: string
    contentJustifyClass: string
    fixedClass: string
    headerFixedClass: string
    isLastLeftFixed: boolean
    isFirstRightFixed: boolean
}

const CHECKBOX_COL_STYLE: CSSProperties = {
    width: TABLE_STYLES.CHECKBOX_WIDTH,
    minWidth: TABLE_STYLES.CHECKBOX_WIDTH,
    maxWidth: TABLE_STYLES.CHECKBOX_WIDTH,
}

const FIXED_LEFT_SHADOW_CLASS =
    "group-data-[scroll-left=true]/table-scroll:shadow-[4px_0_8px_-4px_rgba(0,0,0,0.14)] dark:group-data-[scroll-left=true]/table-scroll:shadow-[4px_0_10px_-4px_rgba(0,0,0,0.45)]"

const FIXED_RIGHT_SHADOW_CLASS =
    "group-data-[scroll-right=true]/table-scroll:shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.14)] dark:group-data-[scroll-right=true]/table-scroll:shadow-[-4px_0_10px_-4px_rgba(0,0,0,0.45)]"

const TABLE_BODY_BG =
    "bg-background dark:bg-[color-mix(in_srgb,white_3%,hsl(var(--background)))]"

const FIXED_BODY_CELL_BASE =
"sticky z-10 bg-background dark:bg-[color-mix(in_srgb,white_3%,hsl(var(--background)))] group-hover:bg-[color-mix(in_srgb,hsl(var(--muted))_50%,hsl(var(--background)))] dark:group-hover:bg-[color-mix(in_srgb,hsl(var(--muted))_50%,color-mix(in_srgb,white_3%,hsl(var(--background))))]"

function parseColumnWidth(width?: number | string): number {
    if (typeof width === 'number') {
        return Number.isFinite(width) ? width : 0
    }
    if (typeof width === 'string') {
        const parsed = parseFloat(width)
        return Number.isFinite(parsed) ? parsed : 0
    }
    return 0
}

function getBorderClass(border: BorderType, isLastRow?: boolean): string {
    if (border === 'none') return ''
    if (border === 'all') return TABLE_STYLES.BORDERS.ALL
    if (border === 'top') return TABLE_STYLES.BORDERS.TOP
    if (border === 'bottom' && !isLastRow) return TABLE_STYLES.BORDERS.BOTTOM
    return ''
}

function getHeightClass(height: number): string {
    if (
        height === DEFAULT_HEIGHTS.HEADER ||
        height === DEFAULT_HEIGHTS.ROW ||
        height === DEFAULT_HEIGHTS.FOOTER
    ) {
        return 'h-16'
    }
    return ''
}

interface TableRowProps<T extends Record<string, any>> {
    record: T
    rowIndex: number
    rowKeyValue: string
    isLastRow: boolean
    columnMeta: ColumnMeta<T>[]
    selection?: TableSelection
    isSelected: boolean
    isSelectionLastLeftFixed: boolean
    border: BorderType
    rowHeightClass: string
    rowHeightStyle?: CSSProperties
    onToggleSelect?: (key: string, checked: CheckedState) => void
    onRowClick?: TableProps<T>['onRowClick']
    onRowDoubleClick?: TableProps<T>['onRowDoubleClick']
    onRowContextMenu?: TableProps<T>['onRowContextMenu']
    onRowMouseEnter?: TableProps<T>['onRowMouseEnter']
    onRowMouseLeave?: TableProps<T>['onRowMouseLeave']
    onCellClick?: TableProps<T>['onCellClick']
}

function TableRowInner<T extends Record<string, any>>({
    record,
    rowIndex,
    rowKeyValue,
    isLastRow,
    columnMeta,
    selection,
    isSelected,
    isSelectionLastLeftFixed,
    border,
    rowHeightClass,
    rowHeightStyle,
    onToggleSelect,
    onRowClick,
    onRowDoubleClick,
    onRowContextMenu,
    onRowMouseEnter,
    onRowMouseLeave,
    onCellClick,
}: TableRowProps<T>) {
    const cellBorderClass = getBorderClass(border, isLastRow)
    const checkboxDisabled = selection?.getCheckboxProps?.(record)?.disabled

    return (
        <tr
            className={cn(
                "group hover:bg-muted/50",
                rowHeightClass
            )}
            onClick={onRowClick ? (e) => onRowClick(record, rowIndex, e) : undefined}
            onDoubleClick={onRowDoubleClick ? (e) => onRowDoubleClick(record, rowIndex, e) : undefined}
            onContextMenu={onRowContextMenu ? (e) => onRowContextMenu(record, rowIndex, e) : undefined}
            onMouseEnter={onRowMouseEnter ? (e) => onRowMouseEnter(record, rowIndex, e) : undefined}
            onMouseLeave={onRowMouseLeave ? (e) => onRowMouseLeave(record, rowIndex, e) : undefined}
            style={rowHeightStyle}
        >
            {selection && (
                <td
                    className={cn(
                        TABLE_STYLES.CELL.CHECKBOX,
                        "align-middle left-0",
                        FIXED_BODY_CELL_BASE,
                        cellBorderClass,
                        isSelectionLastLeftFixed && FIXED_LEFT_SHADOW_CLASS
                    )}
                >
                    <div className="flex justify-center items-center w-full">
                        <Checkbox
                            checked={isSelected}
                            disabled={checkboxDisabled}
                            onCheckedChange={(checked) => onToggleSelect?.(rowKeyValue, checked)}
                        />
                    </div>
                </td>
            )}

            {columnMeta.map((meta) => {
                const { column } = meta
                return (
                    <td
                        key={column.key}
                        className={cn(
                            column.className || "p-4",
                            "align-middle overflow-hidden",
                            meta.cellAlignClass,
                            meta.fixedClass,
                            cellBorderClass
                        )}
                        style={meta.cellStyle}
                        onClick={
                            onCellClick
                                ? (e) => onCellClick((record as any)[column.key], record, column, e)
                                : undefined
                        }
                    >
                        <div className="truncate text-sm flex items-center h-full">
                            <div className={cn("flex items-center w-full", meta.contentJustifyClass)}>
                                {column.render
                                    ? column.render((record as any)[column.key], record, rowIndex)
                                    : (record as any)[column.key]}
                            </div>
                        </div>
                    </td>
                )
            })}
        </tr>
    )
}

const TableRow = memo(TableRowInner) as typeof TableRowInner

const CustomTable = <T extends Record<string, any>>({
    data,
    columns,
    config,
    loading,
    rowKey = 'id',
    className,
    selection,
    pagination,
    border = 'bottom',
    onHeaderClick,
    onRowClick,
    onRowDoubleClick,
    onRowContextMenu,
    onRowMouseEnter,
    onRowMouseLeave,
    onCellClick,
    emptyText,
}: TableProps<T>) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const headerHeight = config?.headerHeight
    const rowHeight = config?.rowHeight
    const footerHeight = config?.footerHeight

    // 行键处理
    const getRowKey = useCallback((record: T, index: number): string => {
        if (typeof rowKey === 'function') {
            return rowKey(record)
        }
        const val = (record as any)[rowKey]
        return val !== undefined && val !== null ? String(val) : String(index)
    }, [rowKey])

    // 单次 O(C) 预计算所有列的宽度、对齐与固定列偏移及样式对象，避免 O(R * C^2) 重复计算
    const {
        columnMeta,
        hasFixedLeft,
        hasFixedRight,
        isSelectionLastLeftFixed,
        tableMinWidthStyle,
    } = useMemo(() => {
        const hasSelection = Boolean(selection)
        const leftOffsets = new Array<number>(columns.length)
        const rightOffsets = new Array<number>(columns.length)

        let leftOffset = hasSelection ? TABLE_STYLES.CHECKBOX_WIDTH : 0
        let lastLeftFixedIndex = -1
        let totalWidth = hasSelection ? TABLE_STYLES.CHECKBOX_WIDTH : 0

        for (let i = 0; i < columns.length; i++) {
            const col = columns[i]
            const w = parseColumnWidth(col.width)
            totalWidth += w
            if (col.fixed === 'left') {
                leftOffsets[i] = leftOffset
                leftOffset += w
                lastLeftFixedIndex = i
            }
        }

        let rightOffset = 0
        let firstRightFixedIndex = -1
        for (let i = columns.length - 1; i >= 0; i--) {
            const col = columns[i]
            if (col.fixed === 'right') {
                rightOffsets[i] = rightOffset
                rightOffset += parseColumnWidth(col.width)
                firstRightFixedIndex = i
            }
        }

        const meta: ColumnMeta<T>[] = columns.map((column, index) => {
            const colStyle: CSSProperties = {
                width: column.width,
                minWidth: column.width,
                maxWidth: column.width,
            }

            const isLastLeftFixed = column.fixed === 'left' && index === lastLeftFixedIndex
            const isFirstRightFixed = column.fixed === 'right' && index === firstRightFixedIndex

            let cellStyle: CSSProperties | undefined
            let fixedClass = ''
            let headerFixedClass = 'sticky top-0 bg-sidebar z-20'

            if (column.fixed === 'left') {
                cellStyle = { left: leftOffsets[index] }
                fixedClass = cn(FIXED_BODY_CELL_BASE, isLastLeftFixed && FIXED_LEFT_SHADOW_CLASS)
                headerFixedClass = cn('sticky top-0 bg-sidebar z-30', isLastLeftFixed && FIXED_LEFT_SHADOW_CLASS)
            } else if (column.fixed === 'right') {
                cellStyle = { right: rightOffsets[index] }
                fixedClass = cn(FIXED_BODY_CELL_BASE, isFirstRightFixed && FIXED_RIGHT_SHADOW_CLASS)
                headerFixedClass = cn('sticky top-0 bg-sidebar z-30', isFirstRightFixed && FIXED_RIGHT_SHADOW_CLASS)
            }

            const headerStyle: CSSProperties = cellStyle ? { ...colStyle, ...cellStyle } : colStyle

            const alignClass =
                index === 0
                    ? 'text-left'
                    : column.align === 'center'
                        ? 'text-center'
                        : column.align === 'right'
                            ? 'text-right'
                            : ''

            const contentJustifyClass =
                index === 0
                    ? 'justify-start'
                    : column.align === 'center'
                        ? 'justify-center'
                        : column.align === 'right'
                            ? 'justify-end'
                            : 'justify-start'

            return {
                column,
                colStyle,
                headerStyle,
                cellStyle,
                headerAlignClass: alignClass,
                cellAlignClass: alignClass,
                contentJustifyClass,
                fixedClass,
                headerFixedClass,
                isLastLeftFixed,
                isFirstRightFixed,
            }
        })

        return {
            columnMeta: meta,
            hasFixedLeft: hasSelection || lastLeftFixedIndex !== -1,
            hasFixedRight: firstRightFixedIndex !== -1,
            isSelectionLastLeftFixed: hasSelection && lastLeftFixedIndex === -1,
            tableMinWidthStyle: totalWidth > 0 ? { minWidth: totalWidth } as CSSProperties : undefined,
        }
    }, [columns, selection])

    // 零 React 重渲染的横向滚动边缘检测（用于固定列阴影，rAF 节流 + passive 监听）
    useEffect(() => {
        if (!hasFixedLeft && !hasFixedRight) return
        const el = scrollContainerRef.current
        if (!el) return

        let rafId: number | null = null
        let prevLeft = ''
        let prevRight = ''

        const syncScrollState = () => {
            rafId = null
            const maxScrollLeft = el.scrollWidth - el.clientWidth
            const nextLeft = maxScrollLeft > 1 && el.scrollLeft > 1 ? 'true' : 'false'
            const nextRight = maxScrollLeft > 1 && el.scrollLeft < maxScrollLeft - 1 ? 'true' : 'false'

            if (nextLeft !== prevLeft) {
                prevLeft = nextLeft
                el.dataset.scrollLeft = nextLeft
            }
            if (nextRight !== prevRight) {
                prevRight = nextRight
                el.dataset.scrollRight = nextRight
            }
        }

        const scheduleSync = () => {
            if (rafId === null) {
                rafId = requestAnimationFrame(syncScrollState)
            }
        }

        syncScrollState()
        el.addEventListener('scroll', scheduleSync, { passive: true })

        let resizeObserver: ResizeObserver | undefined
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(scheduleSync)
            resizeObserver.observe(el)
        }

        return () => {
            el.removeEventListener('scroll', scheduleSync)
            resizeObserver?.disconnect()
            if (rafId !== null) {
                cancelAnimationFrame(rafId)
            }
        }
    }, [hasFixedLeft, hasFixedRight, columns.length, data.length])

    // O(1) 选中行查找集合
    const selectedKeySet = useMemo(
        () => (selection ? new Set(selection.selectedRowKeys) : null),
        [selection]
    )

    const selectionRef = useRef(selection)
    selectionRef.current = selection

    const handleToggleSelect = useCallback((key: string, checked: CheckedState) => {
        const currentSelection = selectionRef.current
        if (!currentSelection) return
        const newKeys =
            checked === true
                ? [...currentSelection.selectedRowKeys, key]
                : currentSelection.selectedRowKeys.filter((k) => k !== key)
        currentSelection.onChange(newKeys)
    }, [])

    const handleToggleSelectAll = useCallback((checked: CheckedState) => {
        const currentSelection = selectionRef.current
        if (!currentSelection) return
        const newKeys =
            checked === true
                ? data.map((record, index) => getRowKey(record, index))
                : []
        currentSelection.onChange(newKeys)
    }, [data, getRowKey])

    // 预计算样式对象，避免每行/每次渲染重新创建
    const headerBorderClass = getBorderClass(border, false)
    const headerHeightClass = !headerHeight ? getHeightClass(DEFAULT_HEIGHTS.HEADER) : ''
    const rowHeightClass = !rowHeight ? getHeightClass(DEFAULT_HEIGHTS.ROW) : ''
    const footerHeightClass = !footerHeight ? getHeightClass(DEFAULT_HEIGHTS.FOOTER) : ''

    const headerHeightStyle = useMemo<CSSProperties | undefined>(
        () => (headerHeight ? { height: headerHeight } : undefined),
        [headerHeight]
    )
    const rowHeightStyle = useMemo<CSSProperties | undefined>(
        () => (rowHeight ? { height: rowHeight } : undefined),
        [rowHeight]
    )
    const footerHeightStyle = useMemo<CSSProperties | undefined>(
        () => (footerHeight ? { height: footerHeight } : undefined),
        [footerHeight]
    )

    const allCheckedState: CheckedState = useMemo(() => {
        if (!selection || data.length === 0) return false
        const count = selection.selectedRowKeys.length
        if (count === 0) return false
        if (count < data.length) return "indeterminate"
        return count === data.length
    }, [selection, data.length])

    return (
        <div className={cn(
            "relative w-full h-full flex flex-col overflow-hidden",
            className
        )}>
            <div className="flex-1 relative min-h-0">
                <div
                    ref={scrollContainerRef}
                    data-scroll-left="false"
                    data-scroll-right="false"
                    className="group/table-scroll absolute inset-0 overflow-auto scrollbar-table"
                >
                    <div className="min-w-full inline-block align-middle relative">
                        <table
                            className="w-full border-separate border-spacing-0 text-sm table-fixed"
                            style={tableMinWidthStyle}
                        >
                            {/* 列宽定义 */}
                            <colgroup>
                                {selection && <col style={CHECKBOX_COL_STYLE} />}
                                {columnMeta.map((meta) => (
                                    <col key={meta.column.key} style={meta.colStyle} />
                                ))}
                            </colgroup>

                            {/* 表头 */}
                            <thead>
                                <tr
                                    className={headerHeightClass}
                                    style={headerHeightStyle}
                                >
                                    {/* 选择列表头 */}
                                    {selection && (
                                        <th
                                            className={cn(
                                                TABLE_STYLES.CELL.CHECKBOX,
                                                "h-12 align-middle font-bold text-muted-foreground",
                                                "sticky top-0 left-0 bg-sidebar z-30",
                                                headerBorderClass,
                                                isSelectionLastLeftFixed && FIXED_LEFT_SHADOW_CLASS
                                            )}
                                        >
                                            <div className="flex justify-center items-center w-full">
                                                <Checkbox
                                                    checked={allCheckedState}
                                                    onCheckedChange={handleToggleSelectAll}
                                                />
                                            </div>
                                        </th>
                                    )}

                                    {/* 数据列表头 */}
                                    {columnMeta.map((meta) => {
                                        const { column } = meta
                                        return (
                                            <th
                                                key={column.key}
                                                className={cn(
                                                    "h-12 px-4 align-middle font-bold text-muted-foreground",
                                                    meta.headerAlignClass,
                                                    meta.headerFixedClass,
                                                    headerBorderClass
                                                )}
                                                style={meta.headerStyle}
                                                onClick={onHeaderClick ? (e) => onHeaderClick(column, e) : undefined}
                                            >
                                                <div className={cn("flex items-center h-full", meta.contentJustifyClass)}>
                                                    {column.title}
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>

                            {/* 表体 */}
                                <tbody className={cn("relative", TABLE_BODY_BG)}>
                                    {data.length === 0 && !loading ? (
                                        <tr>
                                            <td
                                                colSpan={selection ? columns.length + 1 : columns.length}
                                                className="h-32 text-center text-muted-foreground"
                                            >
                                                {emptyText || "暂无数据"}
                                            </td>
                                        </tr>
                                    ) : (
                                        data.map((record, index) => {
                                            const key = getRowKey(record, index)
                                            return (
                                                <TableRow
                                                    key={key}
                                                    record={record}
                                                    rowIndex={index}
                                                    rowKeyValue={key}
                                                    isLastRow={index === data.length - 1}
                                                    columnMeta={columnMeta}
                                                    selection={selection}
                                                    isSelected={selectedKeySet ? selectedKeySet.has(key) : false}
                                                    isSelectionLastLeftFixed={isSelectionLastLeftFixed}
                                                    border={border}
                                                    rowHeightClass={rowHeightClass}
                                                    rowHeightStyle={rowHeightStyle}
                                                    onToggleSelect={handleToggleSelect}
                                                    onRowClick={onRowClick}
                                                    onRowDoubleClick={onRowDoubleClick}
                                                    onRowContextMenu={onRowContextMenu}
                                                    onRowMouseEnter={onRowMouseEnter}
                                                    onRowMouseLeave={onRowMouseLeave}
                                                    onCellClick={onCellClick}
                                                />
                                            )
                                        })
                                    )}
                                </tbody>
                        </table>
                    </div>
                </div>

                {/* 加载状态遮罩：固定在可视区域，不随横向/纵向滚动偏移 */}
                {loading && (
                    <div className="absolute inset-0 bg-background/50 z-40 flex items-center justify-center transition-opacity">
                        <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                            <span className="text-xs text-muted-foreground">加载中...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* 分页 */}
            {pagination && (
                <div
                    className={cn(
                        "flex-none px-6 border-t border-border/50",
                        footerHeightClass
                    )}
                    style={footerHeightStyle}
                >
                    <Pagination {...pagination} className="w-full h-full" />
                </div>
            )}
        </div>
    )
}

export default CustomTable
