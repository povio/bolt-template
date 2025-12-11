import { Id, ToastPosition, ToastOptions as ToastifyToastOptions } from 'react-toastify';
import { ToastProps } from './Toast';
export interface ToastParams extends Omit<ToastProps, "color"> {
    position?: ToastPosition;
}
export type ToastOptions = Omit<ToastifyToastOptions, "position" | "data">;
export declare const useToast: () => {
    successToast: (params: ToastParams, options?: ToastOptions) => Id;
    errorToast: (params: ToastParams, options?: ToastOptions) => Id;
    warningToast: (params: ToastParams, options?: ToastOptions) => Id;
    neutralToast: (params: ToastParams, options?: ToastOptions) => Id;
    closeToast: (id: Id) => void;
};
