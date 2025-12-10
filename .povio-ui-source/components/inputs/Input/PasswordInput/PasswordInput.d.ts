import { FieldValues } from 'react-hook-form';
import { TextInputProps } from '../TextInput/TextInput';
import { ControlProps } from '../../shared/form.types';
export interface PasswordInputProps extends Omit<TextInputProps, "type" | "action" | "trailingIcon" | "unit"> {
}
export type ControlledPasswordInputProps<TFieldValues extends FieldValues> = ControlProps<PasswordInputProps, TFieldValues>;
export declare const PasswordInput: <TFieldValues extends FieldValues>(props: ControlledPasswordInputProps<TFieldValues>) => import("react/jsx-runtime").JSX.Element;
