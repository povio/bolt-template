import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { isValidElement, useMemo } from "react";
import useMeasure from "react-use-measure";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { FormFieldLabel } from "../../FormField/FormFieldLabel.js";
import { InputClear } from "../../shared/InputClear.js";
import { inputSide } from "../../shared/input.cva.js";
import { Loader } from "../../../status/Loader/Loader.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { UIStyle } from "../../../../config/uiStyle.context.js";
const InputContent = ({
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  unit,
  isLoading,
  isDisabled,
  action,
  isClearable,
  value,
  onChange,
  children,
  headerProps,
  as,
  size
}) => {
  const uiStyle = UIStyle.useConfig();
  const inputSideCva = uiStyle?.input?.sideCva ?? inputSide;
  const [leadingContentRef, { width: leadingWidth }] = useMeasure();
  const [trailingContentRef, { width: trailingWidth }] = useMeasure();
  const [labelContentRef, { width: labelWidth }] = useMeasure();
  const isLeadingIconElement = LeadingIcon && isValidElement(LeadingIcon);
  const isTrailingIconElement = TrailingIcon && isValidElement(TrailingIcon);
  const showClear = isClearable && !!value;
  const style = useMemo(() => {
    const leftPadding = as === "filter" ? labelWidth + leadingWidth : leadingWidth;
    return {
      paddingLeft: `calc(var(${inputSideCva({ size, type: "var" })}) + ${leftPadding}px + ${leftPadding > 0 ? "var(--spacing-2)" : "0px"})`,
      paddingRight: `calc(var(${inputSideCva({ size, type: "var" })}) + ${trailingWidth}px + ${trailingWidth > 0 ? "var(--spacing-2)" : "0px"})`
    };
  }, [leadingWidth, trailingWidth, labelWidth, as, size, inputSideCva]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("group/input-content relative", {
        "h-full": as === "inline"
      }),
      children: [
        as && ["filter", "floating"].includes(as) && headerProps && /* @__PURE__ */ jsx(
          FormFieldLabel,
          {
            ref: labelContentRef,
            as,
            ...headerProps
          }
        ),
        children(style),
        LeadingIcon && /* @__PURE__ */ jsx(
          "div",
          {
            ref: leadingContentRef,
            className: clsx(
              "-translate-y-1/2 absolute top-1/2",
              !isLeadingIconElement && "pointer-events-none",
              inputSideCva({ size, type: "left" })
            ),
            children: isLeadingIconElement ? LeadingIcon : /* @__PURE__ */ jsx(LeadingIcon, { className: "size-6 text-interactive-text-secondary-idle" })
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: trailingContentRef,
            className: clsx(
              "-translate-y-1/2 absolute top-1/2 flex items-center gap-2",
              !isTrailingIconElement && !action && !showClear && "pointer-events-none",
              inputSideCva({ size, type: "right" })
            ),
            children: [
              showClear && /* @__PURE__ */ jsx(InputClear, { onClear: () => onChange?.("") }),
              unit && /* @__PURE__ */ jsx(
                Typography,
                {
                  as: "span",
                  size: "label-2",
                  variant: "prominent-1",
                  className: "text-text-default-3",
                  children: unit
                }
              ),
              isLoading && /* @__PURE__ */ jsx("div", { className: "inline-flex", children: /* @__PURE__ */ jsx(Loader, {}) }),
              !isLoading && action && /* @__PURE__ */ jsx(
                InlineIconButton,
                {
                  color: "secondary",
                  icon: action.icon,
                  isDisabled,
                  onPress: action.onClick,
                  excludeFromTabOrder: true,
                  label: action.altText,
                  className: action.className
                }
              ),
              !isLoading && !action && TrailingIcon && (isTrailingIconElement ? TrailingIcon : /* @__PURE__ */ jsx(TrailingIcon, { className: "size-6 text-interactive-text-secondary-idle" }))
            ]
          }
        )
      ]
    }
  );
};
export {
  InputContent
};
