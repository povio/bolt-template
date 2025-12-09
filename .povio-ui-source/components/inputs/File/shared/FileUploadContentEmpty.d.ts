import { FileUploadBaseProps } from '../fileUpload.types';
type FileUploadContentEmptyProps = Pick<FileUploadBaseProps, "variant" | "as" | "isDisabled" | "emptyText" | "browseText" | "uploadText"> & {
    title: string;
    singleFile?: boolean;
    hideButton?: boolean;
    className?: string;
};
export declare const FileUploadContentEmpty: ({ variant, as, isDisabled, title, browseText, uploadText, singleFile, hideButton, className, }: FileUploadContentEmptyProps) => import("react/jsx-runtime").JSX.Element;
export {};
