import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
export declare const fileUploadDropZoneBase: (props?: ({
    variant?: "horizontal" | "vertical" | null | undefined;
    isContainer?: boolean | null | undefined;
} & ClassProp) | undefined) => string;
export type FileUploadDropZoneProps = VariantProps<typeof fileUploadDropZoneBase>;
export declare const fileUploadDropZone: (props: FileUploadDropZoneProps & ClassProp) => string;
export declare const fileCardList: (props?: ({
    variant?: "horizontal" | "vertical" | null | undefined;
} & ClassProp) | undefined) => string;
