import { Ref } from 'react';
import { SliderProps as AriaSliderProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../FormField/FormField';
import { ControlProps } from '../shared/form.types';
type SliderValue<IsRange extends boolean = false> = IsRange extends false ? number : number[];
interface SliderBaseProps<IsRange extends boolean = false> extends FormFieldProps, Omit<AriaSliderProps, "value" | "defaultValue" | "onChange" | "className"> {
    ref?: Ref<HTMLDivElement>;
    unit?: string;
    isRange?: IsRange;
    defaultValue?: SliderValue<IsRange>;
    value?: SliderValue<IsRange>;
    onChange?: (value: SliderValue<IsRange>) => void;
}
export type SliderProps<IsRange extends boolean = false> = SliderBaseProps<IsRange>;
export type ControlledSliderProps<TFieldValues extends FieldValues, IsRange extends boolean = false> = ControlProps<SliderProps<IsRange>, TFieldValues>;
export declare const Slider: <TFieldValues extends FieldValues, IsRange extends boolean = false>(props: ControlledSliderProps<TFieldValues, IsRange>) => import("react/jsx-runtime").JSX.Element;
export {};
