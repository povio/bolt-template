import { DOMAttributes } from '@react-types/shared';
import { RefCallback } from 'react';
import { InputSizeProps } from '../shared/input.cva';
import { LabelBaseProps } from '../shared/label.cva';
export interface FormFieldLabelProps extends LabelBaseProps, InputSizeProps {
    label: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    ref?: RefCallback<HTMLOrSVGElement>;
    labelProps?: DOMAttributes<HTMLLabelElement>;
}
export declare const FormFieldLabel: ({ ref, as, label, isRequired, isDisabled, labelProps, size }: FormFieldLabelProps) => import("react/jsx-runtime").JSX.Element;
