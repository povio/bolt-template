import { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';
export type ControlKeys<TProps, TValueProp extends keyof TProps = "value" extends keyof TProps ? "value" : never> = TValueProp | "onChange" | "onBlur";
export interface FormControl<TFieldValues extends FieldValues, TType> {
    control: Control<TFieldValues>;
    name: {
        [K in FieldPath<TFieldValues>]: FieldPathValue<TFieldValues, K> extends TType ? K : never;
    }[FieldPath<TFieldValues>];
}
export type FormControlProps<TProps, TFieldValues extends FieldValues, TValueProp extends keyof TProps = "value" extends keyof TProps ? "value" : never> = {
    formControl: FormControl<TFieldValues, TProps[TValueProp] | null>;
} & Omit<TProps, ControlKeys<TProps, TValueProp>> & Partial<Record<ControlKeys<TProps, TValueProp>, never>>;
export type ControlProps<TProps, TFieldValues extends FieldValues, TValueProp extends keyof TProps = "value" extends keyof TProps ? "value" : never> = FormControlProps<TProps, TFieldValues, TValueProp> | TProps;
