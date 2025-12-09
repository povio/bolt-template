import { ReactElement } from 'react';
import { MenuItemProps } from 'react-aria-components';
export interface MenuItem extends Omit<MenuItemProps, "aria-label" | "textValue" | "children"> {
    label: string;
    content?: string | ReactElement;
    children?: MenuItem[];
}
export interface MenuProps {
    trigger: ReactElement;
    items: MenuItem[];
    triggerOnHover?: boolean;
    closeDelay?: number;
}
export declare const Menu: (props: MenuProps) => import("react/jsx-runtime").JSX.Element;
