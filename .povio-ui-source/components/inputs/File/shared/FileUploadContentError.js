import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { clsx } from "clsx";
import { FileTrigger } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../../../assets/icons/Close.js";
import { WarningFilledIcon } from "../../../../assets/icons/WarningFilled.js";
import { Button } from "../../../buttons/Button/Button.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { TextButton } from "../../../buttons/TextButton/TextButton.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { ns } from "../../../../config/i18n.js";
const FileUploadContentError = ({
  variant,
  as,
  isDisabled,
  state,
  browseText,
  fileTriggerProps,
  removeWithIcon = false,
  singleFile,
  onRemove
}) => {
  const { t } = useTranslation(ns);
  return /* @__PURE__ */ jsx("div", { className: clsx("flex w-full flex-fill flex-col items-start"), children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("flex w-full items-center", {
        "flex-row gap-file-upload-content-gap-left-to-right-content": variant === "horizontal",
        "flex-col": variant === "vertical",
        "gap-file-upload-content-gap-content-to-button": variant === "vertical" && as === "button",
        "gap-file-upload-content-gap-text-to-text": variant === "vertical" && as === "link"
      }),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "flex min-w-0 max-w-full flex-grow items-center gap-file-upload-content-gap-icon-to-content",
              {
                "flex-col": variant === "vertical",
                "flex-row": variant === "horizontal",
                "opacity-50": isDisabled
              }
            ),
            children: [
              /* @__PURE__ */ jsx(WarningFilledIcon, { className: "h-6 w-6 text-elevation-fill-warning-1" }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: clsx("flex flex-col gap-file-upload-content-gap-text-to-text", {
                    "max-w-full items-center": variant === "vertical",
                    "max-w-[calc(100%_-_32px)]": variant === "horizontal"
                  }),
                  children: [
                    /* @__PURE__ */ jsx(
                      Typography,
                      {
                        variant: "prominent-1",
                        size: "label-1",
                        as: "span",
                        className: clsx("self-stretch truncate text-text-default-1", {
                          "text-center": variant === "vertical"
                        }),
                        children: state.file.name
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Typography,
                      {
                        variant: "default",
                        size: singleFile ? "label-2" : "label-3",
                        as: "span",
                        className: clsx("text-text-default-2", {
                          "text-center": variant === "vertical"
                        }),
                        children: state.error?.serverMessage ?? state.error?.message
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx("flex flex-none items-center justify-end", {
              "flex-col": variant === "vertical" && as === "button",
              "gap-file-upload-content-gap-text-to-text": as === "link",
              "gap-file-upload-content-gap-content-to-button": as === "button"
            }),
            children: as === "link" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              fileTriggerProps && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(FileTrigger, { ...fileTriggerProps, children: /* @__PURE__ */ jsx(TextButton, { className: "text-interactive-text-primary-idle", children: browseText ?? "" }) }),
                /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "default",
                    size: "label-2",
                    as: "span",
                    className: "text-text-default-2",
                    children: t(($) => $.ui.fileUpload.or)
                  }
                )
              ] }),
              removeWithIcon ? /* @__PURE__ */ jsx(
                InlineIconButton,
                {
                  label: "Cancel",
                  color: "secondary",
                  onPress: () => {
                    onRemove(state.id ?? "");
                  },
                  icon: CloseIcon
                }
              ) : /* @__PURE__ */ jsx(
                TextButton,
                {
                  className: "text-interactive-text-primary-idle lowercase",
                  onPress: () => {
                    onRemove(state.id ?? "");
                  },
                  children: t(($) => $.ui.fileUpload.removeFile)
                }
              )
            ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-file-upload-content-gap-button-to-button self-stretch", children: [
              fileTriggerProps && /* @__PURE__ */ jsx(FileTrigger, { ...fileTriggerProps, children: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outlined",
                  size: "xs",
                  width: "hug",
                  isDisabled,
                  children: browseText ?? ""
                }
              ) }),
              removeWithIcon ? /* @__PURE__ */ jsx(
                InlineIconButton,
                {
                  label: "Cancel",
                  color: "secondary",
                  onPress: () => {
                    onRemove(state.id ?? "");
                  },
                  icon: CloseIcon
                }
              ) : /* @__PURE__ */ jsx(
                TextButton,
                {
                  color: "secondary",
                  onPress: () => {
                    onRemove(state.id ?? "");
                  },
                  children: t(($) => $.ui.fileUpload.removeFile)
                }
              )
            ] })
          }
        )
      ]
    }
  ) });
};
export {
  FileUploadContentError
};
