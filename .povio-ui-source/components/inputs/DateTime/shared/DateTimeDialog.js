import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Popover, Dialog } from "react-aria-components";
import { FormFieldHeader } from "../../FormField/FormFieldHeader.js";
import { FormFieldHeaderClose } from "../../FormField/FormFieldHeaderClose.js";
import { BottomSheet } from "../../../overlays/BottomSheet/BottomSheet.js";
import { useBreakpoint } from "../../../../hooks/useBreakpoint.js";
const DateTimeDialog = ({
  hideSidebar,
  children,
  footer,
  sidebar,
  label,
  isOpen,
  triggerRef,
  dialogProps,
  onOpenChange
}) => {
  const isDesktop = useBreakpoint("md");
  if (isDesktop) {
    if (!isOpen) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      Popover,
      {
        triggerRef,
        isOpen,
        placement: "bottom start",
        onOpenChange,
        children: /* @__PURE__ */ jsx(
          Dialog,
          {
            ...dialogProps,
            className: "!outline-none",
            "aria-label": label,
            children: /* @__PURE__ */ jsxs("div", { className: "flex overflow-hidden rounded-input-rounding-default border border-elevation-outline-default-1 border-solid bg-elevation-fill-default-1 shadow-5", children: [
              !hideSidebar && sidebar,
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-between", children: [
                children,
                footer
              ] })
            ] })
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    BottomSheet,
    {
      label,
      footer,
      isOpen,
      onOpenChange,
      sheetMarginBottom: 0,
      isScrollable: false,
      height: "auto",
      isDismissable: true,
      children: (close) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          FormFieldHeader,
          {
            label,
            className: "!mb-8 shrink-0 px-4 pt-3",
            rightContent: /* @__PURE__ */ jsx(FormFieldHeaderClose, { onClose: close })
          }
        ),
        children,
        !hideSidebar && sidebar
      ] })
    }
  );
};
export {
  DateTimeDialog
};
