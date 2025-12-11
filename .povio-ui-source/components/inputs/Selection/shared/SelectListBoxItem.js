import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useRef, useMemo } from "react";
import { ListBoxItem } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { CheckboxCheckmark } from "../../Checkbox/CheckboxCheckmark.js";
import { SelectContext } from "./select.context.js";
import { ns } from "../../../../config/i18n.js";
const SelectListBoxItem = ({
  isSearchable,
  isNewItem,
  newItemRender,
  id,
  label,
  content,
  isDisabled
}) => {
  const ref = useRef(null);
  const { t } = useTranslation(ns);
  const { selectedIds, isMultiple } = SelectContext.useSelect();
  const itemContent = useMemo(() => {
    if (isNewItem) {
      return newItemRender?.(label) ?? `${t(($) => $.ui.autocomplete.createNewBtn)} '${label}'`;
    }
    return content ?? label;
  }, [isNewItem, newItemRender, label, content, t]);
  return /* @__PURE__ */ jsxs(
    ListBoxItem,
    {
      ref,
      id,
      textValue: label,
      isDisabled,
      className: clsx(
        selectListBoxItemClass,
        !isMultiple && "selected:bg-interactive-contained-primary-idle selected:text-interactive-contained-primary-on-idle",
        isNewItem ? "text-interactive-text-primary-idle" : "text-interactive-text-secondary-idle"
      ),
      children: [
        isMultiple && !isSearchable && /* @__PURE__ */ jsx(
          CheckboxCheckmark,
          {
            variant: "default",
            className: "group-focus-visible:outline-none!"
          }
        ),
        isMultiple && isSearchable && /* @__PURE__ */ jsx(
          "div",
          {
            className: "group",
            "data-rac": "",
            "data-selected": selectedIds.includes(id) || void 0,
            children: /* @__PURE__ */ jsx(
              CheckboxCheckmark,
              {
                variant: "default",
                className: "group-focus-visible:outline-none!"
              }
            )
          }
        ),
        itemContent
      ]
    }
  );
};
const selectListBoxItemClass = clsx(
  "group flex cursor-pointer items-center gap-2 px-list-side-item py-list-height-item",
  "border-b border-b-elevation-outline-default-1 outline-none",
  "font-labels-default text-interactive-text-secondary-idle text-label-2",
  "hover:text-interactive-text-secondary-hover",
  "focus-visible:bg-interactive-contained-primary-focus focus-visible:text-interactive-text-secondary-idle-inverted",
  "disabled:cursor-default disabled:text-interactive-text-secondary-disabled"
);
export {
  SelectListBoxItem,
  selectListBoxItemClass
};
