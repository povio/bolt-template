import { ReactNode, RefObject } from 'react';
export interface DrawerProps {
    isOpen?: boolean;
    portalContainerRef?: RefObject<HTMLElement>;
    onOpenChange?: (isOpen: boolean) => void;
    trigger?: ReactNode;
    children: (close: () => void) => ReactNode;
    isDismissable?: boolean;
    overlayClassName?: string;
    dialogClassName?: string;
    className?: string;
}
export declare const Drawer: ({ isOpen, portalContainerRef, onOpenChange, trigger, children, isDismissable, overlayClassName, dialogClassName, className, }: DrawerProps) => import("react/jsx-runtime").JSX.Element;
