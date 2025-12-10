import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { ColumnDef, ColumnOrderState, OnChangeFn, Table as ReactTable, Row, RowSelectionState, SortingState, VisibilityState } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import { ComponentType, Dispatch, SetStateAction } from 'react';
import { TableRowVariantProps } from './table.cva';
export type BulkSelectionActionsComponent<T> = ComponentType<{
    table: ReactTable<T>;
}>;
export interface TableWrapperProps<T> extends Omit<TableProps<T>, "columns"> {
}
export interface TableProps<T> extends TableRowVariantProps {
    items: T[];
    columns: ((t: TFunction) => ColumnDef<T>[]) | ColumnDef<T>[];
    showCellBorder?: boolean;
    onRowClick?: (row: T) => void;
    onDoubleClick?: (row: T) => void;
    className?: string;
    sorting?: SortingState;
    setSorting?: Dispatch<SetStateAction<SortingState>>;
    columnOrder?: ColumnOrderState;
    setColumnOrder?: Dispatch<SetStateAction<ColumnOrderState>>;
    columnVisibility?: VisibilityState;
    setColumnVisibility?: Dispatch<SetStateAction<VisibilityState>>;
    bulkSelectionActions?: BulkSelectionActionsComponent<T>;
    enableDragDrop?: boolean;
    onDragEnd?: (event: DragEndEvent) => void;
    onReorder?: (reorderedItems: T[]) => void;
    getRowId?: (row: T) => UniqueIdentifier;
    enableRowSelection?: boolean | ((row: Row<T>) => boolean);
    enableMultiRowSelection?: boolean | ((row: Row<T>) => boolean);
    defaultSelectedRows?: RowSelectionState;
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
}
export declare const RowDragHandleCell: ({ rowId }: {
    rowId: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const Table: <T>({ items, showCellBorder, columns, onRowClick, onDoubleClick, className, sorting, setSorting, columnOrder, setColumnOrder, columnVisibility, setColumnVisibility, bulkSelectionActions: ActionHeader, enableDragDrop, onDragEnd, onReorder, getRowId, enableRowSelection, enableMultiRowSelection, defaultSelectedRows, onRowSelectionChange, ...props }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
