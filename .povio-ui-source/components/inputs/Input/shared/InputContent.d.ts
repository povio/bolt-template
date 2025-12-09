import { CSSProperties, FC, ReactElement, ReactNode, SVGProps } from 'react';
import { InlineIconButtonProps } from '../../../buttons/InlineIconButton/InlineIconButton';
import { FormFieldHeaderProps } from '../../FormField/FormFieldHeader';
import { InputVariantProps } from '../../shared/input.cva';
export interface InputContentProps {
    className?: string;
    unit?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    action?: {
        icon: InlineIconButtonProps["icon"];
        onClick: () => void;
        altText: string;
        className?: string;
    };
    leadingIcon?: FC<SVGProps<SVGSVGElement>> | ReactElement;
    trailingIcon?: FC<SVGProps<SVGSVGElement>> | ReactElement;
    isClearable?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    headerProps?: FormFieldHeaderProps;
}
interface InputContentComponentProps extends InputContentProps, InputVariantProps {
    children: (style: CSSProperties) => ReactNode;
}
export declare const InputContent: ({ leadingIcon: LeadingIcon, trailingIcon: TrailingIcon, unit, isLoading, isDisabled, action, isClearable, value, onChange, children, headerProps, as, size, }: InputContentComponentProps) => import("react/jsx-runtime").JSX.Element;
export {};
