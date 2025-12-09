import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Virtualizer, ListLayout, ListBox } from "react-aria-components";
import { SelectListBoxItem } from "./SelectListBoxItem.js";
import { SelectListBoxItemSelectAll } from "./SelectListBoxItemSelectAll.js";
import { SelectListBoxLoadingItem } from "./SelectListBoxLoadingItem.js";
import { SelectContext } from "./select.context.js";
import { SelectAllItemId } from "./useSelectItems.js";
const SelectListBox = ({
  label,
  selectionMode,
  isSearchable,
  isScrollable = true,
  virtualizerOptions,
  newItemRender,
  onLoadMore,
  className,
  onClose,
  ...props
}) => {
  const { fieldState, onChange, listItems, selectableListItems, selectedIds, isMultiple, onClear, onSelectAll } = SelectContext.useSelect();
  const onSelectionChange = (value) => {
    const ids = Array.from(value);
    if (!isMultiple && ids.length === 0) {
      if (fieldState.value) {
        onClose?.();
        onChange(fieldState.value);
      }
      return;
    }
    if (isMultiple && ids.includes(SelectAllItemId)) {
      if (ids.length > selectableListItems.length) {
        onClear();
      } else {
        onSelectAll();
      }
      return;
    }
    if (isMultiple) {
      onChange(ids);
    } else {
      onClose?.();
      onChange(ids[0]);
    }
  };
  const renderItem = (item) => {
    if (item.isSelectAllItem) {
      return /* @__PURE__ */ jsx(
        SelectListBoxItemSelectAll,
        {
          ...item
        },
        item.id
      );
    }
    if (item.isLoadingItem) {
      return /* @__PURE__ */ jsx(
        SelectListBoxLoadingItem,
        {
          ...item,
          onLoadMore
        },
        item.id
      );
    }
    return /* @__PURE__ */ jsx(
      SelectListBoxItem,
      {
        ...item,
        isSearchable,
        isNewItem: item.isNewItem,
        newItemRender
      },
      item.id
    );
  };
  if (virtualizerOptions || listItems.length > 100) {
    return /* @__PURE__ */ jsx(
      Virtualizer,
      {
        layout: ListLayout,
        layoutOptions: virtualizerOptions,
        children: /* @__PURE__ */ jsx(
          ListBox,
          {
            ...props,
            "aria-label": label,
            selectionMode,
            className: clsx(
              "flex-1 outline-none [&>div:last-child>*]:border-b-0",
              isScrollable ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden",
              className
            ),
            items: listItems,
            selectedKeys: selectedIds,
            onSelectionChange,
            escapeKeyBehavior: "none",
            shouldSelectOnPressUp: true,
            children: renderItem
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    ListBox,
    {
      ...props,
      "aria-label": label,
      selectionMode,
      className: clsx(
        "flex-1 outline-none [&>div:last-child]:border-b-0",
        isScrollable ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden",
        className
      ),
      items: listItems,
      selectedKeys: selectedIds,
      onSelectionChange,
      escapeKeyBehavior: "none",
      shouldSelectOnPressUp: true,
      children: renderItem
    }
  );
};
export {
  SelectListBox
};
