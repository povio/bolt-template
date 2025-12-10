import { Key } from 'react-aria-components';
import { SelectBaseProps } from './SelectBase';
import { SelectItem } from './select.types';
interface SelectInputTagsProps {
    selectedItems: SelectItem[];
    isDisabled: SelectBaseProps["isDisabled"];
    selectedTagsType: SelectBaseProps["selectedTagsType"];
    collapseAfter?: SelectBaseProps["collapseAfter"];
    onRemove: (id: Key) => void;
}
export declare const SelectInputTags: ({ selectedItems, isDisabled, selectedTagsType, collapseAfter, onRemove, }: SelectInputTagsProps) => import("react/jsx-runtime").JSX.Element;
export {};
