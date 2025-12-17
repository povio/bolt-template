import { jsx, jsxs } from "react/jsx-runtime";
import { toCalendarDate, createCalendar, today, getLocalTimeZone, startOfYear, endOfYear, CalendarDate, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "@internationalized/date";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { DateTime } from "luxon";
import { useState, useCallback, useRef } from "react";
import { useDateRangePicker, useLocale } from "react-aria";
import { Button } from "react-aria-components";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDateRangePickerState, useRangeCalendarState } from "react-stately";
import { DatePickerInput } from "../shared/DatePickerInput.js";
import { DateTimeDialog } from "../shared/DateTimeDialog.js";
import { DateTimeDialogFooter } from "../shared/DateTimeDialogFooter.js";
import { RangeCalendar } from "../shared/RangeCalendar.js";
import { FormField } from "../../FormField/FormField.js";
import { TooltipWrapper } from "../../shared/TooltipWrapper.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { ns } from "../../../../config/i18n.js";
import { UIConfig } from "../../../../config/uiConfig.context.js";
import { DateTimeUtils } from "../../../../utils/date-time.utils.js";
const PLACEHOLDER_VALUE = new CalendarDate(2024, 1, 1);
const DateRangePickerBase = (props) => {
  const ui = UIConfig.useConfig();
  const { t } = useTranslation();
  const {
    ref,
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isDisabled,
    headerClassName,
    errorClassName,
    isHeaderHidden,
    error,
    onChange,
    value,
    disableDropdown,
    className,
    hideSidebar,
    hideLabel = ui.input.hideLabel,
    variant = ui.input.variant,
    as = ui.input.as,
    size = ui.input.size,
    isClearable = ui.input.isClearable,
    todayIcon = ui.dateInput.todayIcon,
    shouldForceLeadingZeros = ui.dateInput.shouldForceLeadingZeros,
    ...rest
  } = props;
  const [validationRangeError, setValidationRangeError] = useState();
  const dialogState = useDateRangePickerState({ ...rest, value, shouldCloseOnSelect: false, shouldForceLeadingZeros });
  const state = useDateRangePickerState({
    ...rest,
    shouldForceLeadingZeros,
    value,
    onChange: (newValue) => {
      if (isValidRange(newValue)) {
        return;
      }
      onChange?.(newValue);
      handleCalendarStatesChange(newValue);
    },
    shouldCloseOnSelect: false
  });
  const dateRangePickerRef = useRef(null);
  const { groupProps, labelProps, startFieldProps, endFieldProps, buttonProps, dialogProps } = useDateRangePicker(
    { ...rest, label, shouldForceLeadingZeros },
    state,
    dateRangePickerRef
  );
  const { calendarProps } = useDateRangePicker(
    { ...rest, label, shouldForceLeadingZeros },
    dialogState,
    dateRangePickerRef
  );
  const { locale } = useLocale();
  const formFieldProps = {
    error: error || validationRangeError,
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden: isHeaderHidden || as === "inline" || as === "filter" || as === "floating",
    hideLabel,
    isDisabled,
    headerClassName,
    errorClassName
  };
  const leftCalendarState = useRangeCalendarState({
    ...calendarProps,
    locale,
    createCalendar,
    pageBehavior: "single",
    visibleDuration: { months: 1 },
    minValue: void 0,
    maxValue: void 0
  });
  const rightCalendarState = useRangeCalendarState({
    ...calendarProps,
    locale,
    createCalendar,
    pageBehavior: "single",
    visibleDuration: { months: 1 },
    defaultFocusedValue: today(getLocalTimeZone()).add({ months: 1 }),
    minValue: void 0,
    maxValue: void 0
  });
  const [activePreset, setActivePreset] = useState(null);
  const [rangeSelection, setRangeSelection] = useState({
    start: value?.start || null,
    end: value?.end || null,
    isSelecting: false
  });
  const [hoverDate, setHoverDate] = useState(null);
  const headerProps = {
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden: hideLabel || isHeaderHidden,
    isDisabled,
    className: headerClassName,
    labelProps
  };
  const isValidRange = useCallback(
    (newValue) => {
      if (newValue?.start && newValue?.end) {
        const startDate = newValue.start;
        const endDate = newValue.end;
        if (endDate.compare(startDate) < 0) {
          setValidationRangeError(
            t(($) => $.ui.datePicker.errors.endDateBeforeStart, {
              ns
            })
          );
          return true;
        }
        setValidationRangeError(void 0);
      } else {
        setValidationRangeError(void 0);
      }
      return false;
    },
    [t]
  );
  const handleCalendarStatesChange = (newValue) => {
    if (newValue) {
      if (isValidRange(newValue)) {
        return;
      }
      dialogState.setValue(newValue);
      const startDate = newValue.start;
      const endDate = newValue.end;
      leftCalendarState.setFocusedDate(startDate);
      if (startDate.year === endDate.year && startDate.month === endDate.month) {
        rightCalendarState.setFocusedDate(startDate.add({ months: 1 }));
      } else {
        rightCalendarState.setFocusedDate(endDate);
      }
      leftCalendarState.setValue(newValue);
      rightCalendarState.setValue(newValue);
      setRangeSelection({
        start: newValue.start,
        end: newValue.end,
        isSelecting: false
      });
      setHoverDate(null);
      setActivePreset(null);
    } else {
      setValidationRangeError(void 0);
      dialogState.setValue(null);
      leftCalendarState.setValue(null);
      rightCalendarState.setValue(null);
      setRangeSelection({
        start: null,
        end: null,
        isSelecting: false
      });
      setHoverDate(null);
      setActivePreset(null);
    }
  };
  const throttledSetHoverDate = useCallback((date) => {
    requestAnimationFrame(() => {
      setHoverDate(date);
    });
  }, []);
  const handleDateHover = useCallback(
    (date) => {
      if (rangeSelection.isSelecting && rangeSelection.start) {
        throttledSetHoverDate(date);
      }
    },
    [rangeSelection.isSelecting, rangeSelection.start, throttledSetHoverDate]
  );
  const handleDateSelection = useCallback(
    (date, calendarSide) => {
      if (calendarSide) {
        const currentState = calendarSide === "left" ? leftCalendarState : rightCalendarState;
        const currentVisibleMonth = currentState.visibleRange.start;
        if (date.month !== currentVisibleMonth.month || date.year !== currentVisibleMonth.year) {
          if (calendarSide === "left") {
            leftCalendarState.setFocusedDate(date);
            rightCalendarState.setFocusedDate(date.add({ months: 1 }));
          } else {
            rightCalendarState.setFocusedDate(date);
            leftCalendarState.setFocusedDate(date.subtract({ months: 1 }));
          }
        }
      }
      if (!rangeSelection.isSelecting || !rangeSelection.start) {
        setRangeSelection({
          start: date,
          end: null,
          isSelecting: true
        });
        setHoverDate(null);
        leftCalendarState.setValue(null);
        rightCalendarState.setValue(null);
      } else {
        const { start } = rangeSelection;
        const end = date;
        const finalStart = start.compare(end) <= 0 ? start : end;
        const finalEnd = start.compare(end) <= 0 ? end : start;
        const newRange = { start: finalStart, end: finalEnd };
        leftCalendarState.setValue(newRange);
        rightCalendarState.setValue(newRange);
        dialogState.setValue(newRange);
        setRangeSelection({
          start: finalStart,
          end: finalEnd,
          isSelecting: false
        });
        setHoverDate(null);
        setActivePreset(null);
      }
    },
    [rangeSelection, leftCalendarState, rightCalendarState, dialogState]
  );
  const handleKeyboardNavigation = useCallback(
    (event, date, calendarSide) => {
      const currentState = calendarSide === "left" ? leftCalendarState : rightCalendarState;
      const otherState = calendarSide === "left" ? rightCalendarState : leftCalendarState;
      let shouldPreventDefault = false;
      switch (event.key) {
        case "ArrowRight": {
          const nextDate = date.add({ days: 1 });
          const currentMonth = currentState.visibleRange.start;
          const otherMonth = otherState.visibleRange.start;
          if (calendarSide === "left" && nextDate.month !== currentMonth.month) {
            if (nextDate.year === otherMonth.year && nextDate.month === otherMonth.month) {
              otherState.setFocusedDate(nextDate);
              shouldPreventDefault = true;
            } else {
              rightCalendarState.setFocusedDate(nextDate);
              shouldPreventDefault = true;
            }
          }
          break;
        }
        case "ArrowLeft": {
          const prevDate = date.subtract({ days: 1 });
          const currentMonth = currentState.visibleRange.start;
          const otherMonth = otherState.visibleRange.start;
          if (calendarSide === "right" && prevDate.month !== currentMonth.month) {
            if (prevDate.year === otherMonth.year && prevDate.month === otherMonth.month) {
              otherState.setFocusedDate(prevDate);
              shouldPreventDefault = true;
            } else {
              leftCalendarState.setFocusedDate(prevDate);
              shouldPreventDefault = true;
            }
          }
          break;
        }
        case "ArrowDown": {
          const nextWeekDate = date.add({ weeks: 1 });
          const currentMonth = currentState.visibleRange.start;
          const otherMonth = otherState.visibleRange.start;
          if (calendarSide === "left" && nextWeekDate.month !== currentMonth.month) {
            if (nextWeekDate.year === otherMonth.year && nextWeekDate.month === otherMonth.month) {
              otherState.setFocusedDate(nextWeekDate);
              shouldPreventDefault = true;
            } else {
              rightCalendarState.setFocusedDate(nextWeekDate);
              shouldPreventDefault = true;
            }
          }
          break;
        }
        case "ArrowUp": {
          const prevWeekDate = date.subtract({ weeks: 1 });
          const currentMonth = currentState.visibleRange.start;
          const otherMonth = otherState.visibleRange.start;
          if (calendarSide === "right" && prevWeekDate.month !== currentMonth.month) {
            if (prevWeekDate.year === otherMonth.year && prevWeekDate.month === otherMonth.month) {
              otherState.setFocusedDate(prevWeekDate);
              shouldPreventDefault = true;
            } else {
              leftCalendarState.setFocusedDate(prevWeekDate);
              shouldPreventDefault = true;
            }
          }
          break;
        }
        case "Enter":
        case " ": {
          handleDateSelection(date);
          shouldPreventDefault = true;
          break;
        }
        case "Escape": {
          setRangeSelection({
            start: null,
            end: null,
            isSelecting: false
          });
          setHoverDate(null);
          shouldPreventDefault = true;
          break;
        }
      }
      if (shouldPreventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }
      return shouldPreventDefault;
    },
    [leftCalendarState, rightCalendarState, handleDateSelection]
  );
  const syncCalendarStates = useCallback(
    (newValue) => {
      if (isValidRange(newValue)) {
        return;
      }
      leftCalendarState.setValue(newValue);
      rightCalendarState.setValue(newValue);
      dialogState.setValue(newValue);
      if (newValue) {
        setRangeSelection({
          start: newValue.start,
          end: newValue.end,
          isSelecting: false
        });
      } else {
        setRangeSelection({
          start: null,
          end: null,
          isSelecting: false
        });
      }
      setHoverDate(null);
    },
    [isValidRange, leftCalendarState, rightCalendarState, dialogState]
  );
  const onApply = () => {
    const valueToApply = rangeSelection.start && rangeSelection.end ? { start: rangeSelection.start, end: rangeSelection.end } : dialogState.value;
    if (valueToApply) {
      state.setValue(valueToApply);
    }
    state.toggle();
  };
  const onTodayPress = () => {
    const todayDate2 = today(getLocalTimeZone());
    leftCalendarState.setFocusedDate(todayDate2);
    rightCalendarState.setFocusedDate(todayDate2.add({ months: 1 }));
    syncCalendarStates({ start: todayDate2, end: todayDate2 });
  };
  const onOpenChange = (isOpen) => {
    state.toggle();
    if (!isOpen) {
      if (state.value) {
        dialogState.setValue(state.value);
        leftCalendarState.setValue(state.value);
        rightCalendarState.setValue(state.value);
        const startDate = state.value.start || today(getLocalTimeZone());
        const endDate = state.value.end || today(getLocalTimeZone()).add({ months: 1 });
        leftCalendarState.setFocusedDate(startDate);
        if (startDate.year === endDate.year && startDate.month === endDate.month) {
          rightCalendarState.setFocusedDate(startDate.add({ months: 1 }));
        } else {
          rightCalendarState.setFocusedDate(endDate);
        }
        setRangeSelection({
          start: state.value.start,
          end: state.value.end,
          isSelecting: false
        });
      }
    }
  };
  const todayDate = today(getLocalTimeZone());
  const getThisWeekRange = () => {
    const start = startOfWeek(todayDate, locale);
    const end = endOfWeek(todayDate, locale);
    return { start, end };
  };
  const getLastWeekRange = () => {
    const thisWeekStart = startOfWeek(todayDate, locale);
    const lastWeekStart = thisWeekStart.subtract({ weeks: 1 });
    const lastWeekEnd = thisWeekStart.subtract({ days: 1 });
    return { start: lastWeekStart, end: lastWeekEnd };
  };
  const getThisAndLastWeekRange = () => {
    const thisWeekEnd = endOfWeek(todayDate, locale);
    const lastWeekStart = startOfWeek(todayDate, locale).subtract({ weeks: 1 });
    return { start: lastWeekStart, end: thisWeekEnd };
  };
  const getThisMonthRange = () => {
    const start = startOfMonth(todayDate);
    const end = endOfMonth(todayDate);
    return { start, end };
  };
  const getThisAndLastMonthRange = () => {
    const thisMonthEnd = endOfMonth(todayDate);
    const lastMonthStart = startOfMonth(todayDate).subtract({ months: 1 });
    return { start: lastMonthStart, end: thisMonthEnd };
  };
  const presets = [
    {
      label: t(($) => $.ui.datePicker.presets.thisWeek, {
        ns
      }),
      getValue: getThisWeekRange
    },
    {
      label: t(($) => $.ui.datePicker.presets.lastWeek, {
        ns
      }),
      getValue: getLastWeekRange
    },
    {
      label: t(($) => $.ui.datePicker.presets.thisAndLastWeek, {
        ns
      }),
      getValue: getThisAndLastWeekRange
    },
    {
      label: t(($) => $.ui.datePicker.presets.thisMonth, {
        ns
      }),
      getValue: getThisMonthRange
    },
    {
      label: t(($) => $.ui.datePicker.presets.thisAndLastMonth, {
        ns
      }),
      getValue: getThisAndLastMonthRange
    },
    {
      label: t(($) => $.ui.datePicker.presets.thisYear, {
        ns
      }),
      getValue: () => ({ start: startOfYear(todayDate), end: todayDate })
    },
    {
      label: t(($) => $.ui.datePicker.presets.lastYear, {
        ns
      }),
      getValue: () => ({
        start: startOfYear(todayDate.subtract({ years: 1 })),
        end: endOfYear(todayDate.subtract({ years: 1 }))
      })
    },
    {
      label: t(($) => $.ui.datePicker.presets.thisAndLastYear, {
        ns
      }),
      getValue: () => ({ start: startOfYear(todayDate.subtract({ years: 1 })), end: todayDate })
    },
    {
      label: t(($) => $.ui.datePicker.presets.soFar, {
        ns
      }),
      getValue: () => ({ start: startOfYear(todayDate), end: todayDate })
    }
  ];
  const selectPreset = (preset) => {
    setActivePreset(preset.label);
    const presetValue = preset.getValue();
    syncCalendarStates(presetValue);
    const startDate = presetValue.start;
    leftCalendarState.setFocusedDate(startDate);
    const endDate = presetValue.end;
    const monthsDifference = (endDate.year - startDate.year) * 12 + (endDate.month - startDate.month);
    if (monthsDifference > 2) {
      rightCalendarState.setFocusedDate(endDate);
    } else {
      const rightCalendarMonth = startDate.add({ months: 1 });
      rightCalendarState.setFocusedDate(rightCalendarMonth);
    }
  };
  return /* @__PURE__ */ jsx(
    TooltipWrapper,
    {
      as,
      error,
      children: /* @__PURE__ */ jsxs(
        FormField,
        {
          ...formFieldProps,
          as,
          labelProps,
          className: clsx("relative inline-flex w-full flex-col text-left", className),
          children: [
            /* @__PURE__ */ jsx(
              DatePickerInput,
              {
                ref: mergeRefs(ref, dateRangePickerRef),
                as,
                groupProps,
                fieldProps: { ...startFieldProps, placeholderValue: PLACEHOLDER_VALUE },
                endFieldProps: { ...endFieldProps, placeholderValue: PLACEHOLDER_VALUE },
                buttonProps,
                isDisabled,
                isInvalid: !!error,
                disableDropdown,
                variant,
                size,
                isClearable,
                headerProps,
                todayIcon
              }
            ),
            /* @__PURE__ */ jsx(
              DateTimeDialog,
              {
                hideSidebar,
                sidebar: /* @__PURE__ */ jsx("div", { className: "flex w-full flex-row overflow-auto border-elevation-outline-default-1 border-solid [-ms-overflow-style:none] [scrollbar-width:none] md:w-[156px] md:flex-col md:border-r [&::-webkit-scrollbar]:hidden", children: presets.map((preset) => /* @__PURE__ */ jsx(
                  Button,
                  {
                    onClick: () => selectPreset(preset),
                    className: clsx(
                      "w-full px-2 py-1 text-left md:px-list-side-item md:py-list-height-item",
                      activePreset !== preset.label && "text-interactive-text-secondary-idle hover:text-interactive-text-secondary-hover",
                      activePreset === preset.label && "bg-interactive-contained-primary-idle text-interactive-text-secondary-idle-inverted"
                    ),
                    children: /* @__PURE__ */ jsx(
                      Typography,
                      {
                        size: "label-2",
                        sizeMobile: "label-3",
                        as: "span",
                        className: "whitespace-nowrap",
                        children: preset.label
                      }
                    )
                  },
                  preset.label
                )) }),
                footer: /* @__PURE__ */ jsx(
                  DateTimeDialogFooter,
                  {
                    isDisabled,
                    isValid: !dialogState.isInvalid && !!dialogState.value,
                    onTodayPress,
                    onApply
                  }
                ),
                label,
                triggerRef: dateRangePickerRef,
                dialogProps,
                isOpen: state.isOpen,
                onOpenChange,
                children: /* @__PURE__ */ jsx("div", { className: "mb-4 flex max-w-[804px] md:mb-0", children: /* @__PURE__ */ jsx("div", { className: "flex flex-1 justify-center", children: /* @__PURE__ */ jsx(
                  RangeCalendar,
                  {
                    leftCalendarState,
                    rightCalendarState,
                    calendarProps,
                    onApply,
                    onRangeChange: syncCalendarStates,
                    onDateSelection: handleDateSelection,
                    onDateHover: handleDateHover,
                    rangeSelection,
                    hoverDate,
                    onKeyboardNavigation: handleKeyboardNavigation
                  }
                ) }) })
              }
            )
          ]
        }
      )
    }
  );
};
const DateRangePicker = ({
  fullIso = true,
  minValue,
  maxValue,
  ...props
}) => {
  const formatDateRange = (range) => {
    if (!range?.start || !range?.end) {
      return null;
    }
    if (fullIso) {
      return {
        start: DateTimeUtils.fromCalendarDateToUTCISO(range.start),
        end: DateTimeUtils.fromCalendarDateToUTCISO(range.end, { endOfDay: true })
      };
    }
    const startDate = DateTimeUtils.fromDateValueToLocal(range.start);
    const endDate = DateTimeUtils.fromDateValueToLocal(range.end);
    return {
      start: DateTime.fromJSDate(startDate).toISODate(),
      end: DateTime.fromJSDate(endDate).toISODate()
    };
  };
  const parseDateRange = (formattedRange) => {
    if (!formattedRange?.start || !formattedRange?.end) {
      return formattedRange;
    }
    if (fullIso) {
      return {
        start: DateTimeUtils.fromUTCISOToCalendarDate(formattedRange.start),
        end: DateTimeUtils.fromUTCISOToCalendarDate(formattedRange.end)
      };
    }
    const startDate = DateTime.fromISO(formattedRange.start).toJSDate();
    const endDate = DateTime.fromISO(formattedRange.end).toJSDate();
    const startZonedDateTime = DateTimeUtils.fromLocalToZonedDateTime(startDate);
    const endZonedDateTime = DateTimeUtils.fromLocalToZonedDateTime(endDate);
    return {
      start: toCalendarDate(startZonedDateTime),
      end: toCalendarDate(endZonedDateTime)
    };
  };
  const parseCalendarDate = (formattedDate) => {
    if (formattedDate == null) {
      return formattedDate;
    }
    if (fullIso) {
      return DateTimeUtils.fromUTCISOToCalendarDate(formattedDate);
    }
    const date = DateTime.fromISO(formattedDate).toJSDate();
    const zonedDateTime = DateTimeUtils.fromLocalToZonedDateTime(date);
    return toCalendarDate(zonedDateTime);
  };
  const dateLimits = {
    minValue: typeof minValue === "string" ? parseCalendarDate(minValue) : minValue,
    maxValue: typeof maxValue === "string" ? parseCalendarDate(maxValue) : maxValue
  };
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          DateRangePickerBase,
          {
            ...innerProps,
            ...dateLimits,
            ref: mergeRefs(ref, field.ref),
            value: parseDateRange(field.value),
            onChange: (value) => field.onChange(formatDateRange(value)),
            onBlur: field.onBlur,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    DateRangePickerBase,
    {
      ...props,
      ...dateLimits,
      value: parseDateRange(props.value),
      onChange: (value) => props.onChange?.(formatDateRange(value))
    }
  );
};
export {
  DateRangePicker
};
