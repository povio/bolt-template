import { FileUploadBaseProps, FileUploadState } from '../fileUpload.types';
type FileUploadContentProps = Omit<FileUploadBaseProps, "ref" | "children" | "emptyText" | "label"> & {
    emptyText: string;
    uploadState: FileUploadState[];
    handleSelect: (inputFiles: FileList | null) => void;
    handleCancelUpload: (index: number) => void;
    handleRemove: (id: string) => void;
};
export declare const FileUploadContent: ({ variant, as, isDisabled, browseText, uploadText, emptyText, uploadState, handleCancelUpload, handleRemove, acceptedFileTypes, allowsMultiple, handleSelect, ...rest }: FileUploadContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
