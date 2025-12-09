import { jsxs, jsx } from "react/jsx-runtime";
import { FormFieldError } from "./FormFieldError.js";
import { FormFieldHeader } from "./FormFieldHeader.js";
const FormField = ({
  ref,
  as,
  label,
  tooltipText,
  helperText,
  isRequired,
  rightContent,
  isDisabled,
  error,
  hideLabel,
  headerClassName,
  errorClassName,
  children,
  className,
  labelProps,
  isHeaderHidden
}) => {
  const headerProps = {
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden: hideLabel || isHeaderHidden,
    isDisabled,
    className: headerClassName,
    labelProps
  };
  const errorProps = {
    error,
    isDisabled,
    isHidden: isHeaderHidden,
    className: errorClassName
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className,
      children: [
        !["filter", "floating"].includes(as ?? "") && /* @__PURE__ */ jsx(FormFieldHeader, { ...headerProps }),
        children,
        /* @__PURE__ */ jsx(FormFieldError, { ...errorProps })
      ]
    }
  );
};
export {
  FormField
};
