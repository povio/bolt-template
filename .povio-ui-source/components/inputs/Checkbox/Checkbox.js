import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { Checkbox as Checkbox$1 } from "react-aria-components";
import { Controller } from "react-hook-form";
import { checkboxTypography, checkboxIndicatorClass } from "./checkbox.cva.js";
import { FormFieldError } from "../FormField/FormFieldError.js";
import { CheckContent } from "../shared/CheckContent.js";
import { UIConfig } from "../../../config/uiConfig.context.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
import { CheckboxCheckmark } from "./CheckboxCheckmark.js";
const CheckboxBase = (props) => {
  const ui = UIConfig.useConfig();
  const uiStyle = UIStyle.useConfig();
  const checkboxTypographyMap = uiStyle?.checkbox?.typography ?? checkboxTypography;
  const {
    className,
    children,
    isDisabled,
    error,
    variant = ui.checkbox.variant,
    hideLabel = ui.input.hideLabel,
    ...rest
  } = props;
  const formFieldErrorProps = {
    error,
    isDisabled
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Checkbox$1,
      {
        ...rest,
        isDisabled,
        isInvalid: !!error,
        "aria-errormessage": error || void 0,
        className: clsx(checkboxIndicatorClass, className),
        children: [
          /* @__PURE__ */ jsx(
            CheckboxCheckmark,
            {
              variant,
              ...rest
            }
          ),
          !hideLabel && /* @__PURE__ */ jsx(CheckContent, { typography: checkboxTypographyMap({ variant, ...rest }), children })
        ]
      }
    ),
    /* @__PURE__ */ jsx(FormFieldError, { ...formFieldErrorProps })
  ] });
};
const Checkbox = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          CheckboxBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            isSelected: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            name: field.name,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(CheckboxBase, { ...props });
};
export {
  Checkbox
};
