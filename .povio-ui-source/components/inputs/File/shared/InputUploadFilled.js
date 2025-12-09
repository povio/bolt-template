import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { CloseIcon } from "../../../../assets/icons/Close.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { inputSize } from "../../shared/input.cva.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { UIStyle } from "../../../../config/uiStyle.context.js";
const InputUploadFilled = ({ files, onRemove, isDisabled }) => {
  const uiStyle = UIStyle.useConfig();
  const inputSizeCva = uiStyle?.input?.sizeCva ?? inputSize;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-center rounded-input-rounding-default border border-input-outlined-outline-idle border-solid bg-input-outlined-idle",
        inputSizeCva({ size: "default" })
      ),
      children: [
        /* @__PURE__ */ jsx(
          Typography,
          {
            variant: "default",
            size: "label-1",
            as: "span",
            className: "flex-fill select-none truncate text-ellipsis text-text-default-1",
            children: files.map((file) => file.name).join(", ")
          }
        ),
        /* @__PURE__ */ jsx(
          InlineIconButton,
          {
            label: "Remove files",
            color: "secondary",
            icon: CloseIcon,
            isDisabled,
            onPress: onRemove
          }
        )
      ]
    }
  );
};
export {
  InputUploadFilled
};
