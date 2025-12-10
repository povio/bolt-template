import { CalendarState, CalendarStateOptions } from '@react-stately/calendar';
import { DatePickerState } from 'react-stately';
type DateTimeCalendarProps = {
    includesTime?: false;
    datePickerState?: never;
    hourCycle?: never;
} | {
    includesTime: true;
    datePickerState: DatePickerState;
    hourCycle?: 12 | 24;
};
type CalendarProps = DateTimeCalendarProps & {
    className?: string;
    state: CalendarState;
    calendarProps: Omit<CalendarStateOptions, "locale" | "createCalendar">;
    onApply: () => void;
};
export type ToggleState = "month" | "year" | "time";
export declare const Calendar: ({ className, includesTime, datePickerState, hourCycle, onApply, ...props }: CalendarProps) => import("react/jsx-runtime").JSX.Element;
export {};
