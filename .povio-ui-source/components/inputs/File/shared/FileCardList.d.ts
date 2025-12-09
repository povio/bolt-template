import { FileUploadProps, FileUploadState } from '../FileUpload';
interface FileCardListProps extends Pick<FileUploadProps, "isDisabled" | "as"> {
    uploadState: FileUploadState[];
    className?: string;
    onRemove?: (id: string) => void;
    onCancel?: (index: number) => void;
}
export declare const FileCardList: ({ uploadState, as, isDisabled, className, onRemove, onCancel }: FileCardListProps) => import("react/jsx-runtime").JSX.Element;
export {};
