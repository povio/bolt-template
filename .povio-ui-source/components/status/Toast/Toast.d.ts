import { FC, ReactNode, SVGProps } from 'react';
import { ToastVariantProps } from './toast.cva';
export interface ToastAction {
    text: string;
    onPress: () => void;
}
export interface ToastProps extends ToastVariantProps {
    text: ReactNode;
    isLoading?: boolean;
    icon?: FC<SVGProps<SVGSVGElement>>;
    actions?: ToastAction[];
}
export declare const Toast: ({ text, isLoading, actions, icon: Icon, ...props }: ToastProps) => import("react/jsx-runtime").JSX.Element;
export declare const ToastContainer: () => import("react/jsx-runtime").JSX.Element;
