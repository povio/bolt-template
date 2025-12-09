import { VariantProps } from 'class-variance-authority';
export declare const link: (props?: ({
    variant?: "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface LinkVariantProps extends VariantProps<typeof link> {
}
