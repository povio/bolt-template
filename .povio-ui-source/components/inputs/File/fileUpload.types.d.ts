import { ReactNode, Ref } from 'react';
import { DropZoneProps, FileTriggerProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../FormField/FormField';
import { ControlProps } from '../shared/form.types';
import { ApplicationException, GeneralErrorCodes } from '../../../utils/vendor/error-handling';
export interface FileUploadVariant {
    variant?: "vertical" | "horizontal";
}
export interface SingleFileUploadProps {
    allowsMultiple?: false;
    value?: FileUploadState | null;
    onChange?: (file: File | null) => void;
    defaultValue?: File | null;
}
export interface MultipleFileUploadProps {
    allowsMultiple: true;
    value?: FileUploadState[];
    onChange?: (files: File[]) => void;
    defaultValue?: File[];
}
export type GroupedFileUploadProps = MultipleFileUploadProps | SingleFileUploadProps;
export type GroupedFileUploadControlProps<TFieldValues extends FieldValues> = ({
    allowsMultiple: true;
} & ControlProps<MultipleFileUploadProps, TFieldValues>) | ({
    allowsMultiple?: false;
} & ControlProps<SingleFileUploadProps, TFieldValues>);
export interface FileUploadResponse {
    id: string;
}
export interface FileUploadRequest {
    data: {
        resourceName: string;
        fileName: string;
        fileSize: number;
        method: string;
    };
}
export interface FileUploadCallbacks {
    fileUpload?: (request: FileUploadRequest, file: File, options?: {
        abortController?: AbortController;
        onUploadProgress?: ({ loaded, total }: {
            loaded: number;
            total: number;
        }) => void;
    }) => Promise<FileUploadResponse>;
    fileRemove?: ({ id }: {
        id: string;
    }) => Promise<void>;
}
export type FileUploadError = ApplicationException<GeneralErrorCodes>;
export interface FileUploadState {
    state: "idle" | "uploading" | "uploaded" | "error";
    file: File;
    src?: string;
    id?: string;
    progress?: number;
    error?: FileUploadError;
    abortController?: AbortController;
}
export interface FileUploadContainerChildrenProps {
    files: FileUploadState[];
    onRemove: (id: string) => void;
    onCancel: (index: number) => void;
}
export type FileUploadBaseProps = {
    as?: "button" | "link";
    ref?: Ref<HTMLElement>;
    label?: string;
    className?: string;
    emptyText?: string;
    uploadText?: string;
    browseText?: string;
    value?: FileUploadState[];
    children?: (props: FileUploadContainerChildrenProps) => ReactNode;
    listRenderer?: (props: FileUploadContainerChildrenProps) => ReactNode;
} & FormFieldProps & FileUploadVariant & Omit<FileTriggerProps, "children" | "onSelect" | "allowsMultiple" | "value"> & Omit<DropZoneProps, "children" | "onDrop" | "value"> & GroupedFileUploadProps & FileUploadCallbacks;
export type FileUploadProps<TFieldValues extends FieldValues = FieldValues> = FileUploadBaseProps & GroupedFileUploadControlProps<TFieldValues>;
export type FileUploadContainerProps = (Omit<FileUploadBaseProps, "label" | "hideLabel" | "variant" | "as"> & SingleFileUploadProps) | (Omit<FileUploadBaseProps, "label" | "hideLabel" | "variant" | "as"> & MultipleFileUploadProps);
