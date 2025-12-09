import { CellContext, ColumnDef, ColumnMeta } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { FieldPath } from 'react-hook-form';
import { z } from 'zod';
type NestedTypeFromKey<T, K extends string> = K extends keyof T ? T[K] : K extends `${infer First}.${infer Rest}` ? First extends keyof T ? NestedTypeFromKey<T[First], Rest> : never : never;
type SchemaType<TSchema extends z.ZodObject<any>> = z.infer<TSchema>;
type SchemaKey<TSchema extends z.ZodObject<any>> = keyof SchemaType<TSchema>;
type NestedSchemaKey<TSchema extends z.ZodObject<any>> = FieldPath<SchemaType<TSchema>>;
type SchemaValue<TSchema extends z.ZodObject<any>> = SchemaType<TSchema>[SchemaKey<TSchema>];
type ColumnMetaType<TSchema extends z.ZodObject<any>> = ColumnMeta<SchemaType<TSchema>, SchemaValue<TSchema>>;
type GetNestedValueType<TSchema extends z.ZodObject<any>, K extends string> = NestedTypeFromKey<SchemaType<TSchema>, K>;
type NestedSchemaKeyOrString<TSchema extends z.ZodObject<any>> = NestedSchemaKey<TSchema> | (string & {});
type DynamicColumnDef<TSchema extends z.ZodObject<any>, TValue = any> = Omit<ColumnDef<SchemaType<TSchema>, TValue>, "accessorKey" | "cell"> & {
    cell?: ((props: CellContext<SchemaType<TSchema>, TValue>) => any) | NestedSchemaKey<TSchema>;
};
type ColumnsConfig<TSchema extends z.ZodObject<any>> = {
    [K in NestedSchemaKey<TSchema>]?: DynamicColumnDef<TSchema, GetNestedValueType<TSchema, K>> | ((props: CellContext<SchemaType<TSchema>, GetNestedValueType<TSchema, K>>) => any) | NestedSchemaKey<TSchema> | boolean;
};
type CustomColumnDef<TSchema extends z.ZodObject<any>> = Omit<ColumnDef<SchemaType<TSchema>, any>, "accessorKey" | "cell"> & {
    accessorKey?: NestedSchemaKeyOrString<TSchema>;
    cell?: ((props: CellContext<SchemaType<TSchema>, any>) => any) | NestedSchemaKey<TSchema>;
};
type CustomColumnsConfig<TSchema extends z.ZodObject<any>> = Record<string, CustomColumnDef<TSchema> | ((props: CellContext<SchemaType<TSchema>, undefined>) => any) | NestedSchemaKey<TSchema>>;
export interface DynamicColumnsOptions<TSchema extends z.ZodObject<any>> {
    columns?: ColumnsConfig<TSchema>;
    customColumns?: CustomColumnsConfig<TSchema>;
    order?: NestedSchemaKeyOrString<TSchema>[];
    sortable?: NestedSchemaKeyOrString<TSchema>[] | z.ZodEnum<any>;
    disableFormatting?: NestedSchemaKeyOrString<TSchema>[];
    emptyValue?: ReactNode;
    namespace?: string;
    overridePresetLocales?: boolean;
    globalMeta?: Omit<ColumnMetaType<TSchema>, "sortKey">;
    globalWrapper?: (children: ReactNode) => ReactNode;
    includeAll?: boolean;
}
export declare const sortColumns: <TSchema extends z.ZodObject<any>>(columns: ColumnDef<SchemaType<TSchema>>[], orderKeys?: DynamicColumnsOptions<TSchema>["order"]) => ColumnDef<SchemaType<TSchema>>[];
interface DynamicColumnsParams<TSchema extends z.ZodObject<any>> {
    schema: TSchema;
    preset?: ColumnDef<SchemaType<TSchema>>[];
    options: DynamicColumnsOptions<TSchema>;
}
export declare const dynamicColumns: <TSchema extends z.ZodObject<any>>({ schema, preset, options, }: DynamicColumnsParams<TSchema>) => ColumnDef<SchemaType<TSchema>>[];
export {};
