import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Link, ToggleButton, Button as Button$1 } from "react-aria-components";
import { ButtonContent } from "../shared/ButtonContent.js";
import { TooltipEllipsis } from "../../overlays/Tooltip/TooltipEllipsis.js";
import { LinkContext } from "../../../config/link.context.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
import { button, buttonSize, buttonContent, buttonIconSize, buttonTypography } from "./button.cva.js";
const Button = ({
  icon: Icon,
  iconPosition,
  children,
  isLoading,
  className,
  link,
  iconClassName,
  noDisableWhenLoading,
  disableTooltip,
  ...props
}) => {
  const linkContext = LinkContext.useLinkContext();
  const uiStyle = UIStyle.useConfig();
  const buttonCva = uiStyle?.button?.cva ?? button;
  const buttonSizeCva = uiStyle?.button?.sizeCva ?? buttonSize;
  const buttonContentCva = uiStyle?.button?.contentCva ?? buttonContent;
  const buttonIconSizeCva = uiStyle?.button?.iconSize ?? buttonIconSize;
  const typographyMap = uiStyle?.button?.typography ?? buttonTypography;
  const Component = (() => {
    if (link) {
      return linkContext?.LinkComponent ?? Link;
    }
    if (props.toggle != null) {
      return ToggleButton;
    }
    return Button$1;
  })();
  if (link && !link.to && link.href) {
    link.to = link.href;
  }
  return /* @__PURE__ */ jsx(
    TooltipEllipsis,
    {
      text: children,
      isDisabled: disableTooltip,
      children: (onContentRef) => /* @__PURE__ */ jsx(
        Component,
        {
          ...props,
          ...link,
          isDisabled: props.isDisabled || isLoading && !noDisableWhenLoading,
          className: clsx(buttonCva({ ...props, className }), buttonSizeCva({ ...props })),
          children: /* @__PURE__ */ jsx(
            ButtonContent,
            {
              isLoading,
              icon: Icon,
              text: children,
              ref: onContentRef,
              hideText: props.iconOnly,
              iconPosition,
              iconClassName: buttonIconSizeCva({ ...props, className: iconClassName }),
              className: buttonContentCva({ ...props, iconPosition: !Icon ? "none" : iconPosition }),
              typography: typographyMap({ ...props })
            }
          )
        }
      )
    }
  );
};
export {
  Button
};
