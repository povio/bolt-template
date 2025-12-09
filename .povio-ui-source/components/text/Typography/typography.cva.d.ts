import { VariantProps } from 'class-variance-authority';
export declare const typography: (props?: ({
    size?: "headline-1" | "title-1" | "title-2" | "title-3" | "title-4" | "title-5" | "title-6" | "body-1" | "body-2" | "body-3" | "body-4" | "label-1" | "label-2" | "label-3" | null | undefined;
    sizeMobile?: "headline-1" | "title-1" | "title-2" | "title-3" | "title-4" | "title-5" | "title-6" | "body-1" | "body-2" | "body-3" | "body-4" | "label-1" | "label-2" | "label-3" | null | undefined;
    variant?: "default" | "prominent-1" | "default-italic" | "prominent-1-italic" | "prominent-2" | "prominent-2-italic" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TypographyVariantProps extends VariantProps<typeof typography> {
}
