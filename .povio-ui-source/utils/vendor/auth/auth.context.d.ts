import { PropsWithChildren, ReactNode } from 'react';
export declare namespace AuthContext {
    export interface Routes {
        authenticated?: string;
        unauthenticated?: string;
    }
    interface Type<TUser = unknown> {
        isAuthenticated: boolean;
        isInitializing: boolean;
        logout: () => void;
        updateTokens?: (accessToken: string | null, refreshToken?: string | null) => void;
        accessToken?: string | null;
        user?: TUser | null;
        userPromise?: () => Promise<TUser | null>;
        routes?: Routes;
        loadingState?: ReactNode;
    }
    type ProviderProps<TUser = unknown> = Type<TUser>;
    export const Provider: <TUser = unknown>({ isAuthenticated, isInitializing, logout, updateTokens, accessToken, user, userPromise, routes, loadingState, children, }: PropsWithChildren<ProviderProps<TUser>>) => import("react/jsx-runtime").JSX.Element;
    export const useAuth: <TUser = unknown>() => Type<TUser>;
    export {};
}
