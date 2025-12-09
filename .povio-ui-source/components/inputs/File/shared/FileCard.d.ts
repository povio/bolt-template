import { FileUploadProps, FileUploadState } from '../FileUpload';
interface FileCardProps extends Pick<FileUploadProps, "as" | "isDisabled"> {
    index: number;
    state: FileUploadState;
    onRemove?: (id: string) => void;
    onCancel?: (index: number) => void;
}
export declare const FileCard: ({ index, as, state, onRemove, isDisabled, onCancel }: FileCardProps) => import("react/jsx-runtime").JSX.Element;
export {};
