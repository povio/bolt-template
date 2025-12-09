import { Ref } from 'react';
import { DateValue } from 'react-aria';
import { FieldValues } from 'react-hook-form';
import { DatePickerStateOptions } from 'react-stately';
import { FormFieldProps } from '../../FormField/FormField';
import { ControlProps } from '../../shared/form.types';
import { InputVariantProps } from '../../shared/input.cva';
interface DateTimePickerBaseProps extends FormFieldProps, InputVariantProps, Omit<DatePickerStateOptions<DateValue>, "granularity" | "shouldCloseOnSelect" | "label"> {
    ref?: Ref<HTMLDivElement>;
    disableDropdown?: boolean;
    isTimeOptional?: boolean;
    isClearable?: boolean;
    todayIcon?: boolean;
}
export interface DateTimePickerProps extends Omit<DateTimePickerBaseProps, "value" | "onChange"> {
    value?: string | null;
    onChange?: (value: string | null) => void;
    fullIso?: boolean;
}
export type ControlledDateTimePickerProps<TFieldValues extends FieldValues> = ControlProps<DateTimePickerProps, TFieldValues>;
export declare const DateTimePicker: <TFieldValues extends FieldValues>({ fullIso, ...props }: ControlledDateTimePickerProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
