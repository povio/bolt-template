import { SelectItem } from './select.types';
interface SelectListBoxLoadingItemProps extends Omit<SelectItem, "isDisabled"> {
    onLoadMore?: () => void;
}
export declare const SelectListBoxLoadingItem: ({ id, label, onLoadMore }: SelectListBoxLoadingItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
