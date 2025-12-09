import { jsx } from "react/jsx-runtime";
import { isSameDay } from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import { useRef, useCallback, useMemo } from "react";
import { Typography } from "../../../text/Typography/Typography.js";
const isRange = (state) => {
  return "highlightedRange" in state;
};
const CalendarCell = ({
  state,
  onApply,
  shouldCloseOnSelect = true,
  onDateSelection,
  onDateHover,
  rangeSelection,
  hoverDate,
  onKeyboardNavigation,
  ...props
}) => {
  const ref = useRef(null);
  const { cellProps, buttonProps, formattedDate, isSelected, isDisabled, isOutsideVisibleRange } = useCalendarCell(
    props,
    state,
    ref
  );
  const { focusProps } = useFocusRing();
  const onClick = useCallback(
    (event) => {
      buttonProps.onClick?.(event);
      if (onDateSelection) {
        onDateSelection(props.date);
      }
      if (isSelected && shouldCloseOnSelect) {
        onApply?.();
      }
    },
    [buttonProps, onDateSelection, props.date, isSelected, shouldCloseOnSelect, onApply]
  );
  const selectionState = useMemo(() => {
    let isSelectionStart = false;
    let isSelectionEnd = false;
    let isSelectedCell = false;
    let isInRange = false;
    let isHoverRange = false;
    let isSelectingMode = false;
    if (rangeSelection?.start) {
      isSelectionStart = isSameDay(props.date, rangeSelection.start);
      isSelectionEnd = rangeSelection.end ? isSameDay(props.date, rangeSelection.end) : false;
      isSelectedCell = isSelectionStart || isSelectionEnd;
      isSelectingMode = rangeSelection.isSelecting && !rangeSelection.end;
      if (rangeSelection.start && rangeSelection.end) {
        const dateValue = props.date;
        const isAfterStart = dateValue.compare(rangeSelection.start) > 0;
        const isBeforeEnd = dateValue.compare(rangeSelection.end) < 0;
        isInRange = isAfterStart && isBeforeEnd;
      }
      if (rangeSelection.isSelecting && rangeSelection.start && hoverDate && !rangeSelection.end) {
        const dateValue = props.date;
        const { start } = rangeSelection;
        const end = hoverDate;
        const earlierDate = start.compare(end) <= 0 ? start : end;
        const laterDate = start.compare(end) <= 0 ? end : start;
        const isAfterStart = dateValue.compare(earlierDate) > 0;
        const isBeforeEnd = dateValue.compare(laterDate) < 0;
        isHoverRange = isAfterStart && isBeforeEnd;
      }
    } else {
      isSelectionStart = isRange(state) && state.highlightedRange ? isSameDay(props.date, state.highlightedRange.start) : isSelected;
      isSelectionEnd = isRange(state) && state.highlightedRange ? isSameDay(props.date, state.highlightedRange.end) : isSelected;
      isSelectedCell = isSelectionStart || isSelectionEnd || !isRange(state) && isSelected;
      isInRange = isRange(state) && isSelected && !isSelectionStart && !isSelectionEnd;
      if (isRange(state) && state.highlightedRange && !isSelected) {
        const dateValue = props.date;
        const isAfterStart = dateValue.compare(state.highlightedRange.start) > 0;
        const isBeforeEnd = dateValue.compare(state.highlightedRange.end) < 0;
        isHoverRange = isAfterStart && isBeforeEnd;
      }
    }
    return { isSelectionStart, isSelectionEnd, isSelectedCell, isInRange, isHoverRange, isSelectingMode };
  }, [props.date, rangeSelection, state, isSelected, hoverDate]);
  const handleEvent = (event, eventHandler) => {
    if (isOutsideVisibleRange) {
      state.selectDate(props.date);
      state.setFocusedDate(props.date);
    }
    eventHandler?.(event);
    if (isSelected && shouldCloseOnSelect) {
      onApply?.();
    }
  };
  const onMouseEnter = useCallback(() => {
    if (onDateHover && selectionState.isSelectingMode) {
      onDateHover(props.date);
    }
  }, [onDateHover, selectionState.isSelectingMode, props.date]);
  const onMouseLeave = useCallback(() => {
    if (onDateHover && selectionState.isSelectingMode) {
      onDateHover(null);
    }
  }, [onDateHover, selectionState.isSelectingMode]);
  const cellClassName = useMemo(() => {
    const { isSelectedCell, isInRange, isHoverRange, isSelectingMode, isSelectionStart, isSelectionEnd } = selectionState;
    return clsx(
      "mx-auto flex h-10 w-full max-w-10 items-center justify-center rounded-button-rounding-m p-2",
      "focus:outline-none focus-visible:outline-1 focus-visible:outline-interactive-contained-primary-focus focus-visible:outline-offset-1",
      "border border-transparent border-solid",
      // Base text colors
      !isSelectedCell && !isOutsideVisibleRange && "bg-elevation-fill-default-1 text-interactive-text-secondary-idle",
      !isSelectedCell && isOutsideVisibleRange && "bg-elevation-fill-default-1 text-interactive-text-secondary-disabled",
      // Selected cell styling
      isSelectedCell && !isOutsideVisibleRange && "bg-interactive-contained-primary-idle text-interactive-contained-primary-on-idle",
      // Selection start cell styling
      isSelectedCell && !isOutsideVisibleRange && rangeSelection && !rangeSelection.isSelecting && isSelectionStart && !isSelectionEnd && "rounded-r-none",
      // Selection end cell styling
      isSelectedCell && !isOutsideVisibleRange && rangeSelection && !rangeSelection.isSelecting && isSelectionEnd && !isSelectionStart && "rounded-l-none",
      // Disabled state
      isDisabled && !isOutsideVisibleRange && "cursor-default",
      // Disabled cell styling
      isDisabled && "opacity-20",
      // Regular hover state - only for non-selected, non-disabled, visible cells when not in selecting mode
      !isSelectedCell && !isInRange && !isHoverRange && !isSelectingMode && !isDisabled && !isOutsideVisibleRange && "[@media(pointer:fine)]:hover:border-elevation-outline-default-1 [@media(pointer:fine)]:hover:text-interactive-text-secondary-hover",
      // Range styling - for dates between start and end
      isInRange && !isOutsideVisibleRange && "!rounded-none !bg-elevation-fill-default-2 text-interactive-text-secondary-hover",
      // Hover range styling - for potential range during hover
      isHoverRange && !isOutsideVisibleRange && "!rounded-none !bg-elevation-fill-default-2 text-interactive-text-secondary-hover",
      // Hover state for selecting mode
      !isInRange && !isSelectedCell && isSelectingMode && "hover:bg-interactive-contained-primary-idle hover:text-interactive-text-primary-idle-inverted",
      // css only hover effect during selection mode for better performance
      isSelectingMode && !isSelectedCell && !isInRange && !isHoverRange && !isDisabled && !isOutsideVisibleRange && "transition-all duration-75 hover:border-elevation-outline-default-1"
    );
  }, [selectionState, isOutsideVisibleRange, rangeSelection, isDisabled]);
  return /* @__PURE__ */ jsx("td", { ...cellProps, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      ...mergeProps(buttonProps, focusProps),
      "aria-disabled": void 0,
      onMouseEnter,
      onMouseLeave,
      className: cellClassName,
      onClick: (e) => handleEvent(e, onClick),
      onKeyDown: (e) => handleEvent(e, () => onKeyboardNavigation?.(e, props.date)),
      children: /* @__PURE__ */ jsx(
        Typography,
        {
          as: "span",
          size: "label-2",
          className: "block w-6 overflow-hidden text-ellipsis text-center",
          children: formattedDate
        }
      )
    }
  ) });
};
export {
  CalendarCell
};
