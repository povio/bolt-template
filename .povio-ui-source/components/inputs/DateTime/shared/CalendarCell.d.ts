import { AriaCalendarCellProps } from '@react-aria/calendar';
import { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import { KeyboardEvent } from 'react';
import { DateValue } from 'react-aria';
interface CalendarCellProps extends AriaCalendarCellProps {
    state: CalendarState | RangeCalendarState;
    onApply?: () => void;
    shouldCloseOnSelect?: boolean;
    onDateSelection?: (date: DateValue) => void;
    onDateHover?: (date: DateValue | null) => void;
    rangeSelection?: {
        start: DateValue | null;
        end: DateValue | null;
        isSelecting: boolean;
    };
    hoverDate?: DateValue | null;
    onKeyboardNavigation?: (event: KeyboardEvent, date: DateValue) => boolean;
}
export declare const CalendarCell: ({ state, onApply, shouldCloseOnSelect, onDateSelection, onDateHover, rangeSelection, hoverDate, onKeyboardNavigation, ...props }: CalendarCellProps) => import("react/jsx-runtime").JSX.Element;
export {};
