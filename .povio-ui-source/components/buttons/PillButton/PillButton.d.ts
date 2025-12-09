import { FC, SVGProps } from 'react';
import { ButtonProps as AriaButtonProps, ToggleButtonProps as AriaToggleButtonProps } from 'react-aria-components';
import { PillButtonVariants } from './pillButton.cva';
import { ButtonContentVariantProps } from '../shared/buttonContent.cva';
export interface PillButtonProps extends AriaButtonProps, Omit<AriaToggleButtonProps, keyof AriaButtonProps>, ButtonContentVariantProps, PillButtonVariants {
    children: string;
    dismissable?: boolean;
    toggle?: boolean;
    icon?: FC<SVGProps<SVGSVGElement>>;
}
export declare const PillButton: ({ children, dismissable, toggle, icon, iconPosition, ...props }: PillButtonProps) => import("react/jsx-runtime").JSX.Element;
