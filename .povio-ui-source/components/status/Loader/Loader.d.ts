import { SVGProps } from 'react';
import { LoaderVariantProps } from './loader.cva';
export interface LoaderProps extends LoaderVariantProps, SVGProps<SVGSVGElement> {
}
export declare const Loader: ({ size, className, ...props }: Omit<LoaderProps, "color">) => import("react/jsx-runtime").JSX.Element;
