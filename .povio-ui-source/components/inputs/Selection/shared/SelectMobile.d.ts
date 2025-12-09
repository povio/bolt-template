import { Key } from 'react-aria-components';
import { SelectBaseProps } from './SelectBase';
type SelectMobileProps<TKey extends Key = Key> = SelectBaseProps<TKey>;
export declare const SelectMobile: <TKey extends Key = Key>({ ref, error, showSelectionContent, inputClassName, containerClassName, customTrigger, onBlur, ...props }: SelectMobileProps<TKey>) => import("react/jsx-runtime").JSX.Element;
export {};
