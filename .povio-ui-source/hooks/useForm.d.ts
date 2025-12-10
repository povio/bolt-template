import { BrowserNativeObject, ExtractObjects, FieldValues, NestedValue, UseFormProps as UseReactHookFormProps } from 'react-hook-form';
import { z } from 'zod';
type DeepNullablePartial<T> = T extends BrowserNativeObject | NestedValue ? T : {
    [K in keyof T]?: ExtractObjects<T[K]> extends never ? T[K] | null : DeepNullablePartial<T[K]>;
};
type AsyncDefaultValues<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>;
type NullableDefaultValues<TFieldValues> = TFieldValues extends AsyncDefaultValues<TFieldValues> ? DeepNullablePartial<Awaited<TFieldValues>> : DeepNullablePartial<TFieldValues>;
export type UseFormResolverProps<TFieldValues extends FieldValues, TTransformedValues = TFieldValues> = {
    zodSchema: z.ZodType<TTransformedValues, TFieldValues>;
    resolver?: never;
} | {
    zodSchema?: never;
};
export type UseFormProps<TFieldValues extends FieldValues, TContext, TTransformedValues = TFieldValues> = Omit<UseReactHookFormProps<TFieldValues, TContext, TTransformedValues>, "defaultValues"> & {
    defaultValues?: NullableDefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>;
};
export declare function useForm<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues = TFieldValues>({ resolver, zodSchema, defaultValues, ...props }: UseFormProps<TFieldValues, TContext, TTransformedValues> & UseFormResolverProps<TFieldValues, TTransformedValues>): import('react-hook-form').UseFormReturn<TFieldValues, TContext, TTransformedValues>;
export {};
