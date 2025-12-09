import { jsxs, jsx } from "react/jsx-runtime";
import { Fragment, useRef } from "react";
import { useFocusable } from "react-aria";
import { TooltipTrigger, Tooltip as Tooltip$1, OverlayArrow } from "react-aria-components";
import { PointerHorizontalIcon } from "../../../assets/icons/PointerHorizontal.js";
import { PointerVerticalIcon } from "../../../assets/icons/PointerVertical.js";
import { tooltipCva, tooltipPointerHorizontalCva, tooltipPointerVerticalCva, tooltipTextCva } from "./tooltip.cva.js";
import { Typography } from "../../text/Typography/Typography.js";
const CustomTrigger = ({ children, className }) => {
  const ref = useRef(null);
  const { focusableProps } = useFocusable({}, ref);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      ...focusableProps,
      tabIndex: 0,
      className,
      children
    }
  );
};
const Tooltip = ({
  children,
  text,
  isDisabled,
  delay,
  closeDelay,
  color,
  isNonInteractiveTrigger,
  triggerClassName,
  ...tooltipProps
}) => {
  const Trigger = isNonInteractiveTrigger ? CustomTrigger : Fragment;
  return /* @__PURE__ */ jsxs(
    TooltipTrigger,
    {
      delay: delay ?? 0,
      closeDelay: closeDelay ?? 0,
      isDisabled,
      children: [
        /* @__PURE__ */ jsx(
          Trigger,
          {
            ...isNonInteractiveTrigger && {
              className: triggerClassName
            },
            children
          }
        ),
        /* @__PURE__ */ jsxs(
          Tooltip$1,
          {
            className: tooltipCva({ color }),
            ...tooltipProps,
            offset: 13,
            children: [
              /* @__PURE__ */ jsxs(OverlayArrow, { children: [
                /* @__PURE__ */ jsx(PointerHorizontalIcon, { className: tooltipPointerHorizontalCva({ color }) }),
                /* @__PURE__ */ jsx(PointerVerticalIcon, { className: tooltipPointerVerticalCva({ color }) })
              ] }),
              /* @__PURE__ */ jsx(
                Typography,
                {
                  size: "body-4",
                  variant: "prominent-1",
                  className: tooltipTextCva({ color }),
                  children: text
                }
              )
            ]
          }
        )
      ]
    }
  );
};
export {
  Tooltip
};
