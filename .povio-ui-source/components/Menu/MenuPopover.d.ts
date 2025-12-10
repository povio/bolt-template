import { PopoverProps as AriaPopoverProps } from 'react-aria-components';
import { MenuProps } from './Menu';
export interface MenuPopoverProps extends Pick<MenuProps, "items">, AriaPopoverProps {
}
export declare const MenuPopover: ({ items, ...props }: MenuPopoverProps) => import("react/jsx-runtime").JSX.Element;
