import { PropsWithChildren } from 'react';
import { LinkProps as AriaLinkProps } from 'react-aria-components';
import { LinkVariantProps } from './link.cva';
export interface LinkNavigationProps extends AriaLinkProps {
}
export interface LinkProps extends PropsWithChildren<LinkNavigationProps>, LinkVariantProps {
    className?: string;
}
export declare const Link: ({ variant, ...props }: LinkProps) => import("react/jsx-runtime").JSX.Element;
