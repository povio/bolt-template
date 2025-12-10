import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Label } from "react-aria-components";
import { inputSide } from "../shared/input.cva.js";
import { labelTypography, labelBase } from "../shared/label.cva.js";
import { Typography } from "../../text/Typography/Typography.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const FormFieldLabel = ({ ref, as, label, isRequired, isDisabled, labelProps, size }) => {
  const uiStyle = UIStyle.useConfig();
  const labelTypographyMap = uiStyle?.label?.typography ?? labelTypography;
  const labelBaseCva = uiStyle?.label?.cva ?? labelBase;
  const inputSideCva = uiStyle?.input?.sideCva ?? inputSide;
  return /* @__PURE__ */ jsx(Label, { ...labelProps, children: /* @__PURE__ */ jsxs(
    Typography,
    {
      ref,
      as: "span",
      ...{
        size: "label-2",
        variant: "prominent-1",
        ...labelTypographyMap({ as })
      },
      className: clsx(
        labelBaseCva({ as }),
        as && ["filter", "floating"].includes(as) && inputSideCva({ size, type: "left" }),
        labelProps?.className
      ),
      children: [
        label,
        isRequired && /* @__PURE__ */ jsx("span", { className: clsx(!isDisabled && "text-text-error-1"), children: "*" })
      ]
    }
  ) });
};
export {
  FormFieldLabel
};
