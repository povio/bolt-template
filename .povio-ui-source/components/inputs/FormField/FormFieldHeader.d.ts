import { DOMAttributes } from '@react-types/shared';
import { ReactNode } from 'react';
export interface FormFieldHeaderProps {
    label: string;
    tooltipText?: string;
    helperText?: string;
    isRequired?: boolean;
    rightContent?: ReactNode;
    isHeaderHidden?: boolean;
    isDisabled?: boolean;
    className?: string;
    labelProps?: DOMAttributes<HTMLLabelElement>;
}
export declare const FormFieldHeader: ({ label, tooltipText, helperText, isRequired, rightContent, isHeaderHidden, isDisabled, className, labelProps, }: FormFieldHeaderProps) => import("react/jsx-runtime").JSX.Element;
