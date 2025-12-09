import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { isValidElement } from "react";
import { buttonContent } from "./buttonContent.cva.js";
import { Loader } from "../../status/Loader/Loader.js";
import { Typography } from "../../text/Typography/Typography.js";
const ButtonContent = ({
  ref,
  text,
  isLoading,
  className,
  icon: Icon,
  iconClassName,
  hideText,
  iconPosition,
  typography
}) => {
  let iconOrLoader = null;
  if (isLoading) {
    iconOrLoader = /* @__PURE__ */ jsx(Loader, { className: "shrink-0" });
  } else if (Icon) {
    if (isValidElement(Icon)) {
      iconOrLoader = Icon;
    } else {
      iconOrLoader = /* @__PURE__ */ jsx(Icon, { className: clsx("shrink-0", iconClassName) });
    }
  }
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: buttonContent({
        iconPosition: iconOrLoader ? iconPosition : null,
        className
      }),
      children: [
        iconOrLoader,
        /* @__PURE__ */ jsx(
          Typography,
          {
            as: "span",
            ...{ size: "label-2", variant: "prominent-1", ...typography },
            className: clsx("hyphens-auto md:truncate", hideText && "sr-only"),
            ref,
            children: text
          }
        )
      ]
    }
  );
};
export {
  ButtonContent
};
