import { VariantProps } from 'class-variance-authority';
import { TypographyVariantProps } from '../../text/Typography/typography.cva';
export declare const labelBase: (props?: ({
    as?: "default" | "filter" | "inline" | "floating" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface LabelBaseProps extends VariantProps<typeof labelBase> {
}
export declare const labelTypography: (props: {
    as?: "default" | "filter" | "inline" | "floating" | null | undefined;
}) => TypographyVariantProps | undefined;
