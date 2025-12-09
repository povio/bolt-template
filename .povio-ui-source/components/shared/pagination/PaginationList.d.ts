import { ButtonProps } from '../../buttons/Button/Button';
export interface PaginationListProps {
    page: number;
    totalPages: number;
    hideText?: boolean;
    hideFirstLast?: boolean;
    hidePrevNext?: boolean;
    hideNumbers?: boolean;
    size?: Exclude<ButtonProps["size"], "none">;
    color?: ButtonProps["color"];
    variant?: ButtonProps["variant"];
    className?: string;
    onPageChange?: (page: number) => void;
}
export declare const PaginationList: ({ page, totalPages, size, color, variant, hideText, hideFirstLast, hidePrevNext, hideNumbers, className, onPageChange, }: PaginationListProps) => import("react/jsx-runtime").JSX.Element | null;
