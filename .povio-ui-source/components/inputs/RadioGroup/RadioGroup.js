import { jsx, jsxs } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { RadioGroup as RadioGroup$1, Radio } from "react-aria-components";
import { Controller } from "react-hook-form";
import { FormField } from "../FormField/FormField.js";
import { radio, radioTypography, radioIndicatorClass } from "./radio.cva.js";
import { CheckContent } from "../shared/CheckContent.js";
import { UIConfig } from "../../../config/uiConfig.context.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const RadioGroupBase = (props) => {
  const ui = UIConfig.useConfig();
  const uiStyle = UIStyle.useConfig();
  const radioCva = uiStyle?.radio?.cva ?? radio;
  const radioTypographyMap = uiStyle?.radio?.typography ?? radioTypography;
  const {
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
    options,
    variant = ui.radioGroup.variant,
    hideLabel = ui.radioGroup.hideLabel,
    ...rest
  } = props;
  const formFieldProps = {
    className,
    error,
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden,
    hideLabel,
    isDisabled,
    headerClassName,
    errorClassName
  };
  return /* @__PURE__ */ jsx(
    RadioGroup$1,
    {
      ...rest,
      isDisabled,
      isInvalid: !!error,
      children: /* @__PURE__ */ jsx(FormField, { ...formFieldProps, children: /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: options.map((option) => /* @__PURE__ */ jsxs(
        Radio,
        {
          value: option.value,
          className: radioIndicatorClass,
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: radioCva({
                  variant,
                  ...rest
                })
              }
            ),
            /* @__PURE__ */ jsx(CheckContent, { typography: radioTypographyMap({ variant, ...rest }), children: option.label })
          ]
        },
        option.value
      )) }) })
    }
  );
};
const RadioGroup = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          RadioGroupBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: field.value,
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
  return /* @__PURE__ */ jsx(RadioGroupBase, { ...props });
};
export {
  RadioGroup
};
