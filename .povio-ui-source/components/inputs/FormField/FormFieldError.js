import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Typography } from "../../text/Typography/Typography.js";
const FormFieldError = ({ error, isDisabled, isHidden, className }) => {
  return /* @__PURE__ */ jsx(
    Typography,
    {
      className: clsx("text-text-error-1", !error || isDisabled || isHidden ? "sr-only" : "mt-1-5", className),
      size: "label-3",
      children: error
    }
  );
};
export {
  FormFieldError
};
