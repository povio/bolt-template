import { JSONContent } from '@tiptap/react';
import { Ref } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '../FormField/FormField';
import { ControlProps } from '../shared/form.types';
export interface TextEditorValue {
    html?: string | null;
    json?: JSONContent | null;
}
export interface TextEditorBaseProps extends FormFieldProps {
    ref?: Ref<HTMLDivElement>;
    placeholder?: string;
    value?: TextEditorValue | null;
    onChange?: (value: TextEditorValue | null) => void;
    onBlur?: () => void;
    as?: "default" | "filter" | "floating" | "inline" | null;
}
export type TextEditorProps = TextEditorBaseProps;
export type ControlledTextEditorProps<TFieldValues extends FieldValues> = ControlProps<TextEditorProps, TFieldValues>;
export declare const TextEditor: <TFieldValues extends FieldValues>(props: ControlledTextEditorProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
