import { Ref } from 'react';
import { AriaTextFieldProps } from 'react-aria';
import { TextAreaProps as AriaTextAreaProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../../FormField/FormField';
import { ControlProps } from '../../shared/form.types';
import { InputVariantProps } from '../../shared/input.cva';
interface TextAreaBaseProps extends FormFieldProps, InputVariantProps, Omit<AriaTextAreaProps, "value" | "defaultValue" | "onChange" | "disabled" | "required" | "className" | keyof AriaTextFieldProps>, Omit<AriaTextFieldProps<HTMLTextAreaElement>, "label"> {
    ref?: Ref<HTMLTextAreaElement>;
    isClearable?: boolean;
    inputClassName?: string;
}
export interface TextAreaProps extends TextAreaBaseProps {
}
export type ControlledTextAreaProps<TFieldValues extends FieldValues> = ControlProps<TextAreaProps, TFieldValues>;
export declare const TextArea: <TFieldValues extends FieldValues>(props: ControlledTextAreaProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
