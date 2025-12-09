import { ComponentType, SVGProps } from 'react';
import { CheckboxVariantProps } from './checkbox.cva';
interface CheckboxCheckmarkProps extends CheckboxVariantProps {
    className?: string;
    selectedIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    indeterminateIcon?: ComponentType<SVGProps<SVGSVGElement>>;
}
export declare const CheckboxCheckmark: ({ variant, className, selectedIcon: SelectedIcon, indeterminateIcon: IndeterminateIcon, ...props }: CheckboxCheckmarkProps) => import("react/jsx-runtime").JSX.Element;
export {};
