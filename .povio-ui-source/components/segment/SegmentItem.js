import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { ToggleButton } from "react-aria-components";
import { Typography } from "../text/Typography/Typography.js";
const SegmentItem = ({ label, icon, id, isDisabled, ...props }) => {
  const IconComponent = icon;
  const iconOnly = icon && !label;
  return /* @__PURE__ */ jsxs(
    ToggleButton,
    {
      ...props,
      id,
      className: clsx(
        "flex items-center justify-center gap-segmented-control-gap-content-icon-to-text transition-all duration-200",
        "border border-support-transparent-outline",
        "py-segmented-control-height-segment",
        iconOnly ? "px-segmented-control-height-segment" : "px-segmented-control-side-segment",
        "rounded-segmented-control-rounding-segment",
        "text-interactive-subtle-secondary-on-idle",
        "hover:border-interactive-subtle-secondary-hover hover:bg-interactive-subtle-secondary-hover hover:text-interactive-subtle-secondary-on-hover",
        "pressed:border-interactive-subtle-secondary-pressed pressed:bg-interactive-subtle-secondary-pressed pressed:text-interactive-subtle-secondary-on-pressed",
        "disabled:border-support-transparent-outline disabled:text-interactive-subtle-secondary-on-disabled",
        "selected:border-interactive-subtle-secondary-toggled-idle selected:bg-interactive-subtle-secondary-toggled-idle selected:text-interactive-subtle-secondary-on-toggled-idle",
        "selected:disabled:border-interactive-subtle-secondary-toggled-disabled selected:disabled:bg-interactive-subtle-secondary-toggled-disabled selected:disabled:text-interactive-subtle-secondary-on-toggled-disabled"
      ),
      isDisabled,
      children: [
        icon && /* @__PURE__ */ jsx(IconComponent, { className: "size-6" }),
        label && /* @__PURE__ */ jsx(
          Typography,
          {
            size: "label-2",
            as: "span",
            className: "overflow-hidden text-ellipsis text-center",
            children: label
          }
        )
      ]
    }
  );
};
export {
  SegmentItem
};
