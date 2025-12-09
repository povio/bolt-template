import { Ref } from 'react';
import { DropZoneProps, FileTriggerProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../FormField/FormField';
import { ControlProps } from '../shared/form.types';
import { InputUploadButtonProps } from './shared/inputUploadButton.cva';
export interface SingleFileUploadProps {
    allowsMultiple?: false;
    value?: File | null;
    onChange?: (file: File | null) => void;
    defaultValue?: File | null;
}
export interface MultipleFileUploadProps {
    allowsMultiple: true;
    value?: File[];
    onChange?: (files: File[]) => void;
    defaultValue?: File[];
}
export type GroupedFileUploadProps = MultipleFileUploadProps | SingleFileUploadProps;
export type GroupedFileUploadControlProps<TFieldValues extends FieldValues> = ({
    allowsMultiple: true;
} & ControlProps<MultipleFileUploadProps, TFieldValues>) | ({
    allowsMultiple?: false;
} & ControlProps<SingleFileUploadProps, TFieldValues>);
export type InputUploadBaseProps = {
    ref?: Ref<HTMLElement>;
    label?: string;
    className?: string;
} & FormFieldProps & InputUploadButtonProps & Omit<FileTriggerProps, "children" | "onSelect" | "allowsMultiple"> & Omit<DropZoneProps, "children" | "onDrop"> & GroupedFileUploadProps;
export type InputUploadProps<TFieldValues extends FieldValues = FieldValues> = InputUploadBaseProps & GroupedFileUploadControlProps<TFieldValues>;
