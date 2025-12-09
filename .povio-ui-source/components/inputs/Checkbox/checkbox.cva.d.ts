import { VariantProps } from 'class-variance-authority';
import { TypographyVariantProps } from '../../text/Typography/typography.cva';
export declare const checkbox: (props?: ({
    variant?: "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface CheckboxVariantProps extends VariantProps<typeof checkbox> {
}
export declare const checkboxIndicatorClass = "group flex items-center gap-2";
export declare const checkboxTypography: (props: {
    variant?: "default" | null | undefined;
}) => TypographyVariantProps | undefined;
