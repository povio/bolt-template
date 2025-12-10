import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { InputDef } from './InputItem';
export interface InputsProps<TSchema extends z.ZodObject<any>, TSchemaType extends Record<string, any> = z.infer<TSchema>> {
    form: UseFormReturn<TSchemaType>;
    inputDefs: Array<InputDef<TSchemaType>>;
    children?: (inputs: Record<keyof TSchemaType, ReactNode>) => ReactNode;
}
export declare function Inputs<TSchema extends z.ZodObject<any>, TSchemaType extends Record<string, any> = z.infer<TSchema>>({ form, inputDefs, children, }: InputsProps<TSchema, TSchemaType>): string | number | bigint | boolean | import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import('react').ReactPortal | import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element[] | null | undefined;
