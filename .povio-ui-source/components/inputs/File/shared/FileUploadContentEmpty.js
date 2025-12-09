import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { UploadIcon } from "../../../../assets/icons/Upload.js";
import { Button } from "../../../buttons/Button/Button.js";
import { TextButton } from "../../../buttons/TextButton/TextButton.js";
import { Typography } from "../../../text/Typography/Typography.js";
const FileUploadContentEmpty = ({
  variant,
  as,
  isDisabled,
  title,
  browseText,
  uploadText,
  singleFile,
  hideButton = false,
  className
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("flex w-full items-center gap-file-upload-content-gap-text-to-text", className, {
        "flex-col": variant === "vertical",
        "min-h-11 flex-row justify-between": variant === "horizontal"
      }),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx("flex items-center gap-file-upload-content-gap-icon-to-content", {
              "flex-col": variant === "vertical",
              "flex-row": variant === "horizontal",
              "opacity-50": isDisabled
            }),
            children: [
              /* @__PURE__ */ jsx(UploadIcon, { className: "h-6 w-6 text-text-default-1" }),
              /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "prominent-1",
                  size: "label-1",
                  as: "span",
                  className: clsx("self-stretch text-text-default-1", {
                    "text-center": variant === "vertical"
                  }),
                  children: title
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx("flex items-center justify-center", {
              "flex-col": variant === "vertical" && as === "button",
              "gap-file-upload-content-gap-text-to-text": as === "link",
              "gap-file-upload-content-gap-content-to-button": as === "button"
            }),
            children: [
              /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "default",
                  size: singleFile ? "label-2" : "label-3",
                  as: "span",
                  className: clsx("text-text-default-2", {
                    "text-center": variant === "vertical",
                    "opacity-50": isDisabled
                  }),
                  children: uploadText
                }
              ),
              !hideButton && browseText && (as === "link" ? /* @__PURE__ */ jsx(TextButton, { className: "text-interactive-text-primary-idle lowercase", children: browseText }) : /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outlined",
                  size: "xs",
                  width: "hug",
                  isDisabled,
                  children: browseText
                }
              ))
            ]
          }
        )
      ]
    }
  );
};
export {
  FileUploadContentEmpty
};
