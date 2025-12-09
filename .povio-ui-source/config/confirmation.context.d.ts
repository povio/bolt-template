import { PropsWithChildren } from 'react';
import { ActionModalProps } from '../components/overlays/ActionModal/ActionModal';
export declare namespace Confirmation {
    type ContextState = Pick<ActionModalProps, "heading" | "description" | "buttonSize" | "textAlign" | "primaryAction" | "secondaryAction" | "modalClassName"> & {
        isOpen: boolean;
    };
    type ConfirmationInput = Pick<ContextState, "heading" | "description" | "buttonSize" | "textAlign" | "modalClassName"> & {
        cancelLabel?: NonNullable<ContextState["secondaryAction"]>["label"];
        confirmLabel?: NonNullable<ContextState["primaryAction"]>["label"];
        cancelVariant?: NonNullable<ContextState["secondaryAction"]>["variant"];
        cancelColor?: NonNullable<ContextState["secondaryAction"]>["color"];
        confirmVariant?: NonNullable<ContextState["primaryAction"]>["variant"];
        confirmColor?: NonNullable<ContextState["primaryAction"]>["color"];
    };
    interface Options {
        confirm: (input: ConfirmationInput) => Promise<boolean>;
    }
    const Provider: ({ children }: PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
    const useConfirmation: () => Options;
}
