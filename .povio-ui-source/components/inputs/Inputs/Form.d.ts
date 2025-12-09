import { ReactNode } from 'react';
import { SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { InputComponentProps, InputDefBaseProps } from './InputItem';
import { AllowedComponentType, DefaultComponentType } from '../../../helpers/dynamicInputs';
type Capitalize<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;
type FieldProps<TProps = {}> = {
    label: string;
    placeholder?: string;
} & TProps;
type FieldComponentProps<TSchema extends z.ZodObject<any>, K extends keyof z.infer<TSchema>, T extends AllowedComponentType<TSchema["shape"][K]> | undefined = undefined> = FieldProps<InputDefBaseProps<InputComponentProps<T extends AllowedComponentType<TSchema["shape"][K]> ? T : DefaultComponentType<TSchema["shape"][K]>>>> & {
    inputType?: T extends AllowedComponentType<TSchema["shape"][K]> ? T : never;
};
type FieldComponents<TSchema extends z.ZodObject<any>> = {
    [K in keyof Required<z.infer<TSchema>> as Capitalize<K & string>]: <T extends AllowedComponentType<TSchema["shape"][K]> | undefined = undefined>(props: FieldComponentProps<TSchema, K, T>) => ReactNode;
};
interface FormProps<TSchema extends z.ZodObject<any>, TSchemaType extends Record<string, any> = z.infer<TSchema>> {
    form: UseFormReturn<TSchemaType>;
    schema: TSchema;
    onSubmit: SubmitHandler<TSchemaType>;
    onError?: SubmitErrorHandler<TSchemaType>;
    className?: string;
    children: (components: FieldComponents<TSchema>) => ReactNode;
}
export declare function Form<TSchema extends z.ZodObject<any>>({ form, schema, onSubmit, onError, className, children, }: FormProps<TSchema>): import("react/jsx-runtime").JSX.Element;
export {};
