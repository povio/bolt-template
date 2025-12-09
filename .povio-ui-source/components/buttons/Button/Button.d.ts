import { FC, ReactElement, SVGProps } from 'react';
import { ButtonProps as AriaButtonProps, ToggleButtonProps as AriaToggleButtonProps } from 'react-aria-components';
import { ButtonContentVariantProps } from '../shared/buttonContent.cva';
import { LinkNavigationProps } from '../../text/Link/Link';
import { ButtonVariantProps } from './button.cva';
export type ButtonIconProps<IconOnly extends boolean = false> = {
    iconOnly?: IconOnly;
} & (IconOnly extends true ? {
    icon: FC<SVGProps<SVGSVGElement>> | ReactElement;
} : {
    icon?: FC<SVGProps<SVGSVGElement>> | ReactElement;
});
type ToggleButtonProps = {
    toggle?: false;
} | ({
    toggle: true;
    isSelected?: boolean;
} & AriaToggleButtonProps);
export type ButtonProps<IconOnly extends boolean = false> = ButtonVariantProps & ButtonContentVariantProps & AriaButtonProps & ButtonIconProps<IconOnly> & ToggleButtonProps & {
    children: string;
    isLoading?: boolean;
    link?: LinkNavigationProps;
    noDisableWhenLoading?: boolean;
    iconClassName?: string;
    disableTooltip?: boolean;
};
export declare const Button: <IconOnly extends boolean = false>({ icon: Icon, iconPosition, children, isLoading, className, link, iconClassName, noDisableWhenLoading, disableTooltip, ...props }: ButtonProps<IconOnly>) => import("react/jsx-runtime").JSX.Element;
export {};
