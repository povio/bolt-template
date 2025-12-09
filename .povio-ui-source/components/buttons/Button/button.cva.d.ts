import { VariantProps } from 'class-variance-authority';
import { TypographyVariantProps } from '../../text/Typography/typography.cva';
export declare const button: (props?: ({
    width?: "fill" | "hug" | null | undefined;
    size?: "none" | "xs" | "s" | "m" | "l" | null | undefined;
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "dual" | null | undefined;
    variant?: "contained" | "outlined" | "subtle" | "text" | "ghost" | null | undefined;
    inverted?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ButtonVariantProps extends VariantProps<typeof button> {
}
export declare const buttonSize: (props?: ({
    size?: "none" | "xs" | "s" | "m" | "l" | null | undefined;
    iconOnly?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const buttonContent: (props?: ({
    size?: "none" | "xs" | "s" | "m" | "l" | null | undefined;
    iconPosition?: "none" | "left" | "right" | null | undefined;
    iconOnly?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const buttonIconSize: (props?: ({
    size?: "none" | "xs" | "s" | "m" | "l" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const buttonTypography: (props: {
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "dual" | null | undefined;
    width?: "fill" | "hug" | null | undefined;
    size?: "none" | "xs" | "s" | "m" | "l" | null | undefined;
    variant?: "contained" | "outlined" | "subtle" | "text" | "ghost" | null | undefined;
    inverted?: boolean | null | undefined;
}) => TypographyVariantProps | undefined;
