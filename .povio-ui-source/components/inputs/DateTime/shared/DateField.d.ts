import { DateFieldStateOptions } from '@react-stately/datepicker';
import { Ref } from 'react';
export interface DateFieldHandle {
    clearField: () => void;
}
interface DateFieldProps extends Omit<DateFieldStateOptions, "locale" | "createCalendar"> {
    ref?: Ref<DateFieldHandle>;
    onClearChange?: (canClear: boolean) => void;
    hidePlaceholder?: boolean;
}
export declare const DateField: ({ ref, onClearChange, hidePlaceholder, ...props }: DateFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
