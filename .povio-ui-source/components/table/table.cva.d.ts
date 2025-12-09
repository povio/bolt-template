import { VariantProps } from 'class-variance-authority';
export declare const tableRow: (props?: ({
    alternatingBackground?: "even" | "odd" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TableRowVariantProps extends VariantProps<typeof tableRow> {
}
export declare const tableHeadRow: (props?: import('class-variance-authority/types').ClassProp | undefined) => string;
export interface TableHeadRowVariantProps extends VariantProps<typeof tableHeadRow> {
}
export declare const tableHeadData: (props?: ({
    hasRightBorder?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TableHeadDataVariantProps extends VariantProps<typeof tableHeadData> {
}
export declare const tableData: (props?: ({
    hasRightBorder?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TableDataVariantProps extends VariantProps<typeof tableData> {
}
