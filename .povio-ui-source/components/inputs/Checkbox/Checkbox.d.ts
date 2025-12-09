import { ComponentType, ReactElement, Ref, SVGProps } from 'react';
import { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { CheckboxVariantProps } from './checkbox.cva';
import { FormFieldErrorProps } from '../FormField/FormFieldError';
import { ControlProps } from '../shared/form.types';
interface CheckboxBaseProps extends FormFieldErrorProps, CheckboxVariantProps, Omit<AriaCheckboxProps, "className"> {
    ref?: Ref<HTMLLabelElement>;
    children: string | ReactElement;
    hideLabel?: boolean;
    selectedIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    indeterminateIcon?: ComponentType<SVGProps<SVGSVGElement>>;
}
export type CheckboxProps = CheckboxBaseProps;
export type ControlledCheckboxProps<TFieldValues extends FieldValues> = ControlProps<CheckboxProps, TFieldValues, "isSelected">;
export declare const Checkbox: <TFieldValues extends FieldValues>(props: ControlledCheckboxProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
export {};
