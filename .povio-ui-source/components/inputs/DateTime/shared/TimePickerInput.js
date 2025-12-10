import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useState, useMemo } from "react";
import { useHover, useFocusWithin, useFocusVisible } from "react-aria";
import useMeasure from "react-use-measure";
import { ClockIcon } from "../../../../assets/icons/Clock.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { TimeField } from "./TimeField.js";
import { FormFieldLabel } from "../../FormField/FormFieldLabel.js";
import { InputClear } from "../../shared/InputClear.js";
import { useInputCva, inputSide } from "../../shared/input.cva.js";
import { UIStyle } from "../../../../config/uiStyle.context.js";
const TimePickerInput = ({
  ref,
  as,
  fieldProps,
  state,
  isDisabled,
  isInvalid,
  disableDropdown,
  variant,
  size,
  isClearable,
  headerProps,
  onPress,
  ...props
}) => {
  const inputCva = useInputCva();
  const uiStyle = UIStyle.useConfig();
  const inputSideCva = uiStyle?.input?.sideCva ?? inputSide;
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const [isFocused, setIsFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({ onFocusWithinChange: setIsFocused });
  const { isFocusVisible } = useFocusVisible();
  const [labelContentRef, { width: labelWidth }] = useMeasure();
  const hidePlaceholder = as === "floating" && !state.value && !isFocused;
  const style = useMemo(() => {
    const paddingLeft = as === "filter" ? `calc(var(${inputSideCva({ size, type: "var" })}) + ${labelWidth}px)` : "0px";
    return {
      paddingLeft
    };
  }, [labelWidth, as, size, inputSideCva]);
  const canClear = state.segments.some((segment) => segment.type !== "literal" && segment.isPlaceholder === false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: inputCva({
        variant,
        as,
        size,
        ...props,
        className: clsx(
          "group/date-picker-content relative flex min-w-input-width-min-width items-center justify-between gap-2"
        )
      }),
      "data-rac": "",
      "data-hovered": isHovered || void 0,
      "data-disabled": isDisabled || void 0,
      "data-invalid": isInvalid || void 0,
      "data-is-empty": state.value === null || void 0,
      "data-focus-within": isFocused || void 0,
      "data-focus-visible": isFocused && isFocusVisible || void 0,
      "data-has-selection": state.value !== null || void 0,
      ...fieldProps,
      ...focusWithinProps,
      ...hoverProps,
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          as && ["filter", "floating"].includes(as) && headerProps && /* @__PURE__ */ jsx(
            FormFieldLabel,
            {
              ref: labelContentRef,
              as,
              ...headerProps
            }
          ),
          /* @__PURE__ */ jsx("div", { style, children: /* @__PURE__ */ jsx(
            TimeField,
            {
              fieldProps,
              state,
              isDisabled,
              hidePlaceholder
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx("flex items-center gap-2", {
              "-mt-4": as === "floating"
            }),
            children: [
              isClearable && canClear && /* @__PURE__ */ jsx(InputClear, { onClear: () => state.setValue(null) }),
              !disableDropdown && /* @__PURE__ */ jsx(
                InlineIconButton,
                {
                  label: "",
                  color: "secondary",
                  onPress,
                  icon: ClockIcon,
                  isDisabled
                }
              )
            ]
          }
        )
      ]
    }
  );
};
export {
  TimePickerInput
};
