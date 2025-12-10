import { FC, ReactElement, Ref, SVGProps } from 'react';
import { Key, ToggleButtonGroupProps, ToggleButtonProps } from 'react-aria-components';
import { FieldValues } from 'react-hook-form';
import { ControlProps } from '../inputs/shared/form.types';
export interface SegmentItem<TKey extends Key = Key> extends ToggleButtonProps {
    id: TKey;
    label?: string;
    icon?: FC<SVGProps<SVGSVGElement>> | ReactElement;
}
export interface SingleSegmentProps<TKey extends Key = Key> {
    selectionMode?: "single";
    value?: TKey | undefined | null;
    onChange?: (value: TKey | null) => void;
    defaultValue?: TKey | null;
}
export interface MultiSegmentProps<TKey extends Key = Key> {
    selectionMode: "multiple";
    value?: TKey[];
    onChange?: (value: TKey[]) => void;
    defaultValue?: TKey[] | null;
}
export type GroupedSegmentProps<TKey extends Key = Key> = MultiSegmentProps<TKey> | SingleSegmentProps<TKey>;
export type GroupedSegmentControlProps<TFieldValues extends FieldValues, TKey extends Key = Key> = ({
    selectionMode: MultiSegmentProps["selectionMode"];
} & ControlProps<MultiSegmentProps<TKey>, TFieldValues>) | ({
    selectionMode?: SingleSegmentProps["selectionMode"];
} & ControlProps<SingleSegmentProps<TKey>, TFieldValues>);
export type SegmentProps<TKey extends Key = Key> = Omit<ToggleButtonGroupProps, "children" | "onSelectionChange" | "selectedKeys" | "defaultSelectedKeys"> & {
    ref?: Ref<HTMLElement>;
    items: SegmentItem<TKey>[];
    className?: string;
    error?: string;
} & GroupedSegmentProps<TKey>;
export type ControlledSegmentProps<TFieldValues extends FieldValues, TKey extends Key = Key> = SegmentProps<TKey> & GroupedSegmentControlProps<TFieldValues, TKey>;
