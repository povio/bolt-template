import { VariantProps } from 'class-variance-authority';
import { ButtonVariantProps } from '../../buttons/Button/button.cva';
export declare const toastContainer: (props?: ({
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "bottom-center" | "top-center" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const toastWrapper: string;
export declare const toast: (props?: ({
    variant?: "contained" | "outlined" | null | undefined;
    color?: "success" | "warning" | "error" | "neutral" | null | undefined;
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "bottom-center" | "top-center" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ToastVariantProps extends VariantProps<typeof toast> {
}
export declare const buttonColorVariant: (props: {
    color?: "success" | "warning" | "error" | "neutral" | null | undefined;
    variant?: "contained" | "outlined" | null | undefined;
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "bottom-center" | "top-center" | null | undefined;
}) => Pick<ButtonVariantProps, "color" | "inverted"> | undefined;
