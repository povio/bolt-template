import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
export declare const inputUploadButtonBase: (props?: ({
    variant?: "default" | "nested" | null | undefined;
} & ClassProp) | undefined) => string;
export type InputUploadButtonProps = VariantProps<typeof inputUploadButtonBase>;
export declare const inputUploadButton: (props: InputUploadButtonProps & ClassProp) => string;
export declare const inputUploadDropZone: (props?: ({
    variant?: "default" | "nested" | null | undefined;
} & ClassProp) | undefined) => string;
