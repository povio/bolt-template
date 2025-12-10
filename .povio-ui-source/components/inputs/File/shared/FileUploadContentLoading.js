import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../../../assets/icons/Close.js";
import { FileIcon } from "../../../../assets/icons/File.js";
import { Button } from "../../../buttons/Button/Button.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { ns } from "../../../../config/i18n.js";
import { FileUtils } from "../../../../utils/file.utils.js";
import { ProgressBar } from "./ProgressBar.js";
const FileUploadContentLoading = ({
  index,
  variant,
  as,
  state,
  isDisabled,
  singleFile,
  onCancel
}) => {
  const { t } = useTranslation(ns);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("flex w-full flex-col items-center", {
        "flex-col": variant === "vertical",
        "flex-row": variant === "horizontal",
        "gap-file-upload-content-gap-content-to-button": as === "button"
      }),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx("flex w-full items-center justify-between", {
              "flex-col gap-file-upload-content-gap-text-to-progress": variant === "vertical",
              "flex-row gap-file-upload-content-gap-left-to-right-content": variant === "horizontal",
              "opacity-50": isDisabled
            }),
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: clsx("flex items-center gap-file-upload-content-gap-icon-to-content", {
                    "w-full flex-col": variant === "vertical",
                    "w-1/2": variant === "horizontal"
                  }),
                  children: [
                    /* @__PURE__ */ jsx(FileIcon, { className: "h-6 w-6 text-text-default-1" }),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: clsx("flex flex-col", {
                          "max-w-full gap-file-upload-content-gap-icon-to-content text-center": variant === "vertical",
                          "max-w-[calc(100%-32px)] gap-file-upload-content-gap-text-to-text": variant === "horizontal"
                        }),
                        children: [
                          /* @__PURE__ */ jsx(
                            Typography,
                            {
                              variant: "prominent-1",
                              size: "label-1",
                              as: "span",
                              className: "self-stretch truncate text-center text-text-default-1",
                              children: state.file.name
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            Typography,
                            {
                              variant: "default",
                              size: singleFile ? "label-2" : "label-3",
                              as: "span",
                              className: "text-text-default-2",
                              children: FileUtils.getCalculatedFileSize(state.file)
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: clsx("flex items-center gap-1", {
                    "w-1/2": variant === "horizontal",
                    "w-full": variant === "vertical"
                  }),
                  children: [
                    /* @__PURE__ */ jsx(ProgressBar, { progress: state.progress }),
                    (as === "link" || variant === "horizontal") && /* @__PURE__ */ jsx(
                      InlineIconButton,
                      {
                        label: "Cancel",
                        color: "secondary",
                        onPress: () => {
                          onCancel(index);
                        },
                        icon: CloseIcon
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        as === "button" && variant === "vertical" && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outlined",
            size: "xs",
            color: "secondary",
            width: "hug",
            onPress: () => {
              onCancel(index);
            },
            children: t(($) => $.ui.fileUpload.cancel)
          }
        )
      ]
    }
  );
};
export {
  FileUploadContentLoading
};
