import { VariantProps } from 'class-variance-authority';
import { TypographyVariantProps } from '../../text/Typography/typography.cva';
export declare const radio: (props?: ({
    variant?: "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface RadioVariantProps extends VariantProps<typeof radio> {
}
export declare const radioIndicatorClass = "group flex items-center gap-2";
export declare const radioTypography: (props: {
    variant?: "default" | null | undefined;
}) => TypographyVariantProps | undefined;
