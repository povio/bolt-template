import { jsxs, jsx } from "react/jsx-runtime";
import { CheckboxCheckmarkIcon } from "../../../assets/icons/CheckboxCheckmark.js";
import { CheckboxIndeterminateIcon } from "../../../assets/icons/CheckboxIndeterminate.js";
import { checkbox } from "./checkbox.cva.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const CheckboxCheckmark = ({
  variant,
  className,
  selectedIcon: SelectedIcon = CheckboxCheckmarkIcon,
  indeterminateIcon: IndeterminateIcon = CheckboxIndeterminateIcon,
  ...props
}) => {
  const uiStyle = UIStyle.useConfig();
  const checkboxCva = uiStyle?.checkbox?.cva ?? checkbox;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: checkboxCva({
        variant,
        ...props,
        className
      }),
      children: [
        /* @__PURE__ */ jsx(SelectedIcon, { className: "absolute hidden size-3 group-selected:block" }),
        /* @__PURE__ */ jsx(IndeterminateIcon, { className: "absolute hidden size-3 group-indeterminate:block" })
      ]
    }
  );
};
export {
  CheckboxCheckmark
};
