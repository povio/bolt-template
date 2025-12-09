import { jsxs, jsx } from "react/jsx-runtime";
import { useDateFormatter } from "@react-aria/i18n";
import { useMemo } from "react";
import { ArrowDropDownIcon } from "../../../../assets/icons/ArrowDropDown.js";
import { ChevronLeftIcon } from "../../../../assets/icons/ChevronLeft.js";
import { ChevronRightIcon } from "../../../../assets/icons/ChevronRight.js";
import { ChevronsLeftIcon } from "../../../../assets/icons/ChevronsLeft.js";
import { ChevronsRightIcon } from "../../../../assets/icons/ChevronsRight.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { PillButton } from "../../../buttons/PillButton/PillButton.js";
import { Select } from "../../Selection/Select/Select.js";
const CalendarSelectHeader = ({
  state,
  isPrevMonthDisabled,
  isPrevYearDisabled,
  isNextMonthDisabled,
  isNextYearDisabled,
  offset = { months: 0 },
  onNavigate,
  maxDate,
  minDate
}) => {
  const displayDate = state.visibleRange.start.add(offset);
  const currentMonth = displayDate.month - 1;
  const currentYear = displayDate.year;
  const formatter = useDateFormatter({
    month: "long",
    timeZone: state.timeZone
  });
  const numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate);
  const MONTHS = useMemo(() => {
    const months = [];
    for (let i = 1; i <= numMonths; i++) {
      const date = state.focusedDate.set({ month: i });
      months.push(formatter.format(date.toDate(state.timeZone)));
    }
    return months;
  }, [formatter, numMonths, state.focusedDate, state.timeZone]);
  const years = Array.from({ length: 201 }, (_, i) => currentYear - 100 + i);
  const getAvailableMonths = () => {
    return MONTHS.map((month, i) => {
      const monthDate = displayDate.set({ month: i + 1 });
      let isDisabled = false;
      if (maxDate) {
        isDisabled = monthDate.year > maxDate.year || monthDate.year === maxDate.year && monthDate.month >= maxDate.month;
      }
      if (minDate) {
        isDisabled = monthDate.year < minDate.year || monthDate.year === minDate.year && monthDate.month <= minDate.month;
      }
      return { month, value: i, isDisabled };
    });
  };
  const getAvailableYears = () => {
    return years.map((year) => {
      let isDisabled = false;
      if (maxDate) {
        isDisabled = year > maxDate.year || year === maxDate.year && displayDate.month >= maxDate.month;
      }
      if (minDate && !isDisabled) {
        isDisabled = year < minDate.year || year === minDate.year && displayDate.month <= minDate.month;
      }
      return { year, isDisabled };
    });
  };
  const availableMonths = getAvailableMonths();
  const availableYears = getAvailableYears();
  const handleMonthChange = (value) => {
    if (value === null) {
      return;
    }
    const newDate = displayDate.set({ month: value + 1 });
    onNavigate?.(newDate);
  };
  const handleYearChange = (value) => {
    if (value === null) {
      return;
    }
    const newDate = displayDate.set({ year: value });
    onNavigate?.(newDate);
  };
  const handlePrevMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newDate = displayDate.subtract({ months: 1 });
    onNavigate?.(newDate);
  };
  const handleNextMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newDate = displayDate.add({ months: 1 });
    onNavigate?.(newDate);
  };
  const handlePrevYear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newDate = displayDate.subtract({ years: 1 });
    onNavigate?.(newDate);
  };
  const handleNextYear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newDate = displayDate.add({ years: 1 });
    onNavigate?.(newDate);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between gap-3 border-elevation-outline-default-1 border-b border-solid px-3 py-2-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(
        InlineIconButton,
        {
          color: "secondary",
          isDisabled: isPrevYearDisabled,
          onClick: handlePrevYear,
          icon: ChevronsLeftIcon,
          label: "Previous year"
        }
      ),
      /* @__PURE__ */ jsx(
        InlineIconButton,
        {
          color: "secondary",
          isDisabled: isPrevMonthDisabled,
          onClick: handlePrevMonth,
          icon: ChevronLeftIcon,
          label: "Previous month"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        Select,
        {
          label: "Month",
          hideLabel: true,
          customTrigger: /* @__PURE__ */ jsx(
            PillButton,
            {
              color: "secondary",
              iconPosition: "right",
              icon: ArrowDropDownIcon,
              children: MONTHS[currentMonth].slice(0, 3)
            }
          ),
          ignoreTriggerWidth: true,
          items: availableMonths.map(({ month, value, isDisabled }) => ({
            label: month,
            id: value,
            isDisabled
          })).filter(({ isDisabled }) => !isDisabled),
          value: currentMonth,
          onChange: handleMonthChange
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          label: "Year",
          hideLabel: true,
          customTrigger: /* @__PURE__ */ jsx(
            PillButton,
            {
              color: "secondary",
              iconPosition: "right",
              icon: ArrowDropDownIcon,
              children: currentYear.toString()
            }
          ),
          items: availableYears.map(({ year, isDisabled }) => ({
            label: year.toString(),
            id: year,
            isDisabled
          })).filter(({ isDisabled }) => !isDisabled),
          value: currentYear,
          onChange: handleYearChange
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(
        InlineIconButton,
        {
          color: "secondary",
          isDisabled: isNextMonthDisabled,
          onClick: handleNextMonth,
          icon: ChevronRightIcon,
          label: "Next month"
        }
      ),
      /* @__PURE__ */ jsx(
        InlineIconButton,
        {
          color: "secondary",
          isDisabled: isNextYearDisabled,
          onClick: handleNextYear,
          icon: ChevronsRightIcon,
          label: "Next year"
        }
      )
    ] })
  ] });
};
export {
  CalendarSelectHeader
};
