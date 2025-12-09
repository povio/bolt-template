import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Button } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../../assets/icons/Close.js";
import { TooltipEllipsis } from "../../overlays/Tooltip/TooltipEllipsis.js";
import { tag } from "./tag.cva.js";
import { Typography } from "../Typography/Typography.js";
import { ns } from "../../../config/i18n.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const Tag = ({ color, className, children, dismissable, isDisabled, onDismiss, ...props }) => {
  const uiStyle = UIStyle.useConfig();
  const tagCva = uiStyle?.tag?.cva ?? tag;
  const { t } = useTranslation(ns);
  const buttonProps = { isDisabled, onPress: onDismiss, label: t(($) => $.ui.tag.dismiss), ...props };
  return /* @__PURE__ */ jsx(TooltipEllipsis, { text: children, children: (onContentRef) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: tagCva({
        color,
        className: clsx("pointer-events-none", className)
      }),
      children: [
        /* @__PURE__ */ jsx(
          Typography,
          {
            ref: onContentRef,
            variant: "default",
            size: "label-2",
            as: "span",
            className: "truncate",
            children
          }
        ),
        dismissable && /* @__PURE__ */ jsx(
          Button,
          {
            ...buttonProps,
            className: "pointer-events-auto shrink-0",
            children: /* @__PURE__ */ jsx(CloseIcon, { className: "size-4" })
          }
        )
      ]
    }
  ) });
};
export {
  Tag
};
