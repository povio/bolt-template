import { ColumnDef, ColumnOrderState, VisibilityState } from '@tanstack/react-table';
export interface ColumnConfigModalProps<TData, TValue> {
    isOpen: boolean;
    onClose: () => void;
    configColumns: ColumnDef<TData, TValue>[];
    visibleColumns: VisibilityState;
    onVisibilityChange: (visibleColumns: VisibilityState) => void;
    onOrderChange: (columnOrder: ColumnOrderState) => void;
}
export declare function ColumnConfigModal<TData, TValue>({ isOpen, onClose, configColumns, visibleColumns, onVisibilityChange, onOrderChange, }: ColumnConfigModalProps<TData, TValue>): import("react/jsx-runtime").JSX.Element | null;
