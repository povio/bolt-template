import { VariantProps } from 'class-variance-authority';
export declare const tooltipCva: (props?: ({
    color?: "default" | "error" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TooltipVariantProps extends VariantProps<typeof tooltipCva> {
}
export declare const tooltipPointerHorizontalCva: (props?: ({
    color?: "default" | "error" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TooltipPointerHorizontalVariantProps extends VariantProps<typeof tooltipPointerHorizontalCva> {
}
export declare const tooltipPointerVerticalCva: (props?: ({
    color?: "default" | "error" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TooltipPointerVerticalVariantProps extends VariantProps<typeof tooltipPointerVerticalCva> {
}
export declare const tooltipTextCva: (props?: ({
    color?: "default" | "error" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TooltipTextVariantProps extends VariantProps<typeof tooltipTextCva> {
}
