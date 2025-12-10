import { RangeCalendarState, RangeCalendarStateOptions } from '@react-stately/calendar';
import { KeyboardEvent } from 'react';
import { DateValue } from 'react-aria';
interface DateRange {
    start: DateValue;
    end: DateValue;
}
interface CalendarProps {
    className?: string;
    leftCalendarState: RangeCalendarState;
    rightCalendarState: RangeCalendarState;
    calendarProps: Omit<RangeCalendarStateOptions, "locale" | "createCalendar">;
    onApply: () => void;
    onRangeChange?: (value: DateRange | null) => void;
    onDateSelection?: (date: DateValue, calendarSide?: "left" | "right") => void;
    onDateHover?: (date: DateValue | null) => void;
    rangeSelection?: {
        start: DateValue | null;
        end: DateValue | null;
        isSelecting: boolean;
    };
    hoverDate?: DateValue | null;
    onKeyboardNavigation?: (event: KeyboardEvent, date: DateValue, calendarSide: "left" | "right") => boolean;
}
export declare const RangeCalendar: ({ className, leftCalendarState, rightCalendarState, calendarProps, onApply, onRangeChange: _onRangeChange, onDateSelection, onDateHover, rangeSelection, hoverDate, onKeyboardNavigation, }: CalendarProps) => import("react/jsx-runtime").JSX.Element;
export {};
