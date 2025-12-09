import { jsx } from "react/jsx-runtime";
import { createContext, useMemo, useState, useRef, useEffect, useCallback, use } from "react";
import { useSelectItems, NewItemId } from "./useSelectItems.js";
import { useDebounceCallback } from "../../../../hooks/useDebounceCallback.js";
var SelectContext;
((SelectContext2) => {
  const Context = createContext({});
  const defaultMapInitialToSelectItem = (item) => ({
    id: item.id,
    label: item.label ?? item.name ?? ""
  });
  SelectContext2.Provider = ({
    items,
    onInputChange,
    onSearchChange,
    showSelectAllOption,
    showNewItemOption,
    newItemMinLength,
    onNewItemOption,
    isLoading,
    hasLoadMore,
    isClientSearchDisabled,
    children,
    mapInitialToSelectItem = defaultMapInitialToSelectItem,
    ...props
  }) => {
    const isMultiple = props.selectionMode === "multiple";
    const initialSelectedItems = useMemo(() => {
      if (!props.initialSelection) {
        return null;
      }
      if (Array.isArray(props.initialSelection)) {
        return props.initialSelection.map(mapInitialToSelectItem);
      }
      return mapInitialToSelectItem(props.initialSelection);
    }, [props.initialSelection, mapInitialToSelectItem]);
    const [isOpen, setIsOpen] = useState(false);
    const [fieldState, setFieldState] = useState({
      value: props.value ?? (isMultiple ? [] : null),
      inputValue: "",
      searchValue: ""
    });
    const { callback: onSearchChangeDebounced, isDebouncing } = useDebounceCallback(onSearchChange);
    const [showAll, setShowAll] = useState(false);
    const [cachedItems, setCachedItems] = useState(items);
    const valueRef = useRef(initialSelectedItems);
    useEffect(() => {
      if (!isLoading) {
        setCachedItems(items);
      }
    }, [isLoading, items]);
    const { allItems, allListItems, listItems, selectableListItems } = useSelectItems({
      initialSelectedItems,
      selectedItems: valueRef.current,
      cachedItems,
      inputValue: fieldState.inputValue,
      showAll,
      isMultiple,
      showSelectAllOption,
      showNewItemOption,
      newItemMinLength,
      isLoading,
      hasLoadMore,
      isClientSearchDisabled
    });
    const selectedItems = useMemo(
      () => allItems.filter(
        ({ id }) => Array.isArray(fieldState.value) ? fieldState.value.includes(id) : id === fieldState.value
      ),
      [allItems, fieldState.value]
    );
    const selectedIds = useMemo(() => selectedItems.map(({ id }) => id), [selectedItems]);
    const getItem = useCallback(
      (value2) => allItems.find((item) => item && item.id === value2) ?? null,
      [allItems]
    );
    const updateValue = useCallback(
      (value2) => {
        if (Array.isArray(value2)) {
          valueRef.current = value2.map((id) => getItem(id)).filter((item) => item !== null);
        } else {
          valueRef.current = getItem(value2);
        }
      },
      [getItem]
    );
    const getValueIds = () => Array.isArray(valueRef.current) ? valueRef.current.map(({ id }) => id) : valueRef.current?.id ?? null;
    const emitStateChanges = useCallback(
      (changes, skipSelectionChange) => {
        const valueChanged = JSON.stringify(changes.value) !== JSON.stringify(getValueIds());
        if (valueChanged) {
          updateValue(changes.value);
          if (!skipSelectionChange) {
            if (isMultiple) {
              props.onChange?.(changes.value);
            } else {
              props.onChange?.(changes.value);
            }
          }
        }
        if (changes.inputValue !== fieldState.inputValue) {
          onInputChange?.(changes.inputValue);
        }
        if (changes.searchValue !== fieldState.searchValue) {
          onSearchChangeDebounced?.(changes.searchValue);
        }
      },
      [fieldState, isMultiple, props, onInputChange, onSearchChangeDebounced, updateValue]
    );
    const syncFieldState = (value2) => {
      const newFieldState = {
        value: value2,
        inputValue: isMultiple || Array.isArray(value2) ? fieldState.inputValue : getItem(value2)?.label ?? "",
        searchValue: ""
      };
      setFieldState(newFieldState);
      emitStateChanges(newFieldState, true);
      if (!isMultiple) {
        setShowAll(true);
      }
    };
    useEffect(() => {
      const value2 = props.value ?? null;
      if (JSON.stringify(value2) !== JSON.stringify(fieldState.value)) {
        syncFieldState(value2);
      } else {
        updateValue(value2);
      }
    }, [props.value]);
    useEffect(() => {
      if (!isMultiple && fieldState.value && fieldState.inputValue === "" && getItem(fieldState.value)?.label) {
        syncFieldState(fieldState.value);
      }
    }, [allListItems]);
    const handleInputChange = useCallback(
      (inputValue) => {
        const newFieldState = {
          value: isMultiple || inputValue !== "" ? fieldState.value : null,
          inputValue,
          searchValue: inputValue
        };
        setFieldState(newFieldState);
        emitStateChanges(newFieldState);
        setShowAll(false);
        if (!isOpen && inputValue !== "" && props.isSearchable) {
          setIsOpen(true);
        }
      },
      // oxlint-disable-next-line exhaustive-deps
      [emitStateChanges, fieldState.value, isMultiple]
    );
    const onChange = useCallback(
      (value2) => {
        if (value2 === NewItemId) {
          onNewItemOption?.(fieldState.inputValue);
        } else {
          const newFieldState = {
            value: value2,
            inputValue: isMultiple || Array.isArray(value2) ? "" : getItem(value2)?.label ?? "",
            searchValue: ""
          };
          setFieldState(newFieldState);
          emitStateChanges(newFieldState);
        }
        if (!isMultiple) {
          setIsOpen(false);
          setShowAll(true);
        }
      },
      [emitStateChanges, onNewItemOption, fieldState.inputValue, getItem, isMultiple]
    );
    const onClear = useCallback(() => {
      if (!valueRef.current || Array.isArray(valueRef.current) && valueRef.current.length === 0) {
        setFieldState((prev) => ({
          ...prev,
          inputValue: ""
        }));
        return;
      }
      if (isMultiple) {
        onChange([]);
      } else {
        onChange(null);
      }
    }, [isMultiple, onChange]);
    const onSelectAll = useCallback(() => {
      onChange(selectableListItems.map(({ id }) => id));
    }, [selectableListItems, onChange]);
    const onRemove = useCallback(
      (value2) => {
        if (isMultiple && Array.isArray(fieldState.value)) {
          onChange(fieldState.value.filter((id) => id !== value2));
        }
      },
      [isMultiple, fieldState.value, onChange]
    );
    const value = useMemo(
      () => ({
        fieldState,
        isOpen,
        setIsOpen,
        isDebouncing,
        onInputChange: handleInputChange,
        onChange,
        onClear,
        onSelectAll,
        onRemove,
        listItems,
        selectableListItems,
        selectedItems,
        selectedIds,
        isMultiple,
        isLoading,
        hasLoadMore
      }),
      [
        fieldState,
        isOpen,
        setIsOpen,
        isDebouncing,
        handleInputChange,
        onChange,
        onClear,
        onSelectAll,
        onRemove,
        listItems,
        selectableListItems,
        selectedIds,
        selectedItems,
        isMultiple,
        isLoading,
        hasLoadMore
      ]
    );
    return /* @__PURE__ */ jsx(Context.Provider, { value, children });
  };
  SelectContext2.useSelect = () => {
    const select = use(Context);
    return select;
  };
})(SelectContext || (SelectContext = {}));
export {
  SelectContext
};
