import { ToastPosition } from 'react-toastify';
import { ToastProps } from './Toast';
type IShowToast = Omit<ToastProps, "color"> & {
    position?: ToastPosition;
};
export declare const useToast: () => {
    successToast: (params: IShowToast) => void;
    errorToast: (params: IShowToast) => void;
    warningToast: (params: IShowToast) => void;
    neutralToast: (params: IShowToast) => void;
};
export {};
