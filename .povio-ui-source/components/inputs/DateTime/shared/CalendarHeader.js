import { jsxs, jsx } from "react/jsx-runtime";
import { Time } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Button, ToggleButtonGroup } from "react-aria-components";
import { ChevronLeftIcon } from "../../../../assets/icons/ChevronLeft.js";
import { ChevronRightIcon } from "../../../../assets/icons/ChevronRight.js";
import { PillButton } from "../../../buttons/PillButton/PillButton.js";
const HourCycle = {
  12: "h12",
  24: "h23"
};
const CalendarHeader = ({
  calendarState,
  datePickerState,
  prevButtonProps,
  nextButtonProps,
  includesTime,
  hourCycle,
  toggleState,
  setToggleState
}) => {
  const formatter = useDateFormatter({
    month: "long",
    timeZone: calendarState.timeZone
  });
  const timeFormatter = useDateFormatter({
    timeStyle: "short",
    timeZone: calendarState.timeZone,
    hourCycle: hourCycle ? HourCycle[hourCycle] : void 0
  });
  const year = calendarState.focusedDate.year.toString();
  const month = formatter.format(calendarState.focusedDate.toDate(calendarState.timeZone));
  const timeValue = datePickerState?.timeValue || new Time();
  const date = /* @__PURE__ */ new Date();
  date.setHours(timeValue.hour, timeValue.minute);
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex w-full items-center justify-between border-elevation-outline-default-1 border-b border-solid px-1", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-flex h-12 items-center p-3", children: !toggleState && /* @__PURE__ */ jsx(
      Button,
      {
        ...prevButtonProps,
        className: "shrink-0 focus-visible:outline-interactive-contained-secondary-focus",
        children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "size-6 text-interactive-text-secondary-idle" })
      }
    ) }),
    /* @__PURE__ */ jsxs(ToggleButtonGroup, { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        PillButton,
        {
          color: "secondary",
          toggle: true,
          isSelected: toggleState === "month",
          onChange: (isSelected) => setToggleState(isSelected ? "month" : null),
          children: month
        }
      ),
      /* @__PURE__ */ jsx(
        PillButton,
        {
          color: "secondary",
          toggle: true,
          isSelected: toggleState === "year",
          onChange: (isSelected) => setToggleState(isSelected ? "year" : null),
          children: year
        }
      ),
      includesTime && /* @__PURE__ */ jsx(
        PillButton,
        {
          color: "secondary",
          toggle: true,
          isSelected: toggleState === "time",
          onChange: (isSelected) => setToggleState(isSelected ? "time" : null),
          children: timeFormatter.format(date)
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "inline-flex h-12 items-center p-3", children: !toggleState && /* @__PURE__ */ jsx(
      Button,
      {
        ...nextButtonProps,
        className: "shrink-0 focus-visible:outline-interactive-contained-secondary-focus",
        children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "size-6 text-interactive-text-secondary-idle" })
      }
    ) })
  ] });
};
export {
  CalendarHeader
};
