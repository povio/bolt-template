import { ReactElement, Ref } from 'react';
import { RadioGroupProps as AriaRadioGroupProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../FormField/FormField';
import { RadioVariantProps } from './radio.cva';
import { ControlProps } from '../shared/form.types';
interface RadioGroupBaseProps extends Omit<FormFieldProps, "variant">, RadioVariantProps, Omit<AriaRadioGroupProps, "className"> {
    ref?: Ref<HTMLDivElement>;
    options: {
        label: string | ReactElement;
        value: string;
    }[];
}
export interface RadioGroupProps extends RadioGroupBaseProps {
}
export type ControlledRadioGroupProps<TFieldValues extends FieldValues> = ControlProps<RadioGroupProps, TFieldValues>;
export declare const RadioGroup: <TFieldValues extends FieldValues>(props: ControlledRadioGroupProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
