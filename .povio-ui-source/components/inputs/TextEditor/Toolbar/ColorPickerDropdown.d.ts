import { ReactElement } from 'react';
interface ColorPickerDropdownProps {
    colors: string[];
    value: string | undefined;
    onChange: (color: string) => void;
    isDisabled?: boolean;
    children: ReactElement;
}
export declare const ColorPickerDropdown: ({ colors, value, onChange, isDisabled, children }: ColorPickerDropdownProps) => import("react/jsx-runtime").JSX.Element;
export {};
