import { jsx } from "react/jsx-runtime";
import { ToggleButton, Button } from "react-aria-components";
import { CloseIcon } from "../../../assets/icons/Close.js";
import { pillButton, pillButtonTypography, pillButtonIconSize, pillButtonContent } from "./pillButton.cva.js";
import { ButtonContent } from "../shared/ButtonContent.js";
import { TooltipEllipsis } from "../../overlays/Tooltip/TooltipEllipsis.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const PillButton = ({ children, dismissable, toggle, icon, iconPosition, ...props }) => {
  const uiStyle = UIStyle.useConfig();
  const pillButtonCva = uiStyle?.pillButton?.cva ?? pillButton;
  const pillButtonTypographyMap = uiStyle?.pillButton?.typography ?? pillButtonTypography;
  const Component = toggle ? ToggleButton : Button;
  const getIconPosition = () => {
    if (dismissable) {
      return "right";
    }
    return icon ? iconPosition : "none";
  };
  return /* @__PURE__ */ jsx(TooltipEllipsis, { text: children, children: (onContentRef) => /* @__PURE__ */ jsx(
    Component,
    {
      ...props,
      className: pillButtonCva({
        ...props,
        className: props.className
      }),
      children: /* @__PURE__ */ jsx(
        ButtonContent,
        {
          text: children,
          ref: onContentRef,
          icon: dismissable ? CloseIcon : icon,
          iconPosition: dismissable ? "right" : iconPosition,
          className: pillButtonContent({ iconPosition: getIconPosition() }),
          iconClassName: pillButtonIconSize,
          typography: pillButtonTypographyMap({ ...props })
        }
      )
    }
  ) });
};
export {
  PillButton
};
