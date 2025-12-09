import { FieldValues, UseFormReturn } from 'react-hook-form';
export interface UseAutosaveProps<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues = TFieldValues, TResponse = unknown> {
    form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
    delay?: number;
    enabled?: boolean;
    onSave: (data: Partial<TTransformedValues>) => Promise<TResponse>;
    onSaveSuccess?: () => void;
}
export declare function useAutosave<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues = TFieldValues, TResponse = unknown>({ form, delay, enabled, onSave, onSaveSuccess, }: UseAutosaveProps<TFieldValues, TContext, TTransformedValues, TResponse>): void;
