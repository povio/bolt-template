import { ClassProp } from 'class-variance-authority/types';
import { PropsWithChildren } from 'react';
import { ButtonVariantProps } from '../components/buttons/Button/button.cva';
import { PillButtonVariants } from '../components/buttons/PillButton/pillButton.cva';
import { CheckboxVariantProps } from '../components/inputs/Checkbox/checkbox.cva';
import { RadioVariantProps } from '../components/inputs/RadioGroup/radio.cva';
import { InputBaseProps, InputSideProps, InputSizeProps } from '../components/inputs/shared/input.cva';
import { LabelBaseProps } from '../components/inputs/shared/label.cva';
import { ToggleVariantProps } from '../components/inputs/Toggle/toggle.cva';
import { TooltipPointerHorizontalVariantProps, TooltipPointerVerticalVariantProps, TooltipTextVariantProps, TooltipVariantProps } from '../components/overlays/Tooltip/tooltip.cva';
import { AlertVariantProps } from '../components/status/Alert/alert.cva';
import { ToastVariantProps } from '../components/status/Toast/toast.cva';
import { TableDataVariantProps, TableHeadDataVariantProps, TableHeadRowVariantProps, TableRowVariantProps } from '../components/table/table.cva';
import { LinkVariantProps } from '../components/text/Link/link.cva';
import { TagVariantProps } from '../components/text/Tag/tag.cva';
import { TypographyVariantProps } from '../components/text/Typography/typography.cva';
import { CompoundMapper } from '../utils/compoundMapper';
export declare namespace UIStyle {
    export type Cva<T> = (props: T & ClassProp) => string;
    interface Options {
        button: {
            cva?: Cva<ButtonVariantProps>;
            sizeCva?: Cva<ButtonVariantProps>;
            contentCva?: Cva<ButtonVariantProps>;
            iconSize?: Cva<Pick<ButtonVariantProps, "size">>;
            typography?: CompoundMapper<TypographyVariantProps, ButtonVariantProps>;
        };
        pillButton: {
            cva?: Cva<PillButtonVariants>;
            typography?: CompoundMapper<TypographyVariantProps, PillButtonVariants>;
        };
        checkbox: {
            cva?: Cva<CheckboxVariantProps>;
            typography?: CompoundMapper<TypographyVariantProps, CheckboxVariantProps>;
        };
        radio: {
            cva?: Cva<RadioVariantProps>;
            typography?: CompoundMapper<TypographyVariantProps, RadioVariantProps>;
        };
        status: {
            iconCva?: Cva<ToastVariantProps>;
            separatorCva?: Cva<ToastVariantProps>;
        };
        toast: {
            cva?: Cva<ToastVariantProps>;
            buttonColor?: CompoundMapper<Pick<ButtonVariantProps, "color" | "inverted">, ToastVariantProps>;
        };
        alert: {
            cva?: Cva<AlertVariantProps>;
        };
        input: {
            baseCva?: Cva<InputBaseProps>;
            sizeCva?: Cva<InputSizeProps>;
            sideCva?: Cva<InputSideProps>;
        };
        label: {
            cva?: Cva<LabelBaseProps>;
            typography?: CompoundMapper<TypographyVariantProps, LabelBaseProps>;
        };
        toggle: {
            cva?: Cva<ToggleVariantProps>;
            typography?: CompoundMapper<TypographyVariantProps, ToggleVariantProps>;
        };
        typography: {
            cva?: Cva<TypographyVariantProps>;
        };
        link: {
            cva?: Cva<LinkVariantProps>;
        };
        tag: {
            cva?: Cva<TagVariantProps>;
        };
        table: {
            headRowCva?: Cva<TableHeadRowVariantProps>;
            headDataCva?: Cva<TableHeadDataVariantProps>;
            rowCva?: Cva<TableRowVariantProps>;
            dataCva?: Cva<TableDataVariantProps>;
        };
        tooltip: {
            cva?: Cva<TooltipVariantProps>;
            pointerHorizontalCva?: Cva<TooltipPointerHorizontalVariantProps>;
            pointerVerticalCva?: Cva<TooltipPointerVerticalVariantProps>;
            textCva?: Cva<TooltipTextVariantProps>;
        };
    }
    interface ProviderProps {
        config?: Partial<Options>;
    }
    export const Provider: ({ children, config }: PropsWithChildren<ProviderProps>) => import("react/jsx-runtime").JSX.Element;
    export const useConfig: () => Partial<Options> | null | undefined;
    export {};
}
