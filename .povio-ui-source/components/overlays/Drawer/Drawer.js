import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { DialogTrigger, ModalOverlay, Modal, Dialog } from "react-aria-components";
import { modalOverlay } from "../Modal/modal.cva.js";
const Drawer = ({
  isOpen,
  portalContainerRef,
  onOpenChange,
  trigger,
  children,
  isDismissable,
  overlayClassName,
  dialogClassName,
  className
}) => {
  if (trigger) {
    return /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        isOpen,
        onOpenChange,
        children: [
          trigger,
          /* @__PURE__ */ jsx(
            DrawerOverlay,
            {
              portalContainerRef,
              isDismissable,
              overlayClassName,
              dialogClassName,
              className,
              children
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx(
    DrawerOverlay,
    {
      isOpen,
      onOpenChange,
      portalContainerRef,
      isDismissable,
      className,
      children
    }
  );
};
const DrawerOverlay = ({
  isOpen,
  onOpenChange,
  portalContainerRef,
  children,
  isDismissable,
  overlayClassName,
  dialogClassName,
  className
}) => {
  return /* @__PURE__ */ jsx(
    ModalOverlay,
    {
      isOpen,
      onOpenChange,
      UNSTABLE_portalContainer: portalContainerRef?.current,
      className: clsx(modalOverlay(), overlayClassName),
      isDismissable,
      children: /* @__PURE__ */ jsx(
        Modal,
        {
          className: clsx(
            "fixed inset-y-0 right-0 z-10 w-fit entering:animate-drawer-enter-right exiting:animate-drawer-exit-right bg-elevation-fill-default-1",
            className
          ),
          children: /* @__PURE__ */ jsx(Dialog, { className: clsx("outline-none", dialogClassName), children: ({ close }) => children(close) })
        }
      )
    }
  );
};
export {
  Drawer
};
