import { jsxs, jsx } from "react/jsx-runtime";
import { createContext, useState, useCallback, useMemo, use } from "react";
import { useTranslation } from "react-i18next";
import { ActionModal } from "../components/overlays/ActionModal/ActionModal.js";
import { ns } from "./i18n.js";
var Confirmation;
((Confirmation2) => {
  const DEFAULT_STATE = {
    heading: "",
    description: "",
    isOpen: false,
    primaryAction: {
      label: "",
      onPress: () => {
      }
    },
    secondaryAction: {
      label: "",
      onPress: () => {
      }
    }
  };
  const Context = createContext(null);
  Confirmation2.Provider = ({ children }) => {
    const [state, setState] = useState(DEFAULT_STATE);
    const { t } = useTranslation(ns);
    const onCancel = () => setState(DEFAULT_STATE);
    const confirm = useCallback(
      async ({
        heading,
        description,
        buttonSize,
        textAlign,
        modalClassName,
        cancelLabel = t(($) => $.ui.confirmation.cancel),
        confirmLabel = t(($) => $.ui.confirmation.confirm),
        confirmVariant,
        confirmColor,
        cancelVariant,
        cancelColor
      }) => {
        return new Promise((resolve) => {
          setState({
            heading,
            description,
            buttonSize,
            textAlign,
            modalClassName,
            primaryAction: {
              label: confirmLabel,
              onPress() {
                setState({
                  ...state,
                  isOpen: false,
                  heading: "",
                  description: ""
                });
                resolve(true);
              },
              variant: confirmVariant,
              color: confirmColor
            },
            secondaryAction: {
              label: cancelLabel,
              onPress() {
                onCancel();
                resolve(false);
              },
              variant: cancelVariant,
              color: cancelColor
            },
            isOpen: !state.isOpen
          });
        });
      },
      [state, t]
    );
    const value = useMemo(
      () => ({
        confirm
      }),
      [confirm]
    );
    return /* @__PURE__ */ jsxs(Context.Provider, { value, children: [
      /* @__PURE__ */ jsx(
        ActionModal,
        {
          ...state,
          onClose: state.secondaryAction?.onPress ?? onCancel,
          primaryAction: state.primaryAction,
          secondaryAction: state.secondaryAction
        }
      ),
      children
    ] });
  };
  Confirmation2.useConfirmation = () => {
    const context = use(Context);
    if (!context) {
      throw new Error("Confirmation.useConfirmation must be used within a Confirmation.Provider");
    }
    return context;
  };
})(Confirmation || (Confirmation = {}));
export {
  Confirmation
};
