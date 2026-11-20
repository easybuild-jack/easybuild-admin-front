import type { ReactNode, CSSProperties } from 'react'
import type { BorderType, HoverType, TableConfig } from './table-config'

// 选择配置接口
export interface TableSelection {
    selectedRowKeys: string[]
    onChange: (selectedRowKeys: string[]) => void
    getCheckboxProps?: (record: any) => { disabled?: boolean }
}

// 列配置接口
// 注意：这里必须是单一对象类型，不能写成 `K extends any ? {...} : never` 的分发联合。
// 分发联合会让每个列对象的 key 收窄成某个字面量，导致 TS 无法对列对象做上下文类型推断，
// render 的 record 参数就会退化为隐式 any（TS7006）。
export type TableColumnKey<T> = Extract<keyof T, string> | 'selection' | 'action' | 'operation' | 'index' | 'expand'

export interface TableColumn<T> {
    key: TableColumnKey<T>                       // 列标识：T 的键，或内置的伪列标识
    title: string                                // 列标题
    width?: number | string                      // 列宽度
    fixed?: 'left' | 'right'                    // 固定列
    align?: 'left' | 'center' | 'right'         // 对齐方式
    className?: string                          // 自定义类名
    // value 为宽松类型：一个列数组里每列的 key 不同，TS 无法为每列单独推断出 value 类型，
    // 若声明为 T[keyof T] 会变成大联合类型，反而让已有的窄类型 render 实现报错。
    // record 保持严格的 T，这是实际使用中最需要类型提示的部分。
    render?: (value: any, record: T, index: number) => ReactNode
    sortable?: boolean                          // 是否可排序
    filterable?: boolean                        // 是否可筛选
}

// 分页配置接口
export interface TablePagination {
    current: number
    total: number
    pageSize?: number
    onChange: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
}

// 表格事件处理接口
export interface TableEvents<T> {
    onRowClick?: (record: T, index: number, event: React.MouseEvent) => void
    onRowDoubleClick?: (record: T, index: number, event: React.MouseEvent) => void
    onRowContextMenu?: (record: T, index: number, event: React.MouseEvent) => void
    onRowMouseEnter?: (record: T, index: number, event: React.MouseEvent) => void
    onRowMouseLeave?: (record: T, index: number, event: React.MouseEvent) => void
    onCellClick?: (value: any, record: T, column: TableColumn<T>, event: React.MouseEvent) => void
    onHeaderClick?: (column: TableColumn<T>, event: React.MouseEvent) => void
}

// 表格属性接口
export interface TableProps<T extends Record<string, any> = Record<string, any>> extends TableEvents<T> {
    data: T[]                     // 数据源
    columns: TableColumn<T>[]     // 列配置
    loading?: boolean             // 加载状态
    rowKey?: string | ((record: T) => string)  // 行键
    scroll?: {                    // 滚动配置
        x?: number | string | boolean
        y?: number | string
    }
    className?: string           // 自定义类名
    style?: CSSProperties       // 自定义样式
    emptyText?: string         // 空状态文本
    selection?: TableSelection  // 选择配置
    bordered?: boolean         // 是否显示外边框，默认 false
    pagination?: TablePagination  // 分页配置
    rowHover?: HoverType         // 行悬停效果
    striped?: boolean            // 是否启用斑马纹
    cellBorder?: boolean         // 单元格边框
    border?: BorderType  // 统一的边框配置，默认 'bottom'
    config?: TableConfig;  // 添加配置参数
    headerActions?: ReactNode; // 新增：表头右侧自定义操作区
}

// 表格头部属性接口
export interface TableHeaderProps<T extends Record<string, any> = Record<string, any>> {
    columns: TableColumn<T>[]
    className?: string
    selection?: TableSelection
    data: T[]                  // 用于全选功能
    rowKey?: string | ((record: T) => string)
}

// 表格内容属性接口
export interface TableBodyProps<T extends Record<string, any> = Record<string, any>> {
    data: T[]
    columns: TableColumn<T>[]
    rowKey?: string | ((record: T) => string)
    className?: string
    selection?: TableSelection
    rowHover?: HoverType
    striped?: boolean
    cellBorder?: boolean
} 