import { FC, ReactElement, RefObject, SVGProps } from 'react';
import { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { ButtonVariantProps } from '../Button/button.cva';
import { LinkNavigationProps } from '../../text/Link/Link';
export interface InlineIconButtonProps extends Omit<AriaButtonProps, "children">, ButtonVariantProps {
    label: string;
    icon: FC<SVGProps<SVGSVGElement>> | ReactElement;
    link?: LinkNavigationProps;
    ref?: RefObject<HTMLButtonElement | HTMLAnchorElement | null>;
    disableTooltip?: boolean;
}
export declare const InlineIconButton: ({ label, ...props }: InlineIconButtonProps) => import("react/jsx-runtime").JSX.Element;
