import { jsx } from "react/jsx-runtime";
import { today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { clsx } from "clsx";
import { useMemo } from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import { Typography } from "../../../text/Typography/Typography.js";
import { useScrollableListBox } from "../../../../hooks/useScrollableListBox.js";
const YearPicker = ({ state, onSelectionChange }) => {
  const formatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone
  });
  const years = useMemo(() => {
    const arr = [];
    for (let i = -100; i <= 100; i++) {
      const date = today(state.timeZone).add({ years: i });
      arr.push({
        value: date.year,
        formatted: formatter.format(date.toDate(state.timeZone))
      });
    }
    return arr;
  }, [state.timeZone, formatter]);
  const isYearDisabled = (year) => {
    if (state.minValue && year < state.minValue.year) {
      return true;
    }
    if (state.maxValue && year > state.maxValue.year) {
      return true;
    }
    return false;
  };
  const selectedYear = years.findIndex((year) => year.value === state.focusedDate.year);
  const { ref } = useScrollableListBox();
  return /* @__PURE__ */ jsx(
    ListBox,
    {
      ref,
      autoFocus: true,
      "aria-label": "Year",
      selectionMode: "single",
      selectedKeys: [selectedYear],
      onSelectionChange: (key) => {
        if (key === "all") {
          return;
        }
        const index = [...key][0];
        if (typeof index === "number") {
          const date = state.focusedDate.set({ year: years[index].value });
          state.setFocusedDate(date);
        }
        onSelectionChange(key);
      },
      className: "h-80 max-h-full min-h-0 w-full shrink-0 overflow-y-auto md:h-72 md:w-80",
      children: years.map((year, index) => {
        const isDisabled = isYearDisabled(year.value);
        return /* @__PURE__ */ jsx(
          ListBoxItem,
          {
            id: index,
            textValue: year.formatted,
            isDisabled,
            className: clsx(
              "flex px-4 py-2 text-interactive-text-secondary-idle outline-none",
              "border-elevation-outline-default-1 border-b border-solid bg-elevation-fill-default-1 last:border-b-0",
              "hover:text-interactive-text-secondary-hover",
              "selected:bg-interactive-contained-primary-idle selected:text-interactive-text-secondary-idle-inverted",
              "focus-visible:bg-interactive-contained-primary-focus focus-visible:text-interactive-text-secondary-idle-inverted",
              isDisabled ? "cursor-default opacity-50" : "cursor-pointer"
            ),
            children: /* @__PURE__ */ jsx(
              Typography,
              {
                as: "span",
                size: "label-2",
                children: year.formatted
              }
            )
          },
          index
        );
      })
    }
  );
};
export {
  YearPicker
};
