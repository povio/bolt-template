import { ComponentProps, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { Control, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { HasRequiredProperty } from '../../../types/common';
declare const componentRegistry: {
    readonly toggle: <TFieldValues extends import('react-hook-form').FieldValues>(props: import('../Toggle/Toggle').ControlledToggleProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly checkbox: <TFieldValues extends import('react-hook-form').FieldValues>(props: import('../Checkbox/Checkbox').ControlledCheckboxProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly numberInput: <TFieldValues extends import('react-hook-form').FieldValues>(props: import('../Input/NumberInput/NumberInput').ControlledNumberInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly slider: <TFieldValues extends import('react-hook-form').FieldValues, IsRange extends boolean = false>(props: import('../Slider/Slider').ControlledSliderProps<TFieldValues, IsRange>) => import("react/jsx-runtime").JSX.Element;
    readonly textInput: <TFieldValues extends import('react-hook-form').FieldValues>(props: import('../Input/TextInput/TextInput').ControlledTextInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly passwordInput: <TFieldValues extends import('react-hook-form').FieldValues>(props: import('../Input/PasswordInput/PasswordInput').ControlledPasswordInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly textArea: <TFieldValues extends import('react-hook-form').FieldValues>(props: import('../Input/TextArea/TextArea').ControlledTextAreaProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly select: <TFieldValues extends import('react-hook-form').FieldValues, TKey extends import('react-aria').Key = import('react-aria').Key, TInitialSelectItem = import('../Selection/shared/select.types').DefaultInitialSelectItem<TKey>>(props: import('../Selection/Select/Select').ControlledSelectProps<TFieldValues, TKey, TInitialSelectItem>) => import("react/jsx-runtime").JSX.Element;
    readonly autocomplete: <TFieldValues extends import('react-hook-form').FieldValues, TKey extends import('react-aria').Key = import('react-aria').Key, TInitialSelectItem = import('../Selection/shared/select.types').DefaultInitialSelectItem<TKey>>(props: import('../Selection/Autocomplete/Autocomplete').ControlledAutocompleteProps<TFieldValues, TKey, TInitialSelectItem>) => import("react/jsx-runtime").JSX.Element;
    readonly queryAutocomplete: <TFieldValues extends import('react-hook-form').FieldValues, TSelectItem extends import('../Selection/shared/select.types').SelectItem<any>, TQueryFn extends (...args: any) => import('@tanstack/react-query').UseQueryResult<TSelectItem[]>>({ query, queryParams, queryOptions, ...props }: import('../../../types/common').OmitDiscriminatedUnion<import('../Selection/Autocomplete/Autocomplete').AutocompleteProps<Exclude<ReturnType<TQueryFn>["data"], undefined>[0] extends {
        id: infer InferredKey extends import('react-aria').Key;
    } ? InferredKey : never>, "onChange" | "value" | "isLoading" | "items" | "selectionMode" | "showSelectionBar" | "showSelectAllOption" | "initialSelection" | "showSelectionContent" | "onSearchChange"> & (import('../Selection/shared/select.types').GroupedSelectControlProps<TFieldValues, Exclude<ReturnType<TQueryFn>["data"], undefined>[0] extends {
        id: infer InferredKey extends import('react-aria').Key;
    } ? InferredKey : never> & {
        query: Parameters<TQueryFn>[0] extends {
            search?: string;
        } ? TQueryFn : never;
        queryParams?: Omit<Parameters<TQueryFn>[0], "search"> | undefined;
        queryOptions?: Parameters<TQueryFn>[1] | undefined;
    })) => import("react/jsx-runtime").JSX.Element;
    readonly segment: <TFieldValues extends import('react-hook-form').FieldValues, TKey extends import('react-aria').Key = import('react-aria').Key>(props: import('../../..').ControlledSegmentProps<TFieldValues, TKey>) => import("react/jsx-runtime").JSX.Element;
    readonly datePicker: <TFieldValues extends import('react-hook-form').FieldValues>({ fullIso, minValue, maxValue, ...props }: import('../DateTime/DatePicker/DatePicker').ControlledDatePickerProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly dateTimePicker: <TFieldValues extends import('react-hook-form').FieldValues>({ fullIso, ...props }: import('../DateTime/DateTimePicker/DateTimePicker').ControlledDateTimePickerProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly timePicker: <TFieldValues extends import('react-hook-form').FieldValues>(props: import('../DateTime/TimePicker/TimePicker').ControlledTimePickerProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly dateRangePicker: <TFieldValues extends import('react-hook-form').FieldValues>({ fullIso, minValue, maxValue, ...props }: import('../DateTime/DateRangePicker/DateRangePicker').ControlledDateRangePickerProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
    readonly unknown: null;
};
export type InputComponentRegistry = typeof componentRegistry;
export type InputComponentType = keyof InputComponentRegistry;
interface InputItemProps<TSchema extends z.ZodObject<any>, TSchemaType extends Record<string, any> = z.infer<TSchema>> {
    form: UseFormReturn<TSchemaType>;
    inputDef: InputDef<TSchemaType>;
}
export type InputDef<TSchemaType extends Record<string, any>> = {
    [T in InputComponentType]: T extends "unknown" ? never : {
        [K in keyof TSchemaType]: TypeBasedInputDef<TSchemaType, T, K> | RenderBasedInputDef<TSchemaType, K>;
    }[keyof TSchemaType];
}[InputComponentType];
type TypeBasedInputDef<TSchemaType extends Record<string, any>, T extends InputComponentType, K extends keyof TSchemaType> = {
    type: T;
    name: K;
    label: string;
    placeholder?: string;
    inputWrapper?: InputWrapperType;
    render?: never;
} & (HasRequiredProperty<InputDefBaseProps<InputComponentProps<T>>> extends true ? {
    props?: InputDefBaseProps<InputComponentProps<T>>;
} : {
    props: InputDefBaseProps<InputComponentProps<T>>;
});
interface RenderBasedInputDef<TSchemaType extends Record<string, any>, K extends keyof TSchemaType> {
    type?: never;
    name: K;
    label?: never;
    placeholder?: never;
    props?: never;
    inputWrapper?: never;
    render: (formControl: {
        control: Control<TSchemaType>;
        name: K;
    }, form: UseFormReturn<TSchemaType>) => ReactElement;
}
export type InputWrapperType = (children: ReactNode, label: string) => ReactElement;
export type InputComponentProps<T extends InputComponentType> = InputComponentRegistry[T] extends keyof React.JSX.IntrinsicElements | JSXElementConstructor<any> ? ComponentProps<InputComponentRegistry[T]> : null;
export type InputDefBaseProps<TProps> = Omit<TProps, "formControl" | "label" | "placeholder" | "children">;
export declare function InputItem<TSchema extends z.ZodObject<any>, TSchemaType extends Record<string, any> = z.infer<TSchema>>({ form, inputDef }: InputItemProps<TSchema, TSchemaType>): import("react/jsx-runtime").JSX.Element | null;
export {};
