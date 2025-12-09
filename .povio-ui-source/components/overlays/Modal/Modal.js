import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { ModalOverlay, Modal as Modal$1, Dialog } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../../assets/icons/Close.js";
import { InlineIconButton } from "../../buttons/InlineIconButton/InlineIconButton.js";
import { modalOverlay, modalMain, modalContent } from "./modal.cva.js";
import { ns } from "../../../config/i18n.js";
const Modal = ({
  isOpen,
  portalContainerRef,
  onClose,
  aside,
  children,
  modalClassName,
  closeIconClassName,
  showCloseIcon,
  isDismissable = true
}) => {
  const { t } = useTranslation(ns);
  return /* @__PURE__ */ jsx(
    ModalOverlay,
    {
      UNSTABLE_portalContainer: portalContainerRef?.current,
      className: modalOverlay({ aside }),
      isDismissable,
      isOpen,
      shouldCloseOnInteractOutside: () => {
        return !portalContainerRef?.current;
      },
      onOpenChange: (open) => {
        if (!open) {
          onClose();
        }
      },
      children: /* @__PURE__ */ jsx(Modal$1, { className: modalMain({ aside }), children: /* @__PURE__ */ jsxs(Dialog, { className: modalContent({ aside, className: modalClassName }), children: [
        showCloseIcon && /* @__PURE__ */ jsx(
          InlineIconButton,
          {
            color: "secondary",
            onPress: onClose,
            icon: CloseIcon,
            className: clsx(
              "absolute top-0 right-0 p-modal-gap-desktop-modal-close-icon-top-right",
              closeIconClassName
            ),
            label: t(($) => $.ui.modal.closeBtn)
          }
        ),
        children
      ] }) })
    }
  );
};
export {
  Modal
};
