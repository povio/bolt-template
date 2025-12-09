import { AriaFieldProps } from 'react-aria';
import { ComboBoxState } from 'react-stately';
import { FormFieldHeaderProps } from '../../FormField/FormFieldHeader';
import { SelectBaseProps } from './SelectBase';
import { SelectItem } from './select.types';
import { InputVariantProps } from '../../shared/input.cva';
interface SelectInputProps extends InputVariantProps, Pick<SelectBaseProps, "ref" | "placeholder" | "isDisabled" | "hideDropdownIcon" | "isSearchable" | "isClearable" | "onBlur" | "showSelectionContent" | "inputClassName" | "selectedTagsType" | "collapseAfter"> {
    isInvalid?: boolean;
    className?: string;
    fieldProps?: AriaFieldProps;
    headerProps?: FormFieldHeaderProps;
    onCloseComboBox?: (state: ComboBoxState<SelectItem> | null) => void;
}
export declare const SelectInput: ({ ref, placeholder, variant, as, size, isDisabled, isInvalid, className, hideDropdownIcon, isSearchable, isClearable, showSelectionContent, inputClassName, fieldProps, headerProps, selectedTagsType, collapseAfter, onCloseComboBox, onBlur, ...props }: SelectInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
