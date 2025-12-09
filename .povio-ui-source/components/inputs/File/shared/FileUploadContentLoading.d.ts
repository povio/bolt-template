import { FileUploadBaseProps, FileUploadState } from '../fileUpload.types';
type FileUploadContentLoadingProps = Pick<FileUploadBaseProps, "variant" | "as" | "isDisabled" | "emptyText" | "browseText"> & {
    index: number;
    state: FileUploadState;
    singleFile?: boolean;
    onCancel: (index: number) => void;
};
export declare const FileUploadContentLoading: ({ index, variant, as, state, isDisabled, singleFile, onCancel, }: FileUploadContentLoadingProps) => import("react/jsx-runtime").JSX.Element;
export {};
