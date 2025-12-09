import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { TextButton } from "../../../buttons/TextButton/TextButton.js";
import { SelectContext } from "./select.context.js";
import { ns } from "../../../../config/i18n.js";
const SelectListBoxSelectionBar = ({ className }) => {
  const { t } = useTranslation(ns);
  const { onClear, onSelectAll } = SelectContext.useSelect();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center justify-between border-elevation-outline-default-1 border-b px-4 py-3",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          TextButton,
          {
            type: "button",
            color: "primary",
            onPress: onSelectAll,
            children: t(($) => $.ui.select.selectAll)
          }
        ),
        /* @__PURE__ */ jsx(
          TextButton,
          {
            type: "button",
            color: "secondary",
            onPress: onClear,
            children: t(($) => $.ui.select.clearSelection)
          }
        )
      ]
    }
  );
};
export {
  SelectListBoxSelectionBar
};
