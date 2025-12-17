import { PropsWithChildren, ReactNode } from 'react';
import { TooltipProps as AriaTooltipProps } from 'react-aria-components';
import { TooltipVariantProps } from './tooltip.cva';
export interface TooltipProps extends PropsWithChildren<AriaTooltipProps>, TooltipVariantProps {
    text: ReactNode;
    isDisabled?: boolean;
    delay?: number;
    closeDelay?: number;
    isNonInteractiveTrigger?: boolean;
    triggerClassName?: string;
    triggerTabIndex?: number;
}
export declare const Tooltip: ({ children, text, isDisabled, delay, closeDelay, color, isNonInteractiveTrigger, triggerClassName, triggerTabIndex, ...tooltipProps }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
