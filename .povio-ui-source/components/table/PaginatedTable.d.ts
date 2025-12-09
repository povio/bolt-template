import { PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { TableProps } from './Table';
export interface PaginatedTableWrapperProps<T> extends Omit<PaginatedTableProps<T>, "columns"> {
}
export interface PaginatedTableProps<T> extends TableProps<T> {
    totalItems: number;
    pagination: PaginationState;
    setPagination: Dispatch<SetStateAction<PaginationState>>;
}
export declare const PaginatedTable: <T>({ pagination, setPagination, items, totalItems, ...rest }: PaginatedTableProps<T>) => import("react/jsx-runtime").JSX.Element;
