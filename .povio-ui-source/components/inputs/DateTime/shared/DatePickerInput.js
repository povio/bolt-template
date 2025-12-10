import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { now, getLocalTimeZone, today } from "@internationalized/date";
import { clsx } from "clsx";
import { useState, useRef, useCallback, useMemo } from "react";
import { useHover, useFocusWithin, useFocusVisible } from "react-aria";
import useMeasure from "react-use-measure";
import { CalendarIcon } from "../../../../assets/icons/Calendar.js";
import { DateTimeIcon } from "../../../../assets/icons/DateTime.js";
import { TodayIcon } from "../../../../assets/icons/Today.js";
import { IconButton } from "../../../buttons/IconButton/IconButton.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { DateField } from "./DateField.js";
import { FormFieldLabel } from "../../FormField/FormFieldLabel.js";
import { InputClear } from "../../shared/InputClear.js";
import { useInputCva, inputSide } from "../../shared/input.cva.js";
import { UIStyle } from "../../../../config/uiStyle.context.js";
const DatePickerInput = ({
  ref,
  as,
  groupProps,
  fieldProps,
  endFieldProps,
  buttonProps,
  isDisabled,
  isInvalid,
  disableDropdown,
  variant,
  size,
  isDateTime,
  isClearable,
  headerProps,
  todayIcon,
  ...props
}) => {
  const inputCva = useInputCva();
  const uiStyle = UIStyle.useConfig();
  const inputSideCva = uiStyle?.input?.sideCva ?? inputSide;
  const [canClear, setCanClear] = useState(false);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const [isFocused, setIsFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({ onFocusWithinChange: setIsFocused });
  const { isFocusVisible } = useFocusVisible();
  const dateFieldRef = useRef(null);
  const endDateFieldRef = useRef(null);
  const [labelContentRef, { width: labelWidth }] = useMeasure();
  const onClearChange = useCallback((canClearInput) => {
    setCanClear(canClearInput);
  }, []);
  const onClear = () => {
    dateFieldRef.current?.clearField();
    fieldProps.onChange?.(null);
    const timeout = setTimeout(() => {
      endDateFieldRef.current?.clearField();
      clearTimeout(timeout);
    }, 0);
    setCanClear(false);
  };
  const onToday = () => {
    if (isDateTime) {
      fieldProps.onChange?.(now(getLocalTimeZone()));
      if (endFieldProps) {
        endFieldProps.onChange?.(now(getLocalTimeZone()));
      }
    } else {
      fieldProps.onChange?.(today(getLocalTimeZone()));
      if (endFieldProps) {
        endFieldProps.onChange?.(today(getLocalTimeZone()));
      }
    }
  };
  const hidePlaceholder = as === "floating" && !fieldProps.value && !isFocused;
  const style = useMemo(() => {
    const paddingLeft = as === "filter" ? `calc(var(${inputSideCva({ size, type: "var" })}) + ${labelWidth}px)` : "0px";
    return {
      paddingLeft
    };
  }, [labelWidth, as, size, inputSideCva]);
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
      "data-is-empty": fieldProps.value === null || void 0,
      "data-focus-within": isFocused || void 0,
      "data-focus-visible": isFocused && isFocusVisible || void 0,
      "data-has-selection": fieldProps.value !== null || void 0,
      ...groupProps,
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
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-2",
              style,
              children: [
                todayIcon && /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    label: "",
                    icon: TodayIcon,
                    size: "none",
                    onPress: onToday
                  }
                ),
                /* @__PURE__ */ jsx(
                  DateField,
                  {
                    ref: dateFieldRef,
                    ...fieldProps,
                    isDisabled,
                    isInvalid,
                    onClearChange,
                    hidePlaceholder
                  }
                ),
                endFieldProps && /* @__PURE__ */ jsxs(Fragment, { children: [
                  !((as === "floating" || as === "filter") && hidePlaceholder) && /* @__PURE__ */ jsx("span", { className: "select-none", children: "–" }),
                  /* @__PURE__ */ jsx(
                    DateField,
                    {
                      ref: endDateFieldRef,
                      ...endFieldProps,
                      isDisabled,
                      isInvalid,
                      onClearChange,
                      hidePlaceholder
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-2", as === "floating" && "-mt-4"), children: [
          isClearable && canClear && /* @__PURE__ */ jsx(InputClear, { onClear }),
          !disableDropdown && /* @__PURE__ */ jsx(
            InlineIconButton,
            {
              label: "",
              color: "secondary",
              ...buttonProps,
              icon: isDateTime ? DateTimeIcon : CalendarIcon,
              isDisabled
            }
          )
        ] })
      ]
    }
  );
};
export {
  DatePickerInput
};
