import { AbilityTuple, PureAbility } from '@casl/ability';
import { BoundCanProps } from '@casl/react';
import { AppAbilities } from './appAbility.types';
type CanAbility = PureAbility<AbilityTuple<AppAbilities[0], AppAbilities[1]>>;
type CanProps<TAppAbilities extends AppAbilities = AppAbilities> = {
    use: TAppAbilities;
} & Omit<BoundCanProps<CanAbility>, "do" | "I" | "on" | "a" | "an" | "this">;
export declare const Can: <TAppAbilities extends AppAbilities = AppAbilities>({ use, ...props }: CanProps<TAppAbilities>) => import("react/jsx-runtime").JSX.Element;
export {};
