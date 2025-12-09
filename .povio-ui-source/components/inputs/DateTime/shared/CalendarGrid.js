import { jsx, jsxs } from "react/jsx-runtime";
import { useCalendarGrid } from "@react-aria/calendar";
import { clsx } from "clsx";
import { CalendarCell } from "./CalendarCell.js";
import { Typography } from "../../../text/Typography/Typography.js";
const WEEK_INDICES = [0, 1, 2, 3, 4, 5];
const CalendarGrid = ({
  state,
  onApply,
  shouldCloseOnSelect,
  offset = {},
  onDateSelection,
  onDateHover,
  rangeSelection,
  hoverDate,
  onKeyboardNavigation,
  className,
  calendarSide,
  ...props
}) => {
  const { gridProps, headerProps, weekDays } = useCalendarGrid({ ...props, weekdayStyle: "short" }, state);
  const startDate = state.visibleRange.start.add(offset);
  const handleDateSelection = (date) => {
    onDateSelection?.(date, calendarSide);
  };
  return /* @__PURE__ */ jsx("div", { className: clsx("h-72 w-full px-3 py-1 md:w-80", className), children: /* @__PURE__ */ jsxs(
    "table",
    {
      ...gridProps,
      cellPadding: "0",
      className: "w-full",
      children: [
        /* @__PURE__ */ jsx("thead", { ...headerProps, children: /* @__PURE__ */ jsx("tr", { children: weekDays.map((day) => /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(
          Typography,
          {
            size: "label-2",
            className: "bg-elevation-fill-default-1 py-2 text-interactive-text-secondary-idle",
            children: day.substring(0, 2)
          }
        ) }, day)) }) }),
        /* @__PURE__ */ jsx("tbody", { children: WEEK_INDICES.map((weekIndex) => /* @__PURE__ */ jsx("tr", { children: state.getDatesInWeek(weekIndex, startDate).map(
          (date, i) => date ? /* @__PURE__ */ jsx(
            CalendarCell,
            {
              state,
              date,
              onApply,
              shouldCloseOnSelect,
              onDateSelection: handleDateSelection,
              onDateHover,
              rangeSelection,
              hoverDate,
              onKeyboardNavigation
            },
            i
          ) : (
            // oxlint-disable-next-line react/no-array-index-key
            /* @__PURE__ */ jsx("td", {}, i)
          )
        ) }, weekIndex)) })
      ]
    }
  ) });
};
export {
  CalendarGrid
};
