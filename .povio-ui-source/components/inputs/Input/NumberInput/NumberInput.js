import { jsx } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { useRef } from "react";
import { useNumberField } from "react-aria";
import { useLocale, Input } from "react-aria-components";
import { Controller } from "react-hook-form";
import { useNumberFieldState } from "react-stately";
import { FormField } from "../../FormField/FormField.js";
import { InputContent } from "../shared/InputContent.js";
import { useInputCva } from "../../shared/input.cva.js";
import { TooltipWrapper } from "../../shared/TooltipWrapper.js";
import { UIConfig } from "../../../../config/uiConfig.context.js";
const NumberInputBase = (props) => {
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
    formatOptions = ui.numberInput.formatOptions,
    variant = ui.input.variant,
    as = ui.input.as,
    size = ui.input.size,
    hideLabel = ui.input.hideLabel,
    isClearable = ui.input.isClearable,
    ...rest
  } = props;
  const numberFieldRef = useRef(null);
  const { locale } = useLocale();
  const numberProps = {
    ...rest,
    value: value ?? void 0,
    label,
    isDisabled,
    isInvalid: !!error,
    isRequired,
    onChange,
    onBlur,
    locale,
    formatOptions
  };
  const state = useNumberFieldState(numberProps);
  const { labelProps, inputProps } = useNumberField(numberProps, state, numberFieldRef);
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
    isClearable
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
          className: clsx("group w-full", className),
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
                  "data-is-empty": value === null || value === void 0 || void 0,
                  placeholder: as === "floating" ? "" : inputProps.placeholder,
                  className: inputCva({
                    variant,
                    as,
                    size,
                    ...rest,
                    className: inputClassName
                  }),
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
const NumberInput = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          NumberInputBase,
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
  return /* @__PURE__ */ jsx(NumberInputBase, { ...props });
};
export {
  NumberInput
};
