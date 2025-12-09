import { SelectBaseProps } from './SelectBase';
import { SelectItem } from './select.types';
interface SelectListBoxItemProps extends Pick<SelectBaseProps, "isSearchable" | "newItemRender">, SelectItem {
    isNewItem?: boolean;
}
export declare const SelectListBoxItem: ({ isSearchable, isNewItem, newItemRender, id, label, content, isDisabled, }: SelectListBoxItemProps) => import("react/jsx-runtime").JSX.Element;
export declare const selectListBoxItemClass: string;
export {};
