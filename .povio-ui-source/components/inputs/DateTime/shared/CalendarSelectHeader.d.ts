import { CalendarDate } from '@internationalized/date';
import { CalendarState, RangeCalendarState } from '@react-stately/calendar';
interface CalendarSelectHeaderProps {
    state: CalendarState | RangeCalendarState;
    isPrevMonthDisabled?: boolean;
    isPrevYearDisabled?: boolean;
    isNextMonthDisabled?: boolean;
    isNextYearDisabled?: boolean;
    offset?: {
        months: number;
    };
    onNavigate?: (newDate: CalendarDate) => void;
    maxDate?: CalendarDate;
    minDate?: CalendarDate;
}
export declare const CalendarSelectHeader: ({ state, isPrevMonthDisabled, isPrevYearDisabled, isNextMonthDisabled, isNextYearDisabled, offset, onNavigate, maxDate, minDate, }: CalendarSelectHeaderProps) => import("react/jsx-runtime").JSX.Element;
export {};
