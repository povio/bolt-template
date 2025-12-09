import { VariantProps } from 'class-variance-authority';
import { TypographyVariantProps } from '../../text/Typography/typography.cva';
export declare const pillButton: (props?: ({
    color?: "primary" | "secondary" | "success" | "warning" | "error" | null | undefined;
    variant?: "contained" | "outlined" | "subtle" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface PillButtonVariants extends VariantProps<typeof pillButton> {
}
export declare const pillButtonContent: (props?: ({
    iconPosition?: "none" | "left" | "right" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const pillButtonIconSize: string;
export declare const pillButtonTypography: (props: {
    color?: "primary" | "secondary" | "success" | "warning" | "error" | null | undefined;
    variant?: "contained" | "outlined" | "subtle" | null | undefined;
}) => TypographyVariantProps | undefined;
