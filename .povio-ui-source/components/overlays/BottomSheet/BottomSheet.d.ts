import { ReactNode, RefObject } from 'react';
type BottomSheetState = "closed" | "opening" | "opened" | "closing";
interface BottomSheetBaseProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    onStateChange?: (state: BottomSheetState) => void;
    isDismissable?: boolean;
    isScrollable?: boolean;
    height?: "auto" | "full";
    label?: string;
    portalContainerRef?: RefObject<HTMLElement>;
    children: ReactNode | ((close: () => void) => ReactNode);
    footer?: ReactNode;
    sheetMarginTop?: number;
    sheetMarginBottom?: number;
}
export interface BottomSheetProps extends BottomSheetBaseProps {
    trigger?: ReactNode;
}
export declare const BottomSheet: ({ isOpen, portalContainerRef, onOpenChange, trigger, children, ...rest }: BottomSheetProps) => import("react/jsx-runtime").JSX.Element;
export {};
