import { CalendarDate, DateValue } from '@internationalized/date';
import { Ref } from 'react';
import { FieldValues } from 'react-hook-form';
import { DatePickerStateOptions } from 'react-stately';
import { FormFieldProps } from '../../FormField/FormField';
import { ControlProps } from '../../shared/form.types';
import { InputVariantProps } from '../../shared/input.cva';
interface DatePickerBaseProps extends FormFieldProps, InputVariantProps, Omit<DatePickerStateOptions<CalendarDate>, "granularity" | "shouldCloseOnSelect" | "label"> {
    ref?: Ref<HTMLDivElement>;
    disableDropdown?: boolean;
    isClearable?: boolean;
    className?: string;
    todayIcon?: boolean;
}
export interface DatePickerProps extends Omit<DatePickerBaseProps, "value" | "onChange" | "minValue" | "maxValue"> {
    value?: string | null;
    onChange?: (value: string | null) => void;
    fullIso?: boolean;
    minValue?: DateValue | string;
    maxValue?: DateValue | string;
}
export type ControlledDatePickerProps<TFieldValues extends FieldValues> = ControlProps<DatePickerProps, TFieldValues>;
export declare const DatePicker: <TFieldValues extends FieldValues>({ fullIso, minValue, maxValue, ...props }: ControlledDatePickerProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
