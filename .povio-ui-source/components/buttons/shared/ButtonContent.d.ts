import { FC, ReactElement, Ref, SVGProps } from 'react';
import { ButtonVariantProps } from '../Button/button.cva';
import { ButtonContentVariantProps } from './buttonContent.cva';
import { TypographyVariantProps } from '../../text/Typography/typography.cva';
interface ButtonContentProps extends ButtonContentVariantProps, Pick<ButtonVariantProps, "size"> {
    ref?: Ref<HTMLHeadingElement>;
    text: string;
    isLoading?: boolean;
    className?: string;
    icon?: FC<SVGProps<SVGSVGElement>> | ReactElement;
    iconClassName?: string;
    hideText?: boolean;
    typography?: TypographyVariantProps;
}
export declare const ButtonContent: ({ ref, text, isLoading, className, icon: Icon, iconClassName, hideText, iconPosition, typography, }: ButtonContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
