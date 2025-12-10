import { VariantProps } from 'class-variance-authority';
export declare const tag: (props?: ({
    color?: "primary" | "secondary" | "success" | "warning" | "error" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TagVariantProps extends VariantProps<typeof tag> {
}
