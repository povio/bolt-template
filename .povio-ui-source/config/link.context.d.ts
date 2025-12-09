import { ComponentType, PropsWithChildren } from 'react';
import { LinkNavigationProps } from '../components/text/Link/Link';
interface LinkContextValue {
    LinkComponent?: ComponentType<LinkNavigationProps>;
}
export declare namespace LinkContext {
    const LinkContextProvider: ({ children, LinkComponent }: PropsWithChildren<LinkContextValue>) => import("react/jsx-runtime").JSX.Element;
    const useLinkContext: () => LinkContextValue;
}
export {};
