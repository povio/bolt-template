import { ReactNode, RefObject } from 'react';
import { AriaDialogProps } from 'react-aria';
interface DateTimeDialogProps {
    children: ReactNode;
    footer: ReactNode;
    sidebar?: ReactNode;
    hideSidebar?: boolean;
    label: string;
    isOpen: boolean;
    triggerRef?: RefObject<HTMLElement | null>;
    dialogProps?: AriaDialogProps;
    onOpenChange: (open: boolean) => void;
}
export declare const DateTimeDialog: ({ hideSidebar, children, footer, sidebar, label, isOpen, triggerRef, dialogProps, onOpenChange, }: DateTimeDialogProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
