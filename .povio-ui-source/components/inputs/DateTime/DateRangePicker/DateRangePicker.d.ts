import { CalendarDate } from '@internationalized/date';
import { Ref } from 'react';
import { DateValue } from 'react-aria';
import { FieldValues } from 'react-hook-form';
import { DateRangePickerStateOptions } from 'react-stately';
import { FormFieldProps } from '../../FormField/FormField';
import { ControlProps } from '../../shared/form.types';
import { InputVariantProps } from '../../shared/input.cva';
interface DateRangePickerBaseProps extends FormFieldProps, InputVariantProps, Omit<DateRangePickerStateOptions<CalendarDate>, "granularity" | "shouldCloseOnSelect" | "label"> {
    ref?: Ref<HTMLDivElement>;
    disableDropdown?: boolean;
    isClearable?: boolean;
    hideSidebar?: boolean;
    className?: string;
    todayIcon?: boolean;
}
export interface DateRangePickerProps extends Omit<DateRangePickerBaseProps, "value" | "onChange" | "minValue" | "maxValue"> {
    value?: {
        start: string | null;
        end: string | null;
    } | null;
    onChange?: (value: {
        start: string | null;
        end: string | null;
    } | null) => void;
    fullIso?: boolean;
    minValue?: DateValue | string;
    maxValue?: DateValue | string;
}
export type ControlledDateRangePickerProps<TFieldValues extends FieldValues> = ControlProps<DateRangePickerProps, TFieldValues>;
export declare const DateRangePicker: <TFieldValues extends FieldValues>({ fullIso, minValue, maxValue, ...props }: ControlledDateRangePickerProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
