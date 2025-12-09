interface Prop<T> {
    value: T;
}
type ConfigSchema = Record<string, any>;
type ConfigVariants<T extends ConfigSchema> = {
    [Variant in keyof T]?: T[Variant] | null | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
    [Variant in keyof T]?: T[Variant] | T[Variant][] | undefined;
};
interface Config<T, R> {
    default?: R;
    compoundVariants?: (T extends ConfigSchema ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & Prop<R> : Prop<R>)[];
    defaultVariants?: Partial<T>;
}
type Props<T> = T extends ConfigSchema ? ConfigVariants<T> : never;
export type CompoundMapper<ReturnType, Variants extends ConfigSchema> = (props: Props<Variants>) => NonNullable<ReturnType> | undefined;
export declare const compoundMapper: <ReturnType, Variants extends ConfigSchema>(config: Config<Variants, NonNullable<ReturnType>>) => (props: Props<Variants>) => NonNullable<ReturnType> | undefined;
export {};
