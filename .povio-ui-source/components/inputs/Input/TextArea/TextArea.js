import { jsx, jsxs } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { useRef } from "react";
import { useTextField } from "react-aria";
import { TextArea as TextArea$1 } from "react-aria-components";
import { Controller } from "react-hook-form";
import { FormField } from "../../FormField/FormField.js";
import { FormFieldLabel } from "../../FormField/FormFieldLabel.js";
import { InputClear } from "../../shared/InputClear.js";
import { useInputCva, inputSize } from "../../shared/input.cva.js";
import { TooltipWrapper } from "../../shared/TooltipWrapper.js";
import { UIConfig } from "../../../../config/uiConfig.context.js";
import { UIStyle } from "../../../../config/uiStyle.context.js";
const TextAreaBase = (props) => {
  const ui = UIConfig.useConfig();
  const inputCva = useInputCva();
  const uiStyle = UIStyle.useConfig();
  const inputSizeCva = uiStyle?.input?.sizeCva ?? inputSize;
  const {
    ref,
    className,
    inputClassName,
    error,
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isDisabled,
    headerClassName,
    errorClassName,
    isHeaderHidden,
    value,
    onChange,
    onBlur,
    as = ui.input.as,
    hideLabel = ui.input.hideLabel,
    variant = ui.input.variant,
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
  const showClear = isClearable && !!value;
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
          className: clsx("w-full", className),
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "group/text-area relative h-full",
              "data-text-area": true,
              children: [
                as === "floating" && headerProps && /* @__PURE__ */ jsx(
                  FormFieldLabel,
                  {
                    as,
                    ...headerProps
                  }
                ),
                /* @__PURE__ */ jsx(
                  TextArea$1,
                  {
                    ...inputProps,
                    "data-is-empty": value?.trim() === "" || value === null || value === void 0 || void 0,
                    placeholder: as === "floating" ? "" : inputProps.placeholder,
                    className: inputCva({
                      variant,
                      as,
                      ...rest,
                      className: clsx("block h-full min-h-8", inputClassName)
                    }),
                    ref
                  }
                ),
                showClear && /* @__PURE__ */ jsx("span", { className: clsx("absolute top-0 right-0", inputSizeCva({ size: "default" })), children: /* @__PURE__ */ jsx(InputClear, { onClear: () => onChange?.("") }) })
              ]
            }
          )
        }
      )
    }
  );
};
const TextArea = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          TextAreaBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: field.value ?? "",
            onChange: field.onChange,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(TextAreaBase, { ...props });
};
export {
  TextArea
};
