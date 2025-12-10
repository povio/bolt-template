import { Key } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { SelectBaseProps } from '../shared/SelectBase';
import { DefaultInitialSelectItem, GroupedSelectControlProps, GroupedSelectProps } from '../shared/select.types';
import { OmitDiscriminatedUnion } from '../../../../types/common';
export type AutocompleteProps<TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>> = OmitDiscriminatedUnion<SelectBaseProps<TKey, TInitialSelectItem>, "isSearchable">;
export type ControlledAutocompleteProps<TFieldValues extends FieldValues, TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>> = Omit<AutocompleteProps<TKey, TInitialSelectItem>, keyof GroupedSelectProps> & GroupedSelectControlProps<TFieldValues, TKey, TInitialSelectItem>;
export declare const Autocomplete: <TFieldValues extends FieldValues, TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>>(props: ControlledAutocompleteProps<TFieldValues, TKey, TInitialSelectItem>) => import("react/jsx-runtime").JSX.Element;
