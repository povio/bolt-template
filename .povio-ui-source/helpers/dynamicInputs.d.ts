import { ReactElement } from 'react';
import { Control, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { InputComponentProps, InputComponentType, InputDef, InputDefBaseProps, InputWrapperType } from '../components/inputs/Inputs/InputItem';
import { ZodUtils } from '../utils/zod.utils';
declare const defaultComponentTypes: {
    readonly datetime: "datePicker";
    readonly dateRange: "dateRangePicker";
    readonly textEditor: "textEditor";
    readonly boolean: "toggle";
    readonly number: "numberInput";
    readonly enum: "select";
    readonly string: "textInput";
    readonly email: "textInput";
    readonly object: "unknown";
    readonly array: "select";
    readonly uuid: "select";
    readonly unknown: "unknown";
};
export type DefaultComponentType<TZodType extends z.ZodType> = ZodUtils.ZodTypeSwitch<TZodType, typeof defaultComponentTypes>;
export type AllowedComponentType<TZodType extends z.ZodType> = ZodUtils.ZodTypeSwitch<TZodType, {
    datetime: "datePicker" | "dateTimePicker" | "timePicker";
    dateRange: "dateRangePicker";
    textEditor: "textEditor";
    boolean: "toggle" | "checkbox";
    number: "numberInput" | "slider" | "select" | "autocomplete" | "queryAutocomplete" | "segment";
    enum: "select" | "autocomplete" | "segment";
    string: "textInput" | "passwordInput" | "textArea" | "select" | "autocomplete" | "queryAutocomplete" | "segment";
    email: "textInput";
    array: "select" | "autocomplete" | "queryAutocomplete" | "segment";
    object: InputComponentType;
    unknown: InputComponentType;
    uuid: "select" | "autocomplete" | "queryAutocomplete" | "segment";
}>;
interface DynamicInputDefBase<TProps> {
    label?: string;
    placeholder?: string;
    props?: Partial<TProps>;
    inputWrapper?: InputWrapperType;
}
type ConfigInputDef<TSchema extends z.ZodObject<any>, K extends keyof z.infer<TSchema>> = {
    [T in AllowedComponentType<TSchema["shape"][K]>]: {
        type: T;
    } & DynamicInputDefBase<InputDefBaseProps<InputComponentProps<T>>>;
}[AllowedComponentType<TSchema["shape"][K]>];
type UnknownInputDef<TSchema extends z.ZodObject<any>, K extends keyof z.infer<TSchema>> = {
    [T in DefaultComponentType<TSchema["shape"][K]>]: {
        type?: never;
    } & DynamicInputDefBase<InputDefBaseProps<InputComponentProps<T>>>;
}[DefaultComponentType<TSchema["shape"][K]>];
type RenderInputDef<TSchema extends z.ZodObject<any>, K extends keyof z.infer<TSchema>> = {
    render: (formControl: {
        control: Control<z.infer<TSchema>>;
        name: K;
    }, form: UseFormReturn<z.infer<TSchema>>) => ReactElement;
} & DynamicInputDefBase<Record<string, never>>;
type DynamicInputDef<TSchema extends z.ZodObject<any>, K extends keyof z.infer<TSchema>> = ConfigInputDef<TSchema, K> | UnknownInputDef<TSchema, K> | RenderInputDef<TSchema, K>;
type InputsConfig<TSchema extends z.ZodObject<any>> = {
    [K in keyof z.infer<TSchema>]?: DynamicInputDef<TSchema, K> | ((formControl: {
        control: Control<z.infer<TSchema>>;
        name: K;
    }, form: UseFormReturn<z.infer<TSchema>>) => ReactElement) | boolean;
};
type GlobalProps = {
    [T in Exclude<InputComponentType, "unknown">]: InputDefBaseProps<InputComponentProps<T>>;
}[Exclude<InputComponentType, "unknown">];
type SchemaKeyOrString<TSchema extends z.ZodObject<any>> = keyof z.infer<TSchema> | (string & {});
export interface DynamicInputsOptions<TSchema extends z.ZodObject<any>> {
    inputs?: InputsConfig<TSchema>;
    order?: SchemaKeyOrString<TSchema>[];
    globalProps?: Partial<GlobalProps>;
    globalInputWrapper?: InputWrapperType;
    namespace?: string;
    overridePresetLocales?: boolean;
    includeAll?: boolean;
}
export interface DynamicInputsParams<TSchema extends z.ZodObject<any>> {
    schema: TSchema;
    preset?: InputDef<z.infer<TSchema>>[];
    options: DynamicInputsOptions<TSchema>;
}
export declare const getDefaultInputComponentType: (schemaType: z.core.$ZodType) => InputComponentType;
export declare const getDefaultSelectionMode: (keyType: z.core.$ZodType) => "single" | "multiple";
export declare const dynamicInputs: <TSchema extends z.ZodObject<any>>({ schema, preset, options, }: DynamicInputsParams<TSchema>) => InputDef<z.infer<TSchema>>[];
export {};
