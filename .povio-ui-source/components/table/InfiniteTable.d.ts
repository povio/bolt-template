import { TableProps } from './Table';
export interface InfiniteTableWrapperProps<T> extends Omit<InfiniteTableProps<T>, "columns"> {
}
export interface InfiniteTableProps<T> extends TableProps<T> {
    hasNextPage: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage: () => void;
}
export declare const InfiniteTable: <T>({ hasNextPage, isFetchingNextPage, fetchNextPage, ...rest }: InfiniteTableProps<T>) => import("react/jsx-runtime").JSX.Element;
