import { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import { Key } from 'react-aria-components';
export interface MonthPickerProps {
    state: CalendarState | RangeCalendarState;
    onSelectionChange: (key: Set<Key>) => void;
}
export declare const MonthPicker: ({ state, onSelectionChange }: MonthPickerProps) => import("react/jsx-runtime").JSX.Element;
