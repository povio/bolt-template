import { VariantProps } from 'class-variance-authority';
import { TypographyVariantProps } from '../../text/Typography/typography.cva';
export declare const toggle: (props?: ({
    variant?: "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ToggleVariantProps extends VariantProps<typeof toggle> {
}
export declare const toggleTypography: (props: {
    variant?: "default" | null | undefined;
}) => TypographyVariantProps | undefined;
