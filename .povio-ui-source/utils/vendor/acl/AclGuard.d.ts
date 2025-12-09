import { PropsWithChildren } from 'react';
import { AppAbilities } from './appAbility.types';
interface AclGuardProps<TAppAbilities extends AppAbilities = AppAbilities> {
    canUse: TAppAbilities;
    redirectTo?: string;
}
export declare const createAclGuard: <TAppAbilities extends AppAbilities = AppAbilities>() => ({ canUse, redirectTo, children }: PropsWithChildren<AclGuardProps<TAppAbilities>>) => import('react').ReactNode;
export {};
