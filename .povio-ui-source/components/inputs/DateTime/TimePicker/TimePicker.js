import { jsx, jsxs } from "react/jsx-runtime";
import { toTime, now, getLocalTimeZone } from "@internationalized/date";
import { mergeRefs } from "@react-aria/utils";
import { DateTime } from "luxon";
import { useState, useRef, useEffect } from "react";
import { useLocale, useTimeField } from "react-aria";
import { Controller } from "react-hook-form";
import { useTimeFieldState } from "react-stately";
import { DateTimeDialog } from "../shared/DateTimeDialog.js";
import { DateTimeDialogFooter } from "../shared/DateTimeDialogFooter.js";
import { TimePickerForm } from "../shared/TimePickerForm.js";
import { TimePickerInput } from "../shared/TimePickerInput.js";
import { FormField } from "../../FormField/FormField.js";
import { TooltipWrapper } from "../../shared/TooltipWrapper.js";
import { UIConfig } from "../../../../config/uiConfig.context.js";
import { DateTimeUtils } from "../../../../utils/date-time.utils.js";
const TimePickerBase = (props) => {
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
    variant = ui.input.variant,
    as = ui.input.as,
    size = ui.input.size,
    hideLabel = ui.input.hideLabel,
    isClearable = ui.input.isClearable,
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
  const [isOpen, setIsOpen] = useState(false);
  const skipOnChangeRef = useRef(false);
  const initialDateEmitRef = useRef(true);
  const { locale } = useLocale();
  const dialogState = useTimeFieldState({
    ...rest,
    defaultValue: value || rest.defaultValue,
    locale
  });
  const state = useTimeFieldState({
    ...rest,
    isDisabled,
    value,
    onChange: (val) => {
      if (!skipOnChangeRef.current) {
        onChange?.(val);
      }
    },
    locale
  });
  useEffect(() => {
    if (initialDateEmitRef.current) {
      initialDateEmitRef.current = false;
      return;
    }
    if (state.timeValue) {
      onChange?.(state.timeValue);
    }
  }, [rest.date]);
  useEffect(() => {
    if (dialogState.timeValue || !state.value) {
      return;
    }
    state.segments.forEach((segment) => {
      if (segment.isEditable && segment.value != null) {
        dialogState.setSegment(segment.type, segment.value);
      }
    });
  }, [state.value]);
  const timeFieldRef = useRef(null);
  const { labelProps, fieldProps } = useTimeField({ ...rest, label }, state, timeFieldRef);
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
    if (!state.timeValue) {
      skipOnChangeRef.current = true;
      dialogState.segments.forEach((segment) => {
        if (segment.isEditable && segment.value != null) {
          state.setSegment(segment.type, segment.value);
        }
      });
      skipOnChangeRef.current = false;
    }
    state.setValue(dialogState.value);
    setIsOpen(false);
  };
  const onOpenChange = (open) => {
    setIsOpen(open);
    if (!isOpen) {
      dialogState.setValue(state.value);
    }
  };
  const onOpen = () => {
    dialogState.setValue(state.value);
    setIsOpen(true);
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
              TimePickerInput,
              {
                ref: mergeRefs(ref, timeFieldRef),
                as,
                fieldProps,
                state,
                onPress: onOpen,
                isDisabled,
                isInvalid: !!error,
                disableDropdown,
                variant,
                size,
                isClearable,
                headerProps
              }
            ),
            !disableDropdown && /* @__PURE__ */ jsx(
              DateTimeDialog,
              {
                footer: /* @__PURE__ */ jsx(
                  DateTimeDialogFooter,
                  {
                    isDisabled,
                    onApply,
                    isValid: !dialogState.isInvalid && !!dialogState.value
                  }
                ),
                label,
                triggerRef: timeFieldRef,
                isOpen,
                onOpenChange,
                children: /* @__PURE__ */ jsx(TimePickerForm, { state: dialogState })
              }
            )
          ]
        }
      )
    }
  );
};
const TimePicker = (props) => {
  const formatTimeValue = (timeValue) => {
    if (timeValue === null) {
      return null;
    }
    const parsedDate = props.date ? DateTime.fromISO(props.date).toJSDate() : void 0;
    const dateValue = parsedDate ? DateTimeUtils.fromLocalToZonedDateTime(parsedDate) : now(getLocalTimeZone());
    const dateTimeValue = dateValue.set(timeValue);
    return DateTimeUtils.fromDateValueToISO(dateTimeValue);
  };
  const parseTimeValue = (isoString) => {
    if (isoString == null) {
      return isoString;
    }
    const zonedDateTime = DateTimeUtils.fromISOtoZonedDateTime(isoString);
    return toTime(zonedDateTime);
  };
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          TimePickerBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: parseTimeValue(field.value),
            onChange: (value) => field.onChange(formatTimeValue(value)),
            onBlur: field.onBlur,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    TimePickerBase,
    {
      ...props,
      value: parseTimeValue(props.value),
      onChange: (value) => props.onChange?.(formatTimeValue(value))
    }
  );
};
export {
  TimePicker
};
