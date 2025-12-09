import { PropsWithChildren } from 'react';
import { UrlObject } from 'url';
interface UIRouterProviderProps {
    push: (url: UrlObject | string) => Promise<boolean>;
    replace: (url: UrlObject | string) => Promise<boolean>;
    query: NodeJS.Dict<string | string[]>;
    pathname: string;
}
interface UIRouterContextValue {
    push: (url: UrlObject | string) => Promise<boolean>;
    replace: (url: UrlObject | string) => Promise<boolean>;
    pathname: string;
    query: NodeJS.Dict<string | string[]>;
    searchParams: URLSearchParams;
}
export declare namespace UIRouter {
    const UIRouterProvider: ({ children, pathname, push, query, replace, }: PropsWithChildren<UIRouterProviderProps>) => import("react/jsx-runtime").JSX.Element;
    const useUIRouter: () => UIRouterContextValue;
}
export {};
