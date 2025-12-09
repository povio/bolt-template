import { FileTriggerProps } from 'react-aria-components';
import { FileUploadBaseProps, FileUploadState } from '../fileUpload.types';
type FileUploadContentErrorProps = Pick<FileUploadBaseProps, "variant" | "as" | "isDisabled" | "emptyText" | "browseText"> & {
    state: FileUploadState;
    fileTriggerProps?: FileTriggerProps;
    removeWithIcon?: boolean;
    singleFile?: boolean;
    onRemove: (id: string) => void;
};
export declare const FileUploadContentError: ({ variant, as, isDisabled, state, browseText, fileTriggerProps, removeWithIcon, singleFile, onRemove, }: FileUploadContentErrorProps) => import("react/jsx-runtime").JSX.Element;
export {};
