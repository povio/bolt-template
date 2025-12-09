import { ReactElement, ReactNode } from 'react';
export interface ResponsivePopoverProps {
    trigger: ReactElement;
    children: ReactNode;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    popoverClassName?: string;
    sheetLabel: string;
}
export declare const ResponsivePopover: ({ trigger, isOpen, onOpenChange, children, popoverClassName, sheetLabel, }: ResponsivePopoverProps) => import("react/jsx-runtime").JSX.Element;
