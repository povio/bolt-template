import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
export declare const inputBase: (props?: ({
    variant?: "outlined" | "filled" | null | undefined;
    as?: "default" | "filter" | "inline" | "floating" | null | undefined;
} & ClassProp) | undefined) => string;
export interface InputBaseProps extends VariantProps<typeof inputBase> {
}
export declare const inputSize: (props?: ({
    size?: "default" | "small" | "extra-small" | "large" | null | undefined;
} & ClassProp) | undefined) => string;
export interface InputSizeProps extends VariantProps<typeof inputSize> {
}
export declare const inputSide: (props?: ({
    size?: "default" | "small" | "extra-small" | "large" | null | undefined;
    type?: "left" | "right" | "var" | null | undefined;
} & ClassProp) | undefined) => string;
export interface InputSideProps extends VariantProps<typeof inputSide> {
}
export interface InputVariantProps extends InputBaseProps, InputSizeProps {
}
export declare const useInputCva: () => ({ className, ...rest }: InputVariantProps & ClassProp) => string;
