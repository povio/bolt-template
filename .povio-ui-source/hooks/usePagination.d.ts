import { PaginationState } from '@tanstack/react-table';
export declare function usePagination(defaultPagination?: PaginationState): {
    pagination: PaginationState;
    setPagination: import('react').Dispatch<import('react').SetStateAction<PaginationState>>;
    pageIndex: number;
    pageSize: number;
};
