import { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { ButtonIconProps } from '../Button/Button';
import { ButtonVariantProps } from '../Button/button.cva';
import { ButtonContentVariantProps } from '../shared/buttonContent.cva';
import { LinkNavigationProps } from '../../text/Link/Link';
export type TextButtonProps = Omit<ButtonVariantProps, "variant"> & ButtonContentVariantProps & AriaButtonProps & ButtonIconProps<true | false> & {
    children: string;
    isLoading?: boolean;
    link?: LinkNavigationProps;
    disableTooltip?: boolean;
};
export declare const TextButton: ({ children, ...props }: TextButtonProps) => import("react/jsx-runtime").JSX.Element;
