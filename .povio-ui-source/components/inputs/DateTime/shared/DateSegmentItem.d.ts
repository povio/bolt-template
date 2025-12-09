import { DateFieldState, DateSegment } from '@react-stately/datepicker';
interface DateSegmentProps {
    state: DateFieldState;
    segment: DateSegment;
    isDisabled?: boolean;
    timePickerOnly?: boolean;
    hidePlaceholder?: boolean;
}
export declare const getPlaceholder: (segment: DateSegment) => string | null;
export declare const DateSegmentItem: ({ segment, state, isDisabled, timePickerOnly, hidePlaceholder }: DateSegmentProps) => import("react/jsx-runtime").JSX.Element;
export {};
