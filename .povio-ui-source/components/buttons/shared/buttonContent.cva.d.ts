import { VariantProps } from 'class-variance-authority';
export declare const buttonContent: (props?: ({
    iconPosition?: "none" | "left" | "right" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ButtonContentVariantProps extends VariantProps<typeof buttonContent> {
}
