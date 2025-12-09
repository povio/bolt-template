import { jsx, jsxs } from "react/jsx-runtime";
import { useRangeCalendar } from "@react-aria/calendar";
import { clsx } from "clsx";
import { useRef, useMemo } from "react";
import { CalendarGrid } from "./CalendarGrid.js";
import { CalendarSelectHeader } from "./CalendarSelectHeader.js";
const RangeCalendar = ({
  className,
  leftCalendarState,
  rightCalendarState,
  calendarProps,
  onApply,
  onRangeChange: _onRangeChange,
  onDateSelection,
  onDateHover,
  rangeSelection,
  hoverDate,
  onKeyboardNavigation
}) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const { calendarProps: leftCalendarAriaProps } = useRangeCalendar(calendarProps, leftCalendarState, leftRef);
  const { calendarProps: rightCalendarAriaProps } = useRangeCalendar(calendarProps, rightCalendarState, rightRef);
  const leftDate = leftCalendarState.visibleRange.start;
  const rightDate = rightCalendarState.visibleRange.start;
  const handleLeftKeyboardNavigation = (event, date) => {
    return onKeyboardNavigation?.(event, date, "left") ?? false;
  };
  const handleRightKeyboardNavigation = (event, date) => {
    return onKeyboardNavigation?.(event, date, "right") ?? false;
  };
  const handleLeftNavigate = (newDate) => {
    const rightCurrentDate = rightCalendarState.visibleRange.start;
    if (newDate.year < rightCurrentDate.year || newDate.year === rightCurrentDate.year && newDate.month < rightCurrentDate.month) {
      leftCalendarState.setFocusedDate(newDate);
    } else {
      const closestValidDate = rightCurrentDate.subtract({ months: 1 });
      leftCalendarState.setFocusedDate(closestValidDate);
    }
  };
  const handleRightNavigate = (newDate) => {
    const leftCurrentDate = leftCalendarState.visibleRange.start;
    if (newDate.year > leftCurrentDate.year || newDate.year === leftCurrentDate.year && newDate.month > leftCurrentDate.month) {
      rightCalendarState.setFocusedDate(newDate);
    } else {
      const closestValidDate = leftCurrentDate.add({ months: 1 });
      rightCalendarState.setFocusedDate(closestValidDate);
    }
  };
  const isNextDisabled = useMemo(() => {
    const leftNextDate = leftDate.add({ months: 1 });
    return leftNextDate.year > rightDate.year || leftNextDate.year === rightDate.year && leftNextDate.month === rightDate.month;
  }, [leftDate, rightDate]);
  const isPrevDisabled = useMemo(() => {
    const rightPrevDate = rightDate.subtract({ months: 1 });
    return rightPrevDate.year < leftDate.year || rightPrevDate.year === leftDate.year && rightPrevDate.month === leftDate.month;
  }, [leftDate, rightDate]);
  return /* @__PURE__ */ jsx("div", { className: clsx("flex w-fit flex-col items-center bg-elevation-fill-default-1", className), children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ...leftCalendarAriaProps,
        ref: leftRef,
        className: "flex flex-col items-center",
        children: [
          /* @__PURE__ */ jsx(
            CalendarSelectHeader,
            {
              state: leftCalendarState,
              isNextMonthDisabled: isNextDisabled,
              isNextYearDisabled: isNextDisabled,
              onNavigate: handleLeftNavigate,
              maxDate: rightDate
            }
          ),
          /* @__PURE__ */ jsx(
            CalendarGrid,
            {
              state: leftCalendarState,
              onApply,
              shouldCloseOnSelect: false,
              onDateSelection,
              rangeSelection,
              onDateHover,
              hoverDate,
              onKeyboardNavigation: handleLeftKeyboardNavigation,
              className: "h-64 w-[304px]!",
              calendarSide: "left"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ...rightCalendarAriaProps,
        ref: rightRef,
        className: "hidden flex-col items-center md:flex",
        children: [
          /* @__PURE__ */ jsx(
            CalendarSelectHeader,
            {
              state: rightCalendarState,
              isPrevMonthDisabled: isPrevDisabled,
              isPrevYearDisabled: isPrevDisabled,
              onNavigate: handleRightNavigate,
              minDate: leftDate
            }
          ),
          /* @__PURE__ */ jsx(
            CalendarGrid,
            {
              state: rightCalendarState,
              onApply,
              shouldCloseOnSelect: false,
              onDateSelection,
              rangeSelection,
              onDateHover,
              hoverDate,
              onKeyboardNavigation: handleRightKeyboardNavigation,
              className: "h-64 w-[304px]!",
              calendarSide: "right"
            }
          )
        ]
      }
    )
  ] }) });
};
export {
  RangeCalendar
};
