import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { alert } from "./alert.cva.js";
import { Loader } from "../Loader/Loader.js";
import { statusIcon, statusSeparator } from "../shared/status.cva.js";
import { Typography } from "../../text/Typography/Typography.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const Alert = ({
  variant,
  color,
  text,
  isLoading = false,
  rightContent,
  hasSeparator,
  icon: Icon,
  className
}) => {
  const uiStyle = UIStyle.useConfig();
  const alertCva = uiStyle?.alert?.cva ?? alert;
  const iconCva = uiStyle?.status?.iconCva ?? statusIcon;
  const separatorCva = uiStyle?.status?.separatorCva ?? statusSeparator;
  return /* @__PURE__ */ jsx("div", { className: alertCva({ variant, color, className }), children: /* @__PURE__ */ jsxs("div", { className: "flex w-auto flex-col items-center md:flex-row", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full items-start gap-alert-gap-icon-to-text px-alert-side-default py-alert-height-content", children: [
      isLoading && /* @__PURE__ */ jsx(
        Loader,
        {
          size: "default",
          className: "shrink-0"
        }
      ),
      !isLoading && Icon && /* @__PURE__ */ jsx(Icon, { className: iconCva({ variant, color }) }),
      /* @__PURE__ */ jsx(Typography, { size: "label-2", children: text })
    ] }),
    !!rightContent && /* @__PURE__ */ jsxs(Fragment, { children: [
      hasSeparator && /* @__PURE__ */ jsx("div", { className: separatorCva({ variant, color }) }),
      /* @__PURE__ */ jsx("div", { className: "flex w-full shrink-0 flex-wrap items-center justify-end gap-alert-gap-action px-alert-side-default py-alert-height-actions-mobile md:w-auto md:justify-center md:py-alert-height-actions-desktop", children: rightContent })
    ] })
  ] }) });
};
export {
  Alert
};
