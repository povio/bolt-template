import { z } from 'zod';
export declare namespace ZodUtils {
    type UnwrapZod<T> = T extends z.ZodOptional<infer U> ? UnwrapZod<U> : T extends z.ZodNullable<infer U> ? UnwrapZod<U> : T;
    type IsZodType<T, Z> = UnwrapZod<T> extends Z ? true : false;
    type IsZodNumber<T> = IsZodType<T, z.ZodNumber>;
    type IsZodEnum<T> = IsZodType<T, z.ZodEnum<any>>;
    type IsZodUUID<T> = IsZodType<T, z.ZodUUID>;
    type IsZodDateTime<T> = IsZodType<T, z.ZodISODateTime>;
    type IsZodString<T> = IsZodType<T, z.ZodString>;
    type IsZodEmail<T> = IsZodType<T, z.ZodEmail>;
    type IsZodDateRange<T> = UnwrapZod<T> extends z.ZodObject ? UnwrapZod<UnwrapZod<T>["shape"]["start"]> extends z.ZodISODateTime ? UnwrapZod<UnwrapZod<T>["shape"]["end"]> extends z.ZodISODateTime ? true : false : false : false;
    type IsZodObject<T> = IsZodType<T, z.ZodObject<any>>;
    type IsZodArray<T> = IsZodType<T, z.ZodArray<any>>;
    type ZodType<T> = IsZodType<T, z.ZodBoolean> extends true ? "boolean" : IsZodNumber<T> extends true ? "number" : IsZodEnum<T> extends true ? "enum" : IsZodDateTime<T> extends true ? "datetime" : IsZodUUID<T> extends true ? "uuid" : IsZodString<T> extends true ? "string" : IsZodEmail<T> extends true ? "email" : IsZodDateRange<T> extends true ? "dateRange" : IsZodObject<T> extends true ? "object" : IsZodArray<T> extends true ? "array" : never;
    type ZodTypeSwitch<TZodType extends z.ZodType, T extends Record<ZodType<TZodType> | "unknown", unknown>> = ZodType<TZodType> extends never ? never : T[ZodType<TZodType>];
    const unwrapZodType: (schemaType: z.core.$ZodType) => z.core.$ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>;
    const isDateRange: (schemaType: z.core.$ZodType) => boolean;
}
