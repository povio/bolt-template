import { DatePickerState, TimeFieldState } from '@react-stately/datepicker';
type TimePickerFormProps = {
    state: TimeFieldState;
    datePickerState?: never;
} | {
    state?: never;
    datePickerState: DatePickerState;
};
export declare const TimePickerForm: ({ state, datePickerState }: TimePickerFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
