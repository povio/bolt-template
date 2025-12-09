import { Ref } from 'react';
import { AriaTimeFieldProps, TimeValue } from 'react-aria';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../../FormField/FormField';
import { ControlProps } from '../../shared/form.types';
import { InputVariantProps } from '../../shared/input.cva';
interface TimePickerBaseProps extends FormFieldProps, InputVariantProps, Omit<AriaTimeFieldProps<TimeValue>, "label"> {
    ref?: Ref<HTMLDivElement>;
    disableDropdown?: boolean;
    date?: string | null;
    isClearable?: boolean;
}
export interface TimePickerProps extends Omit<TimePickerBaseProps, "value" | "onChange"> {
    value?: string | null;
    onChange?: (value: string | null) => void;
    fullIso?: boolean;
}
export type ControlledTimePickerProps<TFieldValues extends FieldValues> = ControlProps<TimePickerProps, TFieldValues>;
export declare const TimePicker: <TFieldValues extends FieldValues>(props: ControlledTimePickerProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
