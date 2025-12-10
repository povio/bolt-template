export declare namespace ObjectUtils {
    const isNil: (obj: unknown) => obj is null | undefined;
    const isFunction: (obj: unknown) => obj is Function;
    const isObject: (obj: unknown) => obj is object;
    const isString: (obj: unknown) => obj is string;
    const isDate: (obj: unknown) => obj is Date;
    const isRegExp: (obj: unknown) => obj is RegExp;
    const isEmpty: (obj: unknown) => boolean;
    const deepConditionalMerge: <T extends object>(target: Partial<T>, source: Partial<T>, condition: (value: unknown, key: string) => boolean) => T;
}
