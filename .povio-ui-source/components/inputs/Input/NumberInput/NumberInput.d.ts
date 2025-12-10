import { Ref } from 'react';
import { NumberFieldProps as AriaNumberFieldProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../../FormField/FormField';
import { InputContentProps } from '../shared/InputContent';
import { ControlProps } from '../../shared/form.types';
import { InputVariantProps } from '../../shared/input.cva';
interface NumberInputBaseProps extends FormFieldProps, InputVariantProps, Omit<InputContentProps, "ref" | "value" | "onChange">, Omit<AriaNumberFieldProps, "value" | "onChange" | "className"> {
    ref?: Ref<HTMLInputElement>;
    placeholder?: string;
    inputClassName?: string;
    value?: number | null;
    onChange?: (value: number | null) => void;
}
export type NumberInputProps = NumberInputBaseProps;
export type ControlledNumberInputProps<TFieldValues extends FieldValues> = ControlProps<NumberInputProps, TFieldValues>;
export declare const NumberInput: <TFieldValues extends FieldValues>(props: ControlledNumberInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
