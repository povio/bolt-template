import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { FileTrigger, DropZone } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { UploadIcon } from "../../../../assets/icons/Upload.js";
import { Button } from "../../../buttons/Button/Button.js";
import { TextButton } from "../../../buttons/TextButton/TextButton.js";
import { inputSize } from "../../shared/input.cva.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { ns } from "../../../../config/i18n.js";
import { UIStyle } from "../../../../config/uiStyle.context.js";
import { inputUploadButton, inputUploadDropZone } from "./inputUploadButton.cva.js";
const InputUploadContent = (props) => {
  const { variant, isDisabled, error, ...rest } = props;
  const { t } = useTranslation(ns);
  const uiStyle = UIStyle.useConfig();
  const inputSizeCva = uiStyle?.input?.sizeCva ?? inputSize;
  return /* @__PURE__ */ jsx(FileTrigger, { ...rest, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-rac": "",
      "data-disabled": isDisabled || void 0,
      "data-invalid": !!error || void 0,
      className: inputUploadButton({
        variant,
        className: "group/input-upload"
      }),
      children: [
        /* @__PURE__ */ jsxs(
          DropZone,
          {
            ...rest,
            isDisabled,
            className: clsx(inputUploadDropZone({ variant }), inputSizeCva({ size: "default" })),
            children: [
              /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "default",
                  size: "label-1",
                  as: "span",
                  className: "min-w-0 flex-fill select-none truncate text-text-default-3",
                  children: t(($) => $.ui.fileUpload.emptyText)
                }
              ),
              variant === "nested" && /* @__PURE__ */ jsx(
                TextButton,
                {
                  isDisabled,
                  icon: UploadIcon,
                  children: t(($) => $.ui.fileUpload.upload)
                }
              )
            ]
          }
        ),
        variant !== "nested" && /* @__PURE__ */ jsx(
          Button,
          {
            size: "s",
            width: "hug",
            isDisabled,
            className: "truncate",
            children: t(($) => $.ui.fileUpload.uploadFile)
          }
        )
      ]
    }
  ) });
};
export {
  InputUploadContent
};
