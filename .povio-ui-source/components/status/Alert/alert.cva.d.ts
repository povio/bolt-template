import { VariantProps } from 'class-variance-authority';
export declare const alert: (props?: ({
    variant?: "contained" | "outlined" | null | undefined;
    color?: "success" | "warning" | "error" | "neutral" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface AlertVariantProps extends VariantProps<typeof alert> {
}
