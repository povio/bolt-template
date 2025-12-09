import { Ref } from 'react';
import { DatePickerAria } from 'react-aria';
import { FormFieldHeaderProps } from '../../FormField/FormFieldHeader';
import { InputVariantProps } from '../../shared/input.cva';
interface DatePickerInputProps extends InputVariantProps {
    ref?: Ref<HTMLDivElement>;
    groupProps: DatePickerAria["groupProps"];
    fieldProps: DatePickerAria["fieldProps"];
    endFieldProps?: DatePickerAria["fieldProps"];
    buttonProps: DatePickerAria["buttonProps"];
    isDisabled?: boolean;
    isInvalid?: boolean;
    disableDropdown?: boolean;
    isDateTime?: boolean;
    isClearable?: boolean;
    headerProps?: FormFieldHeaderProps;
    todayIcon?: boolean;
}
export declare const DatePickerInput: ({ ref, as, groupProps, fieldProps, endFieldProps, buttonProps, isDisabled, isInvalid, disableDropdown, variant, size, isDateTime, isClearable, headerProps, todayIcon, ...props }: DatePickerInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
