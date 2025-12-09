import { jsxs, jsx } from "react/jsx-runtime";
import { Time } from "@internationalized/date";
import { useTimeFieldState } from "@react-stately/datepicker";
import { clsx } from "clsx";
import { useRef, useEffect } from "react";
import { useLocale, useTimeField, useDateSegment } from "react-aria";
import { ChevronDownIcon } from "../../../../assets/icons/ChevronDown.js";
import { ChevronUpIcon } from "../../../../assets/icons/ChevronUp.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { getPlaceholder } from "./DateSegmentItem.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { useBreakpoint } from "../../../../hooks/useBreakpoint.js";
import { useLongPressRepeat } from "../../../../hooks/useLongPressRepeat.js";
const INCREMENT_STEP_SIZE = 5;
const TimePickerForm = ({ state, datePickerState }) => {
  const isDesktop = useBreakpoint("md");
  const { locale } = useLocale();
  const fieldState = useTimeFieldState({
    locale,
    defaultValue: datePickerState?.timeValue,
    onChange: (value) => {
      datePickerState?.setTimeValue(value ?? new Time(0, 0));
    },
    hideTimeZone: true
  });
  const ref = useRef(null);
  const innerState = state ?? fieldState;
  const { fieldProps } = useTimeField({ "aria-label": "Time Picker" }, innerState, ref);
  const getAutoFocus = (index) => {
    if (!isDesktop) {
      return false;
    }
    return index === innerState.segments.findIndex(({ type }) => ["hour", "minute", "dayPeriod"].includes(type));
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-4", children: innerState.segments.map((segment, i) => /* @__PURE__ */ jsx(
      TimeSegmentButton,
      {
        segment,
        state: innerState,
        type: "increment"
      },
      i
    )) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        ...fieldProps,
        className: "flex items-center justify-center gap-4 py-2",
        children: innerState.segments.map((segment, i) => /* @__PURE__ */ jsx(
          TimeSegmentInput,
          {
            segment,
            state: innerState,
            autoFocus: getAutoFocus(i)
          },
          i
        ))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-4", children: innerState.segments.map((segment, i) => /* @__PURE__ */ jsx(
      TimeSegmentButton,
      {
        segment,
        state: innerState,
        type: "decrement"
      },
      i
    )) })
  ] });
};
const TimeSegmentInput = ({ segment, state, autoFocus }) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  const isDesktop = useBreakpoint("md");
  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
    }
  }, [autoFocus]);
  if (!["literal", "hour", "minute", "dayPeriod"].includes(segment.type)) {
    return null;
  }
  if (segment.type === "literal") {
    if (!showSegmentText(segment.text)) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex flex-col text-center",
        ref,
        children: /* @__PURE__ */ jsx(
          Typography,
          {
            as: "span",
            variant: "prominent-1",
            size: "label-2",
            className: "text-text-default-2",
            children: segment.text
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center gap-2", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      ...isDesktop && segmentProps,
      className: clsx(
        "w-11 rounded-input-rounding-default bg-input-filled-idle py-input-height-extra-small text-center",
        "font-labels-default text-text-default-3",
        "border border-input-filled-idle border-solid",
        "hover:border-interactive-contained-primary-hover",
        "focus-within:border-interactive-contained-primary-idle focus-within:outline-none"
      ),
      children: getPlaceholder(segment) ?? segment.text
    }
  ) });
};
const TimeSegmentButton = ({ segment, state, type }) => {
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  const onPress = (isLongPress) => {
    if (isLongPress && segment.type === "minute") {
      const currentValue = stateRef.current.segments.find((item) => item.type === "minute")?.value ?? 0;
      const diff = type === "increment" ? INCREMENT_STEP_SIZE : -INCREMENT_STEP_SIZE;
      const newValue = Math.round((currentValue + diff) / INCREMENT_STEP_SIZE) * INCREMENT_STEP_SIZE;
      const normalizedValue = (newValue % 60 + 60) % 60;
      stateRef.current.setSegment(segment.type, normalizedValue);
    } else {
      stateRef.current[type](segment.type);
    }
  };
  const { onPressStart, onPressEnd } = useLongPressRepeat({
    onPress,
    enabled: segment.type !== "dayPeriod",
    timeout: 300,
    interval: 300
  });
  if (!["literal", "hour", "minute", "dayPeriod"].includes(segment.type)) {
    return null;
  }
  if (segment.type === "literal") {
    if (!showSegmentText(segment.text)) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: "flex shrink-0", children: /* @__PURE__ */ jsx(
      Typography,
      {
        as: "span",
        variant: "prominent-1",
        size: "label-2",
        className: "invisible text-text-default-2",
        "aria-hidden": true,
        children: segment.text
      }
    ) });
  }
  const Icon = type === "increment" ? ChevronUpIcon : ChevronDownIcon;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex w-11 select-none items-center justify-center",
      onContextMenu: (e) => e.preventDefault(),
      children: /* @__PURE__ */ jsx(
        InlineIconButton,
        {
          label: "",
          color: "secondary",
          onPressStart,
          onPressEnd,
          icon: Icon
        }
      )
    }
  );
};
const showSegmentText = (text) => !/[\u2066\u2069]/.test(text);
export {
  TimePickerForm
};
