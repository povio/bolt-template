import { FileTriggerProps } from 'react-aria-components';
import { FileUploadBaseProps, FileUploadState } from '../fileUpload.types';
type FileUploadContentFilledProps = Pick<FileUploadBaseProps, "variant" | "as" | "isDisabled" | "emptyText" | "browseText"> & {
    state: FileUploadState;
    fileTriggerProps?: FileTriggerProps;
    removeWithIcon?: boolean;
    singleFile?: boolean;
    onRemove: (id: string) => void;
};
export declare const FileUploadContentFilled: ({ variant, as, isDisabled, state, browseText, fileTriggerProps, removeWithIcon, singleFile, onRemove, }: FileUploadContentFilledProps) => import("react/jsx-runtime").JSX.Element;
export {};
