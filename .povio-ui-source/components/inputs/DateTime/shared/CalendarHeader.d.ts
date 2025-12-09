import { AriaButtonProps } from '@react-aria/button';
import { CalendarState } from '@react-stately/calendar';
import { DatePickerState } from 'react-stately';
import { ToggleState } from './Calendar';
interface CalendarProps {
    calendarState: CalendarState;
    datePickerState?: DatePickerState;
    prevButtonProps: AriaButtonProps;
    nextButtonProps: AriaButtonProps;
    includesTime?: boolean;
    hourCycle?: 12 | 24;
    toggleState: ToggleState | null;
    setToggleState: (state: ToggleState | null) => void;
}
export declare const CalendarHeader: ({ calendarState, datePickerState, prevButtonProps, nextButtonProps, includesTime, hourCycle, toggleState, setToggleState, }: CalendarProps) => import("react/jsx-runtime").JSX.Element;
export {};
