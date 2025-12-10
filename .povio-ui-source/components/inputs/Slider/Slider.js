import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { Slider as Slider$1, SliderTrack, SliderThumb } from "react-aria-components";
import { Controller } from "react-hook-form";
import { FormField } from "../FormField/FormField.js";
import { uiOutlineClass } from "../../outline.clsx.js";
import { Typography } from "../../text/Typography/Typography.js";
import { UIConfig } from "../../../config/uiConfig.context.js";
const SliderBase = (props) => {
  const ui = UIConfig.useConfig();
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
    unit,
    hideLabel = ui.input.hideLabel,
    minValue = ui.slider.minValue,
    maxValue = ui.slider.maxValue,
    ...rest
  } = props;
  const formFieldProps = {
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
  const defaultValue = props.defaultValue ?? (props.isRange ? [minValue, minValue] : minValue);
  const getTrackFillStyle = (state) => {
    const p0 = state.getThumbPercent(0);
    const p1 = state.getThumbPercent(1);
    return {
      left: props.isRange ? `${p0 * 100}%` : 0,
      width: props.isRange ? `${(p1 - p0) * 100}%` : `${p0 * 100}%`
    };
  };
  return /* @__PURE__ */ jsx(
    Slider$1,
    {
      ...rest,
      defaultValue,
      minValue,
      maxValue,
      isDisabled,
      children: /* @__PURE__ */ jsx(FormField, { ...formFieldProps, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs(
          Typography,
          {
            className: "min-w-10 px-slider-side-leading-and-trailing py-slider-height-leading-and-trailing text-text-default-3",
            size: "label-2",
            children: [
              minValue,
              unit
            ]
          }
        ),
        /* @__PURE__ */ jsx(SliderTrack, { className: "relative mx-2 h-6 w-full", children: ({ state }) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "-translate-y-1/2 absolute top-1/2 h-1 w-full overflow-hidden rounded-full bg-elevation-outline-default-1", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "absolute top-0 h-1 rounded-full",
                props.isDisabled ? "bg-interactive-contained-primary-disabled" : "bg-interactive-contained-primary-idle"
              ),
              style: getTrackFillStyle(state)
            }
          ) }),
          state.values.map((_, i) => /* @__PURE__ */ jsx(
            SliderThumb,
            {
              index: i,
              className: clsx(
                "absolute top-1/2 size-4 cursor-pointer rounded-full bg-interactive-contained-primary-idle disabled:cursor-default",
                "dragging:bg-interactive-contained-primary-pressed hover:bg-interactive-contained-primary-hover focus-visible:outline-interactive-contained-primary-focus disabled:bg-interactive-contained-primary-disabled",
                uiOutlineClass
              ),
              isDisabled
            },
            i
          ))
        ] }) }),
        /* @__PURE__ */ jsxs(
          Typography,
          {
            className: "min-w-10 px-slider-side-leading-and-trailing py-slider-height-leading-and-trailing text-text-default-3",
            size: "label-2",
            children: [
              maxValue,
              unit
            ]
          }
        )
      ] }) })
    }
  );
};
const Slider = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          SliderBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: field.value,
            onChange: field.onChange,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(SliderBase, { ...props });
};
export {
  Slider
};
