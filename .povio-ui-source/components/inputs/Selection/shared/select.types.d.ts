import { ReactElement } from 'react';
import { Key } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { ControlProps } from '../../shared/form.types';
export interface SelectItem<TKey extends Key = Key> {
    id: TKey;
    label: string;
    content?: string | ReactElement;
    isDisabled?: boolean;
}
export interface ExtendedSelectItem<TKey extends Key = Key> extends SelectItem<TKey> {
    isNewItem?: boolean;
    isSelectAllItem?: boolean;
    isLoadingItem?: boolean;
}
export interface DefaultInitialSelectItem<TKey extends Key = Key> {
    id: TKey;
    label?: string;
    name?: string;
}
export interface SingleSelectProps<TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>> {
    selectionMode?: "single";
    value?: TKey | undefined | null;
    onChange?: (value: TKey | null) => void;
    showSelectionBar?: never;
    showSelectAllOption?: never;
    initialSelection?: TInitialSelectItem | null;
    showSelectionContent?: boolean;
}
export interface MultiSelectProps<TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>> {
    selectionMode: "multiple";
    value?: TKey[];
    onChange?: (value: TKey[]) => void;
    showSelectionBar?: boolean;
    showSelectAllOption?: boolean;
    initialSelection?: TInitialSelectItem[] | null;
    showSelectionContent?: never;
}
export type GroupedSelectProps<TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>> = MultiSelectProps<TKey, TInitialSelectItem> | SingleSelectProps<TKey, TInitialSelectItem>;
export type GroupedSelectControlProps<TFieldValues extends FieldValues, TKey extends Key = Key, TInitialSelectItem = DefaultInitialSelectItem<TKey>> = ({
    selectionMode: MultiSelectProps["selectionMode"];
} & ControlProps<MultiSelectProps<TKey, TInitialSelectItem>, TFieldValues>) | ({
    selectionMode?: SingleSelectProps["selectionMode"];
} & ControlProps<SingleSelectProps<TKey, TInitialSelectItem>, TFieldValues>);
export interface SelectNewItemProps {
    showNewItemOption?: boolean;
    newItemMinLength?: number;
    onNewItemOption?: (value: string) => void;
    newItemRender?: (label: string) => ReactElement;
}
export interface SelectAsyncProps {
    isLoading?: boolean;
    hasLoadMore?: boolean;
    onLoadMore?: () => void;
}
export interface SelectVirtualizationProps {
    virtualizerOptions?: {
        rowHeight?: number;
        estimatedRowHeight?: number;
        padding?: number;
        gap?: number;
    };
}
