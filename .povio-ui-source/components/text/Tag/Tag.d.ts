import { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { TagVariantProps } from './tag.cva';
export interface TagProps extends TagVariantProps, AriaButtonProps {
    className?: string;
    children: string;
    dismissable?: boolean;
    isDisabled?: boolean;
    onDismiss?: () => void;
}
export declare const Tag: ({ color, className, children, dismissable, isDisabled, onDismiss, ...props }: TagProps) => import("react/jsx-runtime").JSX.Element;
