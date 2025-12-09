import { jsxs, jsx } from "react/jsx-runtime";
import { useCalendar } from "@react-aria/calendar";
import { clsx } from "clsx";
import { useState } from "react";
import { CalendarGrid } from "./CalendarGrid.js";
import { CalendarHeader } from "./CalendarHeader.js";
import { MonthPicker } from "./MonthPicker.js";
import { TimePickerForm } from "./TimePickerForm.js";
import { YearPicker } from "./YearPicker.js";
const Calendar = ({ className, includesTime, datePickerState, hourCycle, onApply, ...props }) => {
  const [toggleState, setToggleState] = useState(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(props.calendarProps, props.state);
  const handleDateChange = () => {
    if (includesTime && !datePickerState.value) {
      setToggleState("time");
    } else {
      onApply();
    }
  };
  const getContent = () => {
    if (!toggleState) {
      return /* @__PURE__ */ jsx(
        CalendarGrid,
        {
          state: props.state,
          onApply: handleDateChange
        }
      );
    }
    if (toggleState === "month") {
      return /* @__PURE__ */ jsx(
        MonthPicker,
        {
          state: props.state,
          onSelectionChange: () => setToggleState(null)
        }
      );
    }
    if (toggleState === "year") {
      return /* @__PURE__ */ jsx(
        YearPicker,
        {
          state: props.state,
          onSelectionChange: () => setToggleState(null)
        }
      );
    }
    if (toggleState === "time" && includesTime) {
      return /* @__PURE__ */ jsx("div", { className: "flex h-72 w-80 items-center justify-center", children: /* @__PURE__ */ jsx(TimePickerForm, { datePickerState }) });
    }
    return null;
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...calendarProps,
      className: clsx("flex min-h-0 w-full flex-col items-center", className),
      children: [
        /* @__PURE__ */ jsx(
          CalendarHeader,
          {
            calendarState: props.state,
            datePickerState,
            prevButtonProps,
            nextButtonProps,
            includesTime,
            hourCycle,
            toggleState,
            setToggleState
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx("flex min-h-0 w-full flex-1 flex-col items-center", toggleState !== "year" && "pb-8 md:pb-0"),
            children: getContent()
          }
        )
      ]
    }
  );
};
export {
  Calendar
};
