import { DependencyList } from 'react';
import { FieldValues } from 'react-hook-form';
import { UseAutosaveProps } from './useAutosave';
import { UseFormProps, UseFormResolverProps } from './useForm';
export type UseFormAutosaveProps<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues = TFieldValues, TResponse = unknown> = Omit<UseFormProps<TFieldValues, TContext, TTransformedValues>, "defaultValues"> & UseFormResolverProps<TFieldValues, TTransformedValues> & {
    autosaveDelay?: UseAutosaveProps<TFieldValues, TContext, TTransformedValues, TResponse>["delay"];
    enableAutosave?: UseAutosaveProps<TFieldValues, TContext, TTransformedValues, TResponse>["enabled"];
    onAutosave: UseAutosaveProps<TFieldValues, TContext, TTransformedValues, TResponse>["onSave"];
    getResetValues: () => UseFormProps<TFieldValues, TContext, TTransformedValues>["defaultValues"];
    resetDeps: DependencyList;
    resetTimeout?: number;
};
export declare function useFormAutosave<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues = TFieldValues, TResponse = any>({ autosaveDelay, enableAutosave, onAutosave, getResetValues, resetDeps, resetTimeout, ...props }: UseFormAutosaveProps<TFieldValues, TContext, TTransformedValues, TResponse>): import('react-hook-form').UseFormReturn<TFieldValues, TContext, TTransformedValues>;
