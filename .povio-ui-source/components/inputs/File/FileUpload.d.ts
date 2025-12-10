import { FieldValues } from 'react-hook-form';
import { FileUploadProps } from './fileUpload.types';
export type { FileUploadBaseProps, FileUploadError, FileUploadProps, FileUploadRequest, FileUploadResponse, FileUploadState, } from './fileUpload.types';
export declare const FileUpload: <TFieldValues extends FieldValues = FieldValues>(props: FileUploadProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
