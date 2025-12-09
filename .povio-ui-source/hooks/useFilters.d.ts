import { z } from 'zod';
type FilterValue = string | string[] | boolean | number;
export interface FilterStore<TFilterData> {
    filterData: TFilterData;
    setFilterValue: (data: Partial<TFilterData>) => void;
    getFilterValue: (keys: (keyof TFilterData)[]) => Partial<TFilterData>;
    clearAllFilters: () => void;
}
export declare function parseFilterFromQuery(query: Record<string, any>, schema?: z.ZodObject<any>): Record<string, FilterValue>;
export declare function useFilters<TFilterData>(defaultFilterValues?: TFilterData, prefix?: string, schema?: z.ZodObject<any>): FilterStore<TFilterData>;
export {};
