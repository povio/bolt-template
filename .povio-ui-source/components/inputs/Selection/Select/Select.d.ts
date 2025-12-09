import { Key } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { SelectBaseProps } from '../shared/SelectBase';
import { DefaultInitialSelectItem, GroupedSelectControlProps, GroupedSelectProps, SelectAsyncProps } from '../shared/select.types';
import { OmitDiscriminatedUnion } from '../../../../types/common';
export type SelectProps<TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>> = OmitDiscriminatedUnion<SelectBaseProps<TKey, TInitialSelectItem>, "initialSelection" | "mapInitialToSelectItem" | keyof SelectAsyncProps>;
export type ControlledSelectProps<TFieldValues extends FieldValues, TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>> = Omit<SelectProps<TKey, TInitialSelectItem>, keyof GroupedSelectProps> & GroupedSelectControlProps<TFieldValues, TKey>;
export declare const Select: <TFieldValues extends FieldValues, TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>>(props: ControlledSelectProps<TFieldValues, TKey, TInitialSelectItem>) => import("react/jsx-runtime").JSX.Element;
