import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Focusable } from "react-aria-components";
import { InfoIcon } from "../../../assets/icons/Info.js";
import { FormFieldLabel } from "./FormFieldLabel.js";
import { Tooltip } from "../../overlays/Tooltip/Tooltip.js";
import { Typography } from "../../text/Typography/Typography.js";
const FormFieldHeader = ({
  label,
  tooltipText,
  helperText,
  isRequired,
  rightContent,
  isHeaderHidden,
  isDisabled,
  className,
  labelProps
}) => {
  return /* @__PURE__ */ jsxs("div", { className: clsx(isHeaderHidden ? "sr-only" : "mb-1", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-1", children: [
        /* @__PURE__ */ jsx(
          FormFieldLabel,
          {
            label,
            isRequired,
            isDisabled,
            labelProps
          }
        ),
        tooltipText && /* @__PURE__ */ jsx(Tooltip, { text: tooltipText, children: /* @__PURE__ */ jsx(Focusable, { children: /* @__PURE__ */ jsx(
          InfoIcon,
          {
            className: clsx(
              "size-6",
              isDisabled ? "text-interactive-text-secondary-disabled" : "text-interactive-text-secondary-idle hover:text-interactive-text-secondary-hover"
            ),
            tabIndex: 0
          }
        ) }) })
      ] }),
      rightContent
    ] }),
    helperText && /* @__PURE__ */ jsx(
      Typography,
      {
        slot: "description",
        size: "label-2",
        className: "text-text-default-2",
        children: helperText
      }
    )
  ] });
};
export {
  FormFieldHeader
};
