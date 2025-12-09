import { PropsWithChildren } from 'react';
import { Key } from 'react-aria-components';
import { SelectBaseProps } from './SelectBase';
import { ExtendedSelectItem, GroupedSelectProps, SelectItem } from './select.types';
export declare namespace SelectContext {
    interface FieldState {
        value: Key | Key[] | null;
        inputValue: string;
        searchValue: string;
    }
    export type Type = {
        fieldState: FieldState;
        isOpen: boolean;
        setIsOpen: (isOpen: boolean) => void;
        isDebouncing: boolean;
        onChange: (val: Key | Key[]) => void;
        onClear: () => void;
        onSelectAll: () => void;
        onRemove: (val: Key) => void;
        listItems: ExtendedSelectItem[];
        selectableListItems: SelectItem[];
        selectedItems: SelectItem[];
        selectedIds: Key[];
        isMultiple: boolean;
    } & Pick<SelectBaseProps, "onInputChange" | "isLoading" | "hasLoadMore">;
    export type ProviderProps = GroupedSelectProps & Pick<SelectBaseProps, "items" | "onInputChange" | "onSearchChange" | "showSelectAllOption" | "showNewItemOption" | "newItemMinLength" | "onNewItemOption" | "isLoading" | "hasLoadMore" | "mapInitialToSelectItem" | "isSearchable" | "isClientSearchDisabled">;
    export const Provider: ({ items, onInputChange, onSearchChange, showSelectAllOption, showNewItemOption, newItemMinLength, onNewItemOption, isLoading, hasLoadMore, isClientSearchDisabled, children, mapInitialToSelectItem, ...props }: PropsWithChildren<ProviderProps>) => import("react/jsx-runtime").JSX.Element;
    export const useSelect: () => Type;
    export {};
}
