import { SortingState } from '@tanstack/react-table';
export declare function useSorting(defaultSorting?: SortingState, prefix?: string): {
    sorting: SortingState;
    setSorting: import('react').Dispatch<import('react').SetStateAction<SortingState>>;
    order: string;
};
