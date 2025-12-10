import { HTMLAttributes, Ref } from 'react';
import { TypographyVariantProps } from './typography.cva';
type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
interface TypographyPropsCva extends Omit<TypographyVariantProps, "size">, Required<Pick<TypographyVariantProps, "size">> {
}
export interface TypographyProps extends TypographyPropsCva, HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLHeadingElement>;
    as?: TypographyTag;
}
export declare const Typography: ({ as, className, ...props }: TypographyProps) => import("react/jsx-runtime").JSX.Element;
export {};
