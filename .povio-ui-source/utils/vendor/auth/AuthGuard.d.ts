import { PropsWithChildren } from 'react';
export interface AuthGuardProps {
    type: "public-only" | "private";
    redirectTo?: string;
}
export declare const AuthGuard: ({ type, redirectTo, children }: PropsWithChildren<AuthGuardProps>) => import('react').ReactNode;
