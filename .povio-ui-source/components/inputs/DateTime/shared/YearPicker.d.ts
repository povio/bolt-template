import { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import { Key } from 'react-aria-components';
interface YearPickerProps {
    state: CalendarState | RangeCalendarState;
    onSelectionChange: (key: Set<Key>) => void;
}
export declare const YearPicker: ({ state, onSelectionChange }: YearPickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
