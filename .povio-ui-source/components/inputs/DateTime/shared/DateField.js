import { jsx } from "react/jsx-runtime";
import { createCalendar } from "@internationalized/date";
import { useRef, useImperativeHandle, useEffect } from "react";
import { useLocale, useDateField } from "react-aria";
import { useDateFieldState } from "react-stately";
import { DateSegmentItem } from "./DateSegmentItem.js";
const DateField = ({ ref, onClearChange, hidePlaceholder, ...props }) => {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar
  });
  const dataFieldRef = useRef(null);
  const { fieldProps } = useDateField(props, state, dataFieldRef);
  const handleBlur = (e) => {
    fieldProps.onBlur?.(e);
    if (!state.value) {
      return;
    }
    const currentValue = state.value;
    const { year } = currentValue;
    if (year >= 0 && year <= 99) {
      const correctedYear = year <= 50 ? 2e3 + year : 1900 + year;
      const correctedDate = currentValue.set({ year: correctedYear });
      if (correctedDate) {
        state.setValue(correctedDate);
        props.onChange?.(correctedDate);
      }
    }
  };
  useImperativeHandle(ref, () => ({
    clearField: () => {
      state.setValue(null);
    }
  }));
  useEffect(() => {
    onClearChange?.(state.segments.some((segment) => segment.type !== "literal" && segment.isPlaceholder === false));
  }, [state.segments, onClearChange]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...fieldProps,
      ref: dataFieldRef,
      onBlur: handleBlur,
      className: "relative w-full",
      children: /* @__PURE__ */ jsx("div", { className: "flex", children: state.segments.map((segment, i) => /* @__PURE__ */ jsx(
        DateSegmentItem,
        {
          segment,
          state,
          isDisabled: props.isDisabled,
          hidePlaceholder
        },
        i
      )) })
    }
  );
};
export {
  DateField
};
