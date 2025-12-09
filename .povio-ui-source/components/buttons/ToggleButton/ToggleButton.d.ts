import { ToggleButtonProps as AriaToggleButtonProps } from 'react-aria-components';
import { ButtonIconProps } from '../Button/Button';
import { ButtonVariantProps } from '../Button/button.cva';
import { ButtonContentVariantProps } from '../shared/buttonContent.cva';
export type ToggleButtonProps = ButtonVariantProps & ButtonContentVariantProps & AriaToggleButtonProps & ButtonIconProps<true | false> & {
    children: string;
    disableTooltip?: boolean;
};
export declare const ToggleButton: ({ children, ...props }: ToggleButtonProps) => import("react/jsx-runtime").JSX.Element;
