import { Ref } from 'react';
import { DateFieldAria } from 'react-aria';
import { TimeFieldState } from 'react-stately';
import { FormFieldHeaderProps } from '../../FormField/FormFieldHeader';
import { InputVariantProps } from '../../shared/input.cva';
interface DatePickerInputProps extends InputVariantProps {
    ref?: Ref<HTMLDivElement>;
    fieldProps: DateFieldAria["fieldProps"];
    state: TimeFieldState;
    isDisabled?: boolean;
    isInvalid?: boolean;
    disableDropdown?: boolean;
    headerProps?: FormFieldHeaderProps;
    isClearable?: boolean;
    onPress: () => void;
}
export declare const TimePickerInput: ({ ref, as, fieldProps, state, isDisabled, isInvalid, disableDropdown, variant, size, isClearable, headerProps, onPress, ...props }: DatePickerInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
