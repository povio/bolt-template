import { PropsWithChildren, RefObject } from 'react';
import { ModalVariantProps } from './modal.cva';
export interface ModalProps extends ModalVariantProps {
    isOpen: boolean;
    portalContainerRef?: RefObject<HTMLElement>;
    onClose: () => void;
    modalClassName?: string;
    closeIconClassName?: string;
    showCloseIcon?: boolean;
    isDismissable?: boolean;
}
export declare const Modal: ({ isOpen, portalContainerRef, onClose, aside, children, modalClassName, closeIconClassName, showCloseIcon, isDismissable, }: PropsWithChildren<ModalProps>) => import("react/jsx-runtime").JSX.Element;
