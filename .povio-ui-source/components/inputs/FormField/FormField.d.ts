import { PropsWithChildren, Ref } from 'react';
import { FormFieldErrorProps } from './FormFieldError';
import { FormFieldHeaderProps } from './FormFieldHeader';
import { TextInputProps } from '../Input/TextInput/TextInput';
export interface FormFieldProps extends Omit<FormFieldHeaderProps, "className" | "labelProps">, Omit<FormFieldErrorProps, "className"> {
    hideLabel?: boolean;
    headerClassName?: string;
    errorClassName?: string;
    className?: string;
}
interface FormFieldComponentProps extends PropsWithChildren<FormFieldProps> {
    ref?: Ref<HTMLDivElement>;
    labelProps?: FormFieldHeaderProps["labelProps"];
    as?: TextInputProps["as"];
}
export declare const FormField: ({ ref, as, label, tooltipText, helperText, isRequired, rightContent, isDisabled, error, hideLabel, headerClassName, errorClassName, children, className, labelProps, isHeaderHidden, }: FormFieldComponentProps) => import("react/jsx-runtime").JSX.Element;
export {};
