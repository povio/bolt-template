import { Key } from 'react-aria-components';
import { SelectBaseProps } from './SelectBase';
import { ExtendedSelectItem, SelectItem } from './select.types';
export declare const SelectAllItemId = "all-item-id";
export declare const NewItemId = "new-item-id";
export declare const LoadingItemId = "loading-item-id";
export declare const ReservedItemIds: string[];
interface UseSelectItemsProps extends Pick<SelectBaseProps, "showSelectAllOption" | "showNewItemOption" | "newItemMinLength" | "isLoading" | "hasLoadMore" | "isClientSearchDisabled"> {
    initialSelectedItems?: SelectItem[] | SelectItem | null;
    selectedItems?: SelectItem[] | SelectItem | null;
    cachedItems: SelectItem[];
    inputValue: string;
    showAll: boolean;
    isMultiple: boolean;
}
export declare function useSelectItems({ initialSelectedItems, selectedItems, cachedItems, inputValue, showAll, isMultiple, showSelectAllOption, showNewItemOption, newItemMinLength, isLoading, hasLoadMore, isClientSearchDisabled, }: UseSelectItemsProps): {
    allItems: SelectItem<Key>[];
    allListItems: ExtendedSelectItem<Key>[];
    filteredListItems: ExtendedSelectItem<Key>[];
    listItems: ExtendedSelectItem<Key>[];
    selectableListItems: ExtendedSelectItem<Key>[];
};
export {};
