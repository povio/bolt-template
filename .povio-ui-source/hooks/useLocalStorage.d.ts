import { z } from 'zod';
interface IProps<ZOutput, ZInput> {
    key: string;
    schema: z.ZodType<ZOutput, ZInput>;
}
export declare const useLocalStorage: <ZOutput, ZInput>({ key, schema }: IProps<ZOutput, ZInput>) => {
    value: ZOutput | null;
    set: (newValue: ZInput) => void;
    remove: () => void;
    error: Error | null;
    isInitialLoading: boolean;
};
export {};
