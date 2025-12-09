import { ButtonVariantProps } from '../../buttons/Button/button.cva';
import { ModalProps } from '../Modal/Modal';
interface ActionModalAction {
    label: string;
    onPress: () => void;
    className?: string;
    variant?: ButtonVariantProps["variant"];
    color?: ButtonVariantProps["color"];
}
export interface ActionModalProps extends ModalProps {
    heading: string;
    description: string;
    primaryAction: ActionModalAction;
    secondaryAction?: ActionModalAction;
    buttonSize?: ButtonVariantProps["size"];
    textAlign?: "left" | "center" | "right";
}
export declare const ActionModal: ({ heading, description, primaryAction, secondaryAction, buttonSize, textAlign, modalClassName, ...modalProps }: ActionModalProps) => import("react/jsx-runtime").JSX.Element;
export {};
