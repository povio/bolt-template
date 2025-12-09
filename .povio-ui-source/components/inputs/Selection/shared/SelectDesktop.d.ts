import { Key } from 'react-aria-components';
import { SelectBaseProps } from './SelectBase';
type SelectDesktopProps<TKey extends Key = Key> = SelectBaseProps<TKey>;
export declare const SelectDesktop: <TKey extends Key = Key>({ ref, error, ignoreTriggerWidth, showSelectionContent, inputClassName, containerClassName, customTrigger, onBlur, ...props }: SelectDesktopProps<TKey>) => import("react/jsx-runtime").JSX.Element;
export {};
