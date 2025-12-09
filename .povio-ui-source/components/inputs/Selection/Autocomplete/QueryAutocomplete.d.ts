import { UseQueryResult } from '@tanstack/react-query';
import { Key } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { AutocompleteProps } from './Autocomplete';
import { GroupedSelectControlProps, GroupedSelectProps, SelectItem } from '../shared/select.types';
import { OmitDiscriminatedUnion } from '../../../../types/common';
type QueryFn<TSelectItem extends SelectItem = SelectItem> = (...args: any) => UseQueryResult<Array<TSelectItem>>;
type TKey<TQueryFn extends QueryFn> = Exclude<ReturnType<TQueryFn>["data"], undefined>[0] extends {
    id: infer InferredKey extends Key;
} ? InferredKey : never;
type QueryAutocompleteProps<TFieldValues extends FieldValues, TSelectItem extends SelectItem<any>, TQueryFn extends QueryFn<TSelectItem>> = OmitDiscriminatedUnion<AutocompleteProps<TKey<TQueryFn>>, "items" | "onSearchChange" | "isLoading" | keyof GroupedSelectProps> & GroupedSelectControlProps<TFieldValues, TKey<TQueryFn>> & {
    query: Parameters<TQueryFn>[0] extends {
        search?: string;
    } ? TQueryFn : never;
    queryParams?: Omit<Parameters<TQueryFn>[0], "search">;
    queryOptions?: Parameters<TQueryFn>[1];
};
export declare const QueryAutocomplete: <TFieldValues extends FieldValues, TSelectItem extends SelectItem<any>, TQueryFn extends QueryFn<TSelectItem>>({ query, queryParams, queryOptions, ...props }: QueryAutocompleteProps<TFieldValues, TSelectItem, TQueryFn>) => import("react/jsx-runtime").JSX.Element;
export {};
