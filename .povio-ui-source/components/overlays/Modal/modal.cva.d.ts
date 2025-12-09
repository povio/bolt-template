import { VariantProps } from 'class-variance-authority';
export interface ModalVariantProps extends VariantProps<typeof modalContent> {
}
export declare const modalContent: (props?: ({
    aside?: "left" | "right" | "center" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const modalOverlay: (props?: ({
    aside?: "left" | "right" | "center" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const modalMain: (props?: ({
    aside?: "left" | "right" | "center" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
