import { FC, ReactElement, SVGProps } from 'react';
import { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { ButtonVariantProps } from '../Button/button.cva';
import { LinkNavigationProps } from '../../text/Link/Link';
export interface IconButtonProps extends ButtonVariantProps, Omit<AriaButtonProps, "children"> {
    label: string;
    icon: FC<SVGProps<SVGSVGElement>> | ReactElement;
    link?: LinkNavigationProps;
    disableTooltip?: boolean;
}
export declare const IconButton: ({ label, ...props }: IconButtonProps) => import("react/jsx-runtime").JSX.Element;
