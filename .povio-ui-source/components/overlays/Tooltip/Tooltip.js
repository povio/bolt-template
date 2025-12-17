import { jsxs, jsx } from "react/jsx-runtime";
import { Fragment, useRef } from "react";
import { useFocusable } from "react-aria";
import { TooltipTrigger, Tooltip as Tooltip$1, OverlayArrow } from "react-aria-components";
import { PointerHorizontalIcon } from "../../../assets/icons/PointerHorizontal.js";
import { PointerVerticalIcon } from "../../../assets/icons/PointerVertical.js";
import { tooltipCva, tooltipPointerHorizontalCva, tooltipPointerVerticalCva, tooltipTextCva } from "./tooltip.cva.js";
import { Typography } from "../../text/Typography/Typography.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const CustomTrigger = ({
  children,
  className,
  tabIndex
}) => {
  const ref = useRef(null);
  const { focusableProps } = useFocusable({}, ref);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      ...focusableProps,
      tabIndex: tabIndex ?? 0,
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
  triggerTabIndex,
  ...tooltipProps
}) => {
  const uiStyle = UIStyle.useConfig();
  const tooltipCva$1 = uiStyle?.tooltip?.cva ?? tooltipCva;
  const tooltipPointerHorizontalCva$1 = uiStyle?.tooltip?.pointerHorizontalCva ?? tooltipPointerHorizontalCva;
  const tooltipPointerVerticalCva$1 = uiStyle?.tooltip?.pointerVerticalCva ?? tooltipPointerVerticalCva;
  const tooltipTextCva$1 = uiStyle?.tooltip?.textCva ?? tooltipTextCva;
  const Trigger = isNonInteractiveTrigger ? CustomTrigger : Fragment;
  return /* @__PURE__ */ jsxs(
    TooltipTrigger,
    {
      delay: delay ?? 0,
      closeDelay: closeDelay ?? 0,
      isDisabled,
      children: [
        isNonInteractiveTrigger ? /* @__PURE__ */ jsx(
          Trigger,
          {
            ...isNonInteractiveTrigger && {
              className: triggerClassName
            },
            tabIndex: triggerTabIndex,
            children
          }
        ) : /* @__PURE__ */ jsx(Trigger, { children }),
        /* @__PURE__ */ jsxs(
          Tooltip$1,
          {
            className: tooltipCva$1({ color }),
            ...tooltipProps,
            offset: 13,
            children: [
              /* @__PURE__ */ jsxs(OverlayArrow, { children: [
                /* @__PURE__ */ jsx(PointerHorizontalIcon, { className: tooltipPointerHorizontalCva$1({ color }) }),
                /* @__PURE__ */ jsx(PointerVerticalIcon, { className: tooltipPointerVerticalCva$1({ color }) })
              ] }),
              /* @__PURE__ */ jsx(
                Typography,
                {
                  size: "body-4",
                  variant: "prominent-1",
                  className: tooltipTextCva$1({ color }),
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
