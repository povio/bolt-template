import { z } from 'zod';
export interface FilterStore<TFilterData> {
    filterData: TFilterData;
    setFilterValue: (data: Partial<TFilterData>) => void;
    getFilterValue: (keys: (keyof TFilterData)[]) => Partial<TFilterData>;
    clearAllFilters: () => void;
}
export declare const useFilters: <TFilterData>(defaultFilterValues?: TFilterData, prefix?: string, schema?: z.ZodObject<any>) => FilterStore<TFilterData>;
