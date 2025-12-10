import { PaginationListProps } from './PaginationList';
export interface PaginationProps extends Omit<PaginationListProps, "totalPages"> {
    totalItems: number;
    pageSize: number;
    totalPages?: number;
    className?: string;
    onPageSizeChange?: (pageSize: number) => void;
}
export declare const Pagination: ({ size, variant, color, page, totalItems, totalPages, pageSize, hideText, hideFirstLast, hidePrevNext, hideNumbers, className, onPageChange, onPageSizeChange, }: PaginationProps) => import("react/jsx-runtime").JSX.Element;
