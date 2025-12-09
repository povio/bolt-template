import { jsx } from "react/jsx-runtime";
import { useDateFormatter } from "@react-aria/i18n";
import { clsx } from "clsx";
import { ListBox, ListBoxItem } from "react-aria-components";
import { Typography } from "../../../text/Typography/Typography.js";
const MonthPicker = ({ state, onSelectionChange }) => {
  const formatter = useDateFormatter({
    month: "long",
    timeZone: state.timeZone
  });
  const numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate);
  const getMonths = () => {
    const months = [];
    for (let i = 1; i <= numMonths; i++) {
      const date = state.focusedDate.set({ month: i });
      months.push(formatter.format(date.toDate(state.timeZone)));
    }
    return months;
  };
  const isMonthDisabled = (month) => {
    if (state.minValue && state.focusedDate.set({ month }) < state.minValue) {
      return true;
    }
    if (state.maxValue && state.focusedDate.set({ month }) > state.maxValue) {
      return true;
    }
    return false;
  };
  return /* @__PURE__ */ jsx(
    ListBox,
    {
      autoFocus: true,
      "aria-label": "Month",
      selectionMode: "single",
      layout: "grid",
      selectedKeys: [state.focusedDate.month],
      onSelectionChange: (key) => {
        if (key === "all") {
          return;
        }
        const index = [...key][0];
        if (typeof index === "number") {
          const date = state.focusedDate.set({ month: [...key][0] });
          state.setFocusedDate(date);
        }
        onSelectionChange(key);
      },
      className: "grid size-full min-h-72 grid-cols-3 grid-rows-4 gap-2 p-3 md:w-80",
      children: getMonths().map((month, index) => {
        const isDisabled = isMonthDisabled(index + 1);
        return /* @__PURE__ */ jsx(
          ListBoxItem,
          {
            id: index + 1,
            textValue: month,
            isDisabled,
            className: clsx(
              "flex items-center justify-center text-interactive-text-secondary-idle",
              "rounded-button-rounding-m border border-elevation-outline-default-1 border-solid bg-elevation-fill-default-1",
              "hover:text-interactive-text-secondary-hover",
              "selected:border-interactive-contained-primary-idle selected:bg-interactive-contained-primary-idle selected:text-interactive-text-secondary-idle-inverted",
              "focus:outline-none focus-visible:outline-1 focus-visible:outline-interactive-contained-primary-focus focus-visible:outline-offset-1",
              isDisabled ? "cursor-default opacity-50" : "cursor-pointer"
            ),
            children: /* @__PURE__ */ jsx(
              Typography,
              {
                as: "span",
                size: "label-2",
                children: month
              }
            )
          },
          month
        );
      })
    }
  );
};
export {
  MonthPicker
};
