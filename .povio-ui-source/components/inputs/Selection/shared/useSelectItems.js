import { useMemo } from "react";
import { useFilter } from "react-aria-components";
const SelectAllItemId = "all-item-id";
const SelectAllItem = (inputValue) => ({
  id: SelectAllItemId,
  label: inputValue,
  isSelectAllItem: true
});
const NewItemId = "new-item-id";
const NewItem = (inputValue) => ({
  id: NewItemId,
  label: inputValue,
  isNewItem: true
});
const LoadingItemId = "loading-item-id";
const LoadingItem = (inputValue) => ({
  id: LoadingItemId,
  label: inputValue,
  isLoadingItem: true
});
const ReservedItemIds = [SelectAllItemId, NewItemId, LoadingItemId];
function useSelectItems({
  initialSelectedItems,
  selectedItems,
  cachedItems,
  inputValue,
  showAll,
  isMultiple,
  showSelectAllOption,
  showNewItemOption,
  newItemMinLength = 3,
  isLoading,
  hasLoadMore,
  isClientSearchDisabled
}) {
  const { contains } = useFilter({ sensitivity: "base" });
  const allListItems = useMemo(() => {
    const showSelectAllItem = isMultiple && showSelectAllOption && inputValue.length === 0 && !hasLoadMore;
    const showNewItem = showNewItemOption && inputValue.length >= newItemMinLength && !cachedItems.find((item) => contains(item.label, inputValue));
    const showLoadingItem = isLoading || hasLoadMore;
    return [
      ...showSelectAllItem ? [SelectAllItem(inputValue)] : [],
      ...cachedItems,
      ...showNewItem ? [NewItem(inputValue)] : [],
      ...showLoadingItem ? [LoadingItem(inputValue)] : []
    ];
  }, [
    isMultiple,
    showNewItemOption,
    inputValue,
    newItemMinLength,
    cachedItems,
    contains,
    isLoading,
    hasLoadMore,
    showSelectAllOption
  ]);
  const allItems = useMemo(() => {
    const items = [
      ...Array.isArray(initialSelectedItems) ? initialSelectedItems : [initialSelectedItems],
      ...Array.isArray(selectedItems) ? selectedItems : [selectedItems],
      ...allListItems
    ].filter((item) => !!item);
    const allItemsMap = /* @__PURE__ */ new Map();
    items.forEach((item) => allItemsMap.set(item.id, item));
    return Array.from(allItemsMap.values());
  }, [allListItems, initialSelectedItems, selectedItems]);
  const filteredListItems = useMemo(
    () => allListItems.filter((item) => contains(item.label, inputValue)),
    [allListItems, contains, inputValue]
  );
  const listItems = useMemo(
    () => showAll || isClientSearchDisabled ? allListItems : filteredListItems,
    [showAll, isClientSearchDisabled, allListItems, filteredListItems]
  );
  const selectableListItems = useMemo(
    () => listItems.filter((item) => !item.isDisabled && !ReservedItemIds.includes(String(item.id))),
    [listItems]
  );
  return {
    allItems,
    allListItems,
    filteredListItems,
    listItems,
    selectableListItems
  };
}
export {
  LoadingItemId,
  NewItemId,
  ReservedItemIds,
  SelectAllItemId,
  useSelectItems
};
