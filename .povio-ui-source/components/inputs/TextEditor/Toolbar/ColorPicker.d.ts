interface ColorPickerProps {
    colors: string[];
    value: string | undefined;
    onChange: (value: string) => void;
}
export declare const ColorPicker: ({ colors, value, onChange }: ColorPickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
