import { jsxs, jsx } from "react/jsx-runtime";
import { useRef } from "react";
import { ListBoxItem } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { CheckboxCheckmark } from "../../Checkbox/CheckboxCheckmark.js";
import { selectListBoxItemClass } from "./SelectListBoxItem.js";
import { SelectContext } from "./select.context.js";
import { ns } from "../../../../config/i18n.js";
const SelectListBoxItemSelectAll = ({ id, label, isDisabled }) => {
  const ref = useRef(null);
  const { t } = useTranslation(ns);
  const { selectableListItems, selectedIds } = SelectContext.useSelect();
  return /* @__PURE__ */ jsxs(
    ListBoxItem,
    {
      ref,
      id,
      textValue: label || t(($) => $.ui.select.allOption),
      isDisabled,
      className: selectListBoxItemClass,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "group",
            "data-rac": "",
            "data-selected": selectedIds.length === selectableListItems.length || void 0,
            "data-indeterminate": selectedIds.length > 0 && selectedIds.length < selectableListItems.length || void 0,
            children: /* @__PURE__ */ jsx(
              CheckboxCheckmark,
              {
                variant: "default",
                className: "group-focus-visible:!outline-none"
              }
            )
          }
        ),
        t(($) => $.ui.select.allOption)
      ]
    }
  );
};
export {
  SelectListBoxItemSelectAll
};
