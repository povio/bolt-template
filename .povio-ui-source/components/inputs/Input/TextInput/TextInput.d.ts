import { Ref } from 'react';
import { AriaTextFieldProps } from 'react-aria';
import { InputProps as AriaInputProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../../FormField/FormField';
import { InputContentProps } from '../shared/InputContent';
import { ControlProps } from '../../shared/form.types';
import { InputVariantProps } from '../../shared/input.cva';
type AllowedHTMLInputTypeAttribute = "email" | "hidden" | "tel" | "text" | "url";
interface TextInputBaseProps extends FormFieldProps, InputVariantProps, Omit<InputContentProps, "ref" | "value" | "onChange">, Omit<AriaInputProps, "value" | "defaultValue" | "onChange" | "disabled" | "required" | "type" | "size" | "className" | keyof AriaTextFieldProps>, Omit<AriaTextFieldProps<HTMLInputElement>, "label"> {
    ref?: Ref<HTMLInputElement>;
    inputClassName?: string;
    type?: AllowedHTMLInputTypeAttribute;
    todayIcon?: boolean;
}
export interface TextInputProps extends TextInputBaseProps {
}
export type ControlledTextInputProps<TFieldValues extends FieldValues> = ControlProps<TextInputProps, TFieldValues>;
export declare const TextInput: <TFieldValues extends FieldValues>(props: ControlledTextInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
