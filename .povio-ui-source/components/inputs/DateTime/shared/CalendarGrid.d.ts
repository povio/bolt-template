import { AriaCalendarGridProps } from '@react-aria/calendar';
import { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import { KeyboardEvent } from 'react';
import { DateValue } from 'react-aria';
interface CalendarGridProps extends AriaCalendarGridProps {
    state: CalendarState | RangeCalendarState;
    onApply?: () => void;
    offset?: {
        months?: number;
    };
    shouldCloseOnSelect?: boolean;
    onDateSelection?: (date: DateValue, calendarSide?: "left" | "right") => void;
    onDateHover?: (date: DateValue | null) => void;
    rangeSelection?: {
        start: DateValue | null;
        end: DateValue | null;
        isSelecting: boolean;
    };
    hoverDate?: DateValue | null;
    className?: string;
    onKeyboardNavigation?: (event: KeyboardEvent, date: DateValue) => boolean;
    calendarSide?: "left" | "right";
}
export declare const CalendarGrid: ({ state, onApply, shouldCloseOnSelect, offset, onDateSelection, onDateHover, rangeSelection, hoverDate, onKeyboardNavigation, className, calendarSide, ...props }: CalendarGridProps) => import("react/jsx-runtime").JSX.Element;
export {};
