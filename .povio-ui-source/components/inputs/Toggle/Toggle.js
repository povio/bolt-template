import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { Switch } from "react-aria-components";
import { Controller } from "react-hook-form";
import { FormFieldError } from "../FormField/FormFieldError.js";
import { CheckContent } from "../shared/CheckContent.js";
import { toggle, toggleTypography } from "./toggle.cva.js";
import { UIConfig } from "../../../config/uiConfig.context.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const ToggleBase = (props) => {
  const ui = UIConfig.useConfig();
  const uiStyle = UIStyle.useConfig();
  const toggleCva = uiStyle?.toggle?.cva ?? toggle;
  const toggleTypographyMap = uiStyle?.toggle?.typography ?? toggleTypography;
  const { className, children, isDisabled, error, variant = ui.toggle.variant, ...rest } = props;
  const formFieldErrorProps = {
    error,
    isDisabled
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Switch,
      {
        ...rest,
        isDisabled,
        className: clsx("group flex items-center gap-2", !isDisabled && "cursor-pointer", className),
        children: [
          /* @__PURE__ */ jsx("div", { className: toggleCva({ variant, ...rest }) }),
          /* @__PURE__ */ jsx(CheckContent, { typography: toggleTypographyMap({ variant, ...rest }), children })
        ]
      }
    ),
    /* @__PURE__ */ jsx(FormFieldError, { ...formFieldErrorProps })
  ] });
};
const Toggle = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          ToggleBase,
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
  return /* @__PURE__ */ jsx(ToggleBase, { ...props });
};
export {
  Toggle
};
