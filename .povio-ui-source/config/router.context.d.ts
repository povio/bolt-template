import { PropsWithChildren } from 'react';
interface UIRouterProviderProps {
    push: (url: string) => Promise<boolean>;
    replace: (url: string) => Promise<boolean>;
    pathname: string;
    searchString: string;
}
interface UIRouterContextValue extends UIRouterProviderProps {
    searchParams: URLSearchParams;
}
export declare namespace UIRouter {
    const UIRouterProvider: ({ children, pathname, push, replace, searchString, }: PropsWithChildren<UIRouterProviderProps>) => import("react/jsx-runtime").JSX.Element;
    const useUIRouter: () => UIRouterContextValue;
}
export {};
