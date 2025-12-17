import { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { ButtonVariantProps } from '../Button/button.cva';
import { MenuItem } from '../../Menu/Menu';
import { LinkNavigationProps } from '../../text/Link/Link';
export interface SplitButtonProps extends ButtonVariantProps, Omit<AriaButtonProps, "children"> {
    label: string;
    labelRight: string;
    link?: LinkNavigationProps;
    items: MenuItem[];
    isLoading?: boolean;
}
export declare const SplitButton: ({ variant, color, width, size, label, labelRight, link, items, className, isLoading, ...props }: SplitButtonProps) => import("react/jsx-runtime").JSX.Element;
