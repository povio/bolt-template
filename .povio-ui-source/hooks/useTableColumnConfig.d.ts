import { ColumnDef, ColumnOrderState, VisibilityState } from '@tanstack/react-table';
interface UseTableColumnConfigOptions {
    visibleColumns?: VisibilityState;
    columnOrder?: ColumnOrderState;
    onVisibilityChange?: (value: VisibilityState) => void;
    onOrderChange?: (value: ColumnOrderState) => void;
}
export declare function useTableColumnConfig<TData, TValue>(defaultColumns: ColumnDef<TData, TValue>[], options?: UseTableColumnConfigOptions): {
    configColumns: ColumnDef<TData, TValue>[];
    columns: ColumnDef<TData, TValue>[];
    visibleColumns: VisibilityState;
    columnOrder: ColumnOrderState;
    onVisibilityChange: (value: VisibilityState) => void;
    onOrderChange: (value: ColumnOrderState) => void;
};
export {};
