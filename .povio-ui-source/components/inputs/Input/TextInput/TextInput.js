import { jsx } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { useRef } from "react";
import { useTextField } from "react-aria";
import { Input } from "react-aria-components";
import { Controller } from "react-hook-form";
import { FormField } from "../../FormField/FormField.js";
import { InputContent } from "../shared/InputContent.js";
import { useInputCva } from "../../shared/input.cva.js";
import { TooltipWrapper } from "../../shared/TooltipWrapper.js";
import { UIConfig } from "../../../../config/uiConfig.context.js";
const TextInputBase = (props) => {
  const ui = UIConfig.useConfig();
  const inputCva = useInputCva();
  const {
    ref,
    inputClassName,
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isDisabled,
    headerClassName,
    errorClassName,
    isHeaderHidden,
    error,
    className,
    unit,
    isLoading,
    action,
    leadingIcon,
    trailingIcon,
    value,
    onChange,
    onBlur,
    as = ui.input.as,
    hideLabel = ui.input.hideLabel,
    variant = ui.input.variant,
    size = ui.input.size,
    isClearable = ui.input.isClearable,
    ...rest
  } = props;
  const textFieldRef = useRef(null);
  const textFieldProps = {
    ...rest,
    label,
    isDisabled,
    isInvalid: !!error,
    isRequired,
    value,
    onChange,
    onBlur
  };
  const { labelProps, inputProps } = useTextField(textFieldProps, textFieldRef);
  const formFieldProps = {
    error,
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden: isHeaderHidden || as === "inline" || as === "filter" || as === "floating",
    hideLabel,
    isDisabled,
    headerClassName,
    errorClassName
  };
  const inputContentProps = {
    unit,
    isLoading,
    isDisabled,
    action,
    leadingIcon,
    trailingIcon,
    isClearable,
    value,
    onChange
  };
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
  return /* @__PURE__ */ jsx(
    TooltipWrapper,
    {
      as,
      error,
      children: /* @__PURE__ */ jsx(
        FormField,
        {
          ...formFieldProps,
          as,
          labelProps,
          className: clsx(
            "group w-full",
            {
              "h-full": as === "inline"
            },
            className
          ),
          children: /* @__PURE__ */ jsx(
            InputContent,
            {
              ...inputContentProps,
              headerProps,
              as,
              size,
              children: (style) => /* @__PURE__ */ jsx(
                Input,
                {
                  ...inputProps,
                  ref,
                  "data-is-empty": value === "" || value === null || value === void 0 || void 0,
                  placeholder: as === "floating" ? "" : inputProps.placeholder,
                  className: inputCva({ variant, as, size, ...rest, className: inputClassName }),
                  style
                }
              )
            }
          )
        }
      )
    }
  );
};
const TextInput = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          TextInputBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(TextInputBase, { ...props });
};
export {
  TextInput
};
