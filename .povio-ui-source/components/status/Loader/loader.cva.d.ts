import { VariantProps } from 'class-variance-authority';
export declare const loaderWrapper: (props?: ({
    size?: "default" | "l" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const loader: (props?: ({
    size?: "default" | "l" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface LoaderVariantProps extends VariantProps<typeof loader> {
}
