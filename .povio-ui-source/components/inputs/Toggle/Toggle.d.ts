import { Ref } from 'react';
import { SwitchProps as AriaSwitchProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { FormFieldErrorProps } from '../FormField/FormFieldError';
import { ControlProps } from '../shared/form.types';
import { ToggleVariantProps } from './toggle.cva';
interface ToggleBaseProps extends FormFieldErrorProps, ToggleVariantProps, Omit<AriaSwitchProps, "className"> {
    ref?: Ref<HTMLLabelElement>;
    children?: string;
}
export type ToggleProps = ToggleBaseProps;
export type ControlledToggleProps<TFieldValues extends FieldValues> = ControlProps<ToggleProps, TFieldValues, "isSelected">;
export declare const Toggle: <TFieldValues extends FieldValues>(props: ControlledToggleProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
