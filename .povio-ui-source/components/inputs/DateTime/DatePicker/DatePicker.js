import { jsx, jsxs } from "react/jsx-runtime";
import { toCalendarDate, today, getLocalTimeZone, createCalendar, CalendarDate } from "@internationalized/date";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { DateTime } from "luxon";
import { useRef } from "react";
import { useDatePicker, useLocale } from "react-aria";
import { Controller } from "react-hook-form";
import { useDatePickerState, useCalendarState } from "react-stately";
import { Calendar } from "../shared/Calendar.js";
import { DatePickerInput } from "../shared/DatePickerInput.js";
import { DateTimeDialog } from "../shared/DateTimeDialog.js";
import { DateTimeDialogFooter } from "../shared/DateTimeDialogFooter.js";
import { FormField } from "../../FormField/FormField.js";
import { TooltipWrapper } from "../../shared/TooltipWrapper.js";
import { UIConfig } from "../../../../config/uiConfig.context.js";
import { DateTimeUtils } from "../../../../utils/date-time.utils.js";
const PLACEHOLDER_VALUE = new CalendarDate(2024, 1, 1);
const DatePickerBase = (props) => {
  const ui = UIConfig.useConfig();
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
    as = ui.input.as,
    hideLabel = ui.input.hideLabel,
    variant = ui.input.variant,
    size = ui.input.size,
    isClearable = ui.input.isClearable,
    todayIcon = ui.dateInput.todayIcon,
    shouldForceLeadingZeros = ui.dateInput.shouldForceLeadingZeros,
    ...rest
  } = props;
  const formFieldProps = {
    error,
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
  const dialogState = useDatePickerState({
    ...rest,
    defaultValue: value || rest.defaultValue,
    shouldCloseOnSelect: false,
    shouldForceLeadingZeros
  });
  const state = useDatePickerState({
    ...rest,
    shouldForceLeadingZeros,
    value,
    onChange: (val) => {
      if (val && (rest.minValue && val < rest?.minValue || rest?.maxValue && val > rest?.maxValue)) {
        state.setValue(state.value);
        return;
      }
      onChange?.(val);
      dialogState.setValue(val);
      calendarState.setFocusedDate(val || today(getLocalTimeZone()));
    },
    shouldCloseOnSelect: false
  });
  const datePickerRef = useRef(null);
  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps } = useDatePicker(
    { ...rest, label, shouldForceLeadingZeros },
    state,
    datePickerRef
  );
  const { calendarProps } = useDatePicker({ ...rest, label, shouldForceLeadingZeros }, dialogState, datePickerRef);
  const { locale } = useLocale();
  const calendarState = useCalendarState({
    ...calendarProps,
    locale,
    createCalendar
  });
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
  const onApply = () => {
    state.setValue(dialogState.value);
    state.toggle();
  };
  const onTodayPress = () => {
    dialogState.setValue(today(getLocalTimeZone()));
    calendarState.setFocusedDate(today(getLocalTimeZone()));
  };
  const onOpenChange = (isOpen) => {
    state.toggle();
    calendarState.setFocusedDate(state.value || today(getLocalTimeZone()));
    if (!isOpen) {
      dialogState.setValue(state.value);
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
                ref: mergeRefs(ref, datePickerRef),
                as,
                groupProps,
                fieldProps: { ...fieldProps, placeholderValue: PLACEHOLDER_VALUE },
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
            !disableDropdown && /* @__PURE__ */ jsx(
              DateTimeDialog,
              {
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
                triggerRef: datePickerRef,
                dialogProps,
                isOpen: state.isOpen,
                onOpenChange,
                children: /* @__PURE__ */ jsx(
                  Calendar,
                  {
                    state: calendarState,
                    calendarProps,
                    onApply
                  }
                )
              }
            )
          ]
        }
      )
    }
  );
};
const DatePicker = ({
  fullIso = true,
  minValue,
  maxValue,
  ...props
}) => {
  const formatCalendarDate = (calendarDate) => {
    if (calendarDate === null) {
      return null;
    }
    if (fullIso) {
      return DateTimeUtils.fromCalendarDateToUTCISO(calendarDate);
    }
    const date = DateTimeUtils.fromDateValueToLocal(calendarDate);
    return DateTime.fromJSDate(date).toISODate();
  };
  const parseCalendarDate = (formattedDate) => {
    if (formattedDate == null) {
      return formattedDate;
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
          DatePickerBase,
          {
            ...innerProps,
            ...dateLimits,
            ref: mergeRefs(ref, field.ref),
            value: parseCalendarDate(field.value),
            onChange: (value) => field.onChange(formatCalendarDate(value)),
            onBlur: field.onBlur,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    DatePickerBase,
    {
      ...props,
      ...dateLimits,
      value: parseCalendarDate(props.value),
      onChange: (value) => props.onChange?.(formatCalendarDate(value))
    }
  );
};
export {
  DatePicker
};
