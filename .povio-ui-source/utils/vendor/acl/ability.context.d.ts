import { PureAbility, RawRuleOf } from '@casl/ability';
import { PackRule } from '@casl/ability/extra';
import { PropsWithChildren } from 'react';
import { AppAbilities, AppAbility } from './appAbility.types';
export declare namespace AbilityContext {
    export const Consumer: import("react").Consumer<AppAbility>;
    interface ProviderProps {
        user?: {
            aclRules?: PackRule<RawRuleOf<AppAbility>>[];
        } | null;
    }
    export const Provider: ({ children }: PropsWithChildren<ProviderProps>) => import("react/jsx-runtime").JSX.Element;
    export const useAbility: <TAppAbilities extends AppAbilities = AppAbilities>() => PureAbility<TAppAbilities>;
    export {};
}
