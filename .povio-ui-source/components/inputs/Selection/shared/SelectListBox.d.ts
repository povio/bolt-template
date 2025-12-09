import { AriaListBoxProps } from 'react-aria';
import { SelectBaseProps } from './SelectBase';
import { SelectItem } from './select.types';
export interface SelectListBoxProps extends Pick<SelectBaseProps, "label" | "newItemRender" | "onLoadMore" | "selectionMode" | "isSearchable" | "virtualizerOptions">, Omit<AriaListBoxProps<SelectItem>, "children" | "aria-label" | "selectionMode" | "items" | "selectedKeys" | "onSelectionChange" | "escapeKeyBehavior" | "shouldSelectOnPressUp" | "label"> {
    className?: string;
    isScrollable?: boolean;
    onClose?: () => void;
}
export declare const SelectListBox: ({ label, selectionMode, isSearchable, isScrollable, virtualizerOptions, newItemRender, onLoadMore, className, onClose, ...props }: SelectListBoxProps) => import("react/jsx-runtime").JSX.Element;
