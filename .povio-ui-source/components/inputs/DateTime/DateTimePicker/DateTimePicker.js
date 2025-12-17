import { jsx, jsxs } from "react/jsx-runtime";
import { Time, today, getLocalTimeZone, createCalendar, CalendarDateTime, now } from "@internationalized/date";
import { mergeRefs } from "@react-aria/utils";
import { useEffect, useRef } from "react";
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
const PLACEHOLDER_VALUE = new CalendarDateTime(2024, 1, 1);
const DateTimePickerBase = (props) => {
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
    isTimeOptional,
    hideLabel = ui.input.hideLabel,
    variant = ui.input.variant,
    as = ui.input.as,
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
    granularity: "minute",
    hideTimeZone: true,
    shouldForceLeadingZeros
  });
  useEffect(() => {
    if (isTimeOptional && !dialogState.timeValue) {
      dialogState.setTimeValue(new Time(0, 0));
    }
  }, [isTimeOptional, dialogState]);
  const state = useDatePickerState({
    ...rest,
    shouldForceLeadingZeros,
    value,
    onChange: (val) => {
      onChange?.(val);
      dialogState.setValue(val);
      calendarState.setFocusedDate(val || today(getLocalTimeZone()));
    },
    shouldCloseOnSelect: false,
    granularity: "minute",
    hideTimeZone: true
  });
  const datePickerRef = useRef(null);
  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps } = useDatePicker(
    { ...rest, label, granularity: "minute", hideTimeZone: true, shouldForceLeadingZeros },
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
    dialogState.setValue(now(getLocalTimeZone()));
    calendarState.setFocusedDate(today(getLocalTimeZone()));
  };
  const onOpenChange = (isOpen) => {
    state.toggle();
    calendarState.setFocusedDate(state.value || today(getLocalTimeZone()));
    if (!isOpen) {
      dialogState.setValue(state.value);
    }
  };
  const onInputBlur = (e) => {
    if (!isTimeOptional) {
      return;
    }
    const textValue = e.currentTarget.textContent;
    const dateTimeValue = DateTimeUtils.formatTextDateToCalendarDateTime(textValue);
    if (dateTimeValue) {
      state.setValue(dateTimeValue);
      dialogState.setValue(dateTimeValue);
      dialogState.setTimeValue(new Time(0, 0));
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
          className: "relative inline-flex w-full flex-col text-left",
          children: [
            /* @__PURE__ */ jsx(
              DatePickerInput,
              {
                ref: mergeRefs(ref, datePickerRef),
                as,
                groupProps,
                fieldProps: {
                  ...fieldProps,
                  placeholderValue: PLACEHOLDER_VALUE,
                  onBlur: (e) => {
                    fieldProps.onBlur?.(e);
                    onInputBlur(e);
                  }
                },
                buttonProps,
                isDisabled,
                isInvalid: !!error,
                disableDropdown,
                variant,
                size,
                isDateTime: true,
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
                    includesTime: true,
                    datePickerState: dialogState,
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
const DateTimePicker = ({
  fullIso = true,
  ...props
}) => {
  const formatDateValue = (dateValue) => {
    if (dateValue === null) {
      return null;
    }
    if (fullIso) {
      return DateTimeUtils.fromCalendarDateTimeToUTCISO(dateValue);
    }
    return DateTimeUtils.fromDateValueToISO(dateValue);
  };
  const parseDateValue = (isoString) => {
    if (isoString == null) {
      return isoString;
    }
    return DateTimeUtils.fromISOtoZonedDateTime(isoString);
  };
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          DateTimePickerBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: parseDateValue(field.value),
            onChange: (value) => field.onChange(formatDateValue(value)),
            onBlur: field.onBlur,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    DateTimePickerBase,
    {
      ...props,
      value: parseDateValue(props.value),
      onChange: (value) => props.onChange?.(formatDateValue(value))
    }
  );
};
export {
  DateTimePicker
};
