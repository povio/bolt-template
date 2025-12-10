import { GroupDOMAttributes } from '@react-types/shared';
import { Ref } from 'react';
import { TimeFieldState } from 'react-stately';
interface TimeFieldProps {
    ref?: Ref<HTMLDivElement>;
    fieldProps: GroupDOMAttributes;
    state: TimeFieldState;
    isDisabled?: boolean;
    hidePlaceholder?: boolean;
}
export declare const TimeField: ({ ref, fieldProps, state, isDisabled, hidePlaceholder }: TimeFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
