import { PropsWithChildren } from 'react';
import { CheckboxProps } from '../components/inputs/Checkbox/Checkbox';
import { DatePickerProps } from '../components/inputs/DateTime/DatePicker/DatePicker';
import { NumberInputProps } from '../components/inputs/Input/NumberInput/NumberInput';
import { TextInputProps } from '../components/inputs/Input/TextInput/TextInput';
import { RadioGroupProps } from '../components/inputs/RadioGroup/RadioGroup';
import { SelectBaseProps } from '../components/inputs/Selection/shared/SelectBase';
import { SliderProps } from '../components/inputs/Slider/Slider';
import { ToggleProps } from '../components/inputs/Toggle/Toggle';
export declare namespace UIConfig {
    type DeepRequired<T> = {
        [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : Exclude<T[P], null | undefined>;
    };
    export interface Options {
        input: Pick<TextInputProps, "variant" | "isClearable" | "hideLabel" | "as" | "size">;
        numberInput: Pick<NumberInputProps, "formatOptions">;
        radioGroup: Pick<RadioGroupProps, "variant" | "hideLabel">;
        checkbox: Pick<CheckboxProps, "variant">;
        select: Pick<SelectBaseProps, "selectionMode" | "isSearchable" | "collapseAfter" | "selectedTagsType">;
        toggle: Pick<ToggleProps, "variant">;
        slider: Pick<SliderProps, "minValue" | "maxValue">;
        dateInput: Pick<DatePickerProps, "todayIcon" | "shouldForceLeadingZeros">;
    }
    interface ProviderProps {
        config?: Partial<Options>;
    }
    export const Provider: ({ config, children }: PropsWithChildren<ProviderProps>) => import("react/jsx-runtime").JSX.Element;
    export const useConfig: () => DeepRequired<Options>;
    export {};
}
