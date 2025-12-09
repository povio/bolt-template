import { FC, ReactNode, SVGProps } from 'react';
import { AlertVariantProps } from './alert.cva';
export interface AlertProps extends AlertVariantProps {
    text: string;
    isLoading?: boolean;
    icon?: FC<SVGProps<SVGSVGElement>>;
    rightContent?: ReactNode;
    hasSeparator?: boolean;
    className?: string;
}
export declare const Alert: ({ variant, color, text, isLoading, rightContent, hasSeparator, icon: Icon, className, }: AlertProps) => import("react/jsx-runtime").JSX.Element;
