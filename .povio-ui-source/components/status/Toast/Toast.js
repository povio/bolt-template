import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { ToastContainer as ToastContainer$1 } from "react-toastify";
import { Button } from "../../buttons/Button/Button.js";
import { Loader } from "../Loader/Loader.js";
import { statusIcon, statusSeparator } from "../shared/status.cva.js";
import { toast, buttonColorVariant, toastWrapper, toastContainer } from "./toast.cva.js";
import { Typography } from "../../text/Typography/Typography.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const Toast = ({ text, isLoading = false, actions = [], icon: Icon, ...props }) => {
  const uiStyle = UIStyle.useConfig();
  const toastCva = uiStyle?.toast?.cva ?? toast;
  const buttonColor = uiStyle?.toast?.buttonColor ?? buttonColorVariant;
  const iconCva = uiStyle?.status?.iconCva ?? statusIcon;
  const separatorCva = uiStyle?.status?.separatorCva ?? statusSeparator;
  return /* @__PURE__ */ jsxs("div", { className: toastCva({ ...props }), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-toast-gap-icon-to-text px-toast-side-default py-toast-height-content", children: [
      isLoading && /* @__PURE__ */ jsx(
        Loader,
        {
          size: "default",
          className: "shrink-0"
        }
      ),
      !isLoading && Icon && /* @__PURE__ */ jsx(Icon, { className: iconCva({ ...props }) }),
      /* @__PURE__ */ jsx(Typography, { size: "label-2", children: text })
    ] }),
    actions.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: separatorCva({ ...props }) }),
      /* @__PURE__ */ jsx("div", { className: "flex w-full shrink-0 flex-wrap items-center justify-end gap-toast-gap-action px-toast-side-default py-toast-height-actions-mobile md:w-auto md:justify-center md:py-toast-height-actions-desktop", children: actions.map(({ text: buttonText, onPress }) => /* @__PURE__ */ jsx(
        Button,
        {
          onPress,
          ...buttonColor({ ...props }),
          variant: "text",
          size: "none",
          width: "hug",
          children: buttonText
        },
        buttonText
      )) })
    ] })
  ] });
};
const ToastContainer = () => {
  return /* @__PURE__ */ jsx(
    ToastContainer$1,
    {
      className: (params) => {
        return toastContainer({
          position: params?.position,
          className: params?.defaultClassName
        });
      },
      toastClassName: toastWrapper,
      autoClose: 2500,
      icon: false,
      closeButton: false,
      hideProgressBar: true
    }
  );
};
export {
  Toast,
  ToastContainer
};
