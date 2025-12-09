import { JSX, Ref } from 'react';
export interface TooltipEllipsisProps {
    text: string;
    children: (ref: Ref<HTMLHeadingElement> | undefined) => JSX.Element;
    isDisabled?: boolean;
}
export declare const TooltipEllipsis: ({ text, children, isDisabled }: TooltipEllipsisProps) => import("react/jsx-runtime").JSX.Element;
