import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { clsx } from "clsx";
import { DialogTrigger, Popover, Dialog } from "react-aria-components";
import { FormFieldHeader } from "../../inputs/FormField/FormFieldHeader.js";
import { FormFieldHeaderClose } from "../../inputs/FormField/FormFieldHeaderClose.js";
import { BottomSheet } from "../BottomSheet/BottomSheet.js";
import { useBreakpoint } from "../../../hooks/useBreakpoint.js";
const ResponsivePopover = ({
  trigger,
  isOpen,
  onOpenChange,
  children,
  popoverClassName,
  sheetLabel
}) => {
  const isDesktop = useBreakpoint("md");
  if (!isDesktop) {
    return /* @__PURE__ */ jsx(
      BottomSheet,
      {
        isOpen,
        onOpenChange,
        trigger,
        height: "auto",
        isDismissable: true,
        children: (close) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            FormFieldHeader,
            {
              label: sheetLabel,
              rightContent: /* @__PURE__ */ jsx(FormFieldHeaderClose, { onClose: close }),
              className: "px-4 pt-3"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "p-4", children })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      isOpen,
      onOpenChange,
      children: [
        trigger,
        /* @__PURE__ */ jsx(
          Popover,
          {
            className: clsx("my-4 outline-none", popoverClassName),
            offset: 0,
            placement: "bottom start",
            children: /* @__PURE__ */ jsx(Dialog, { className: "outline-none", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "overflow-hidden p-2 shadow-5 outline-none",
                  "rounded-s border border-elevation-outline-default-1 bg-elevation-fill-default-1"
                ),
                children
              }
            ) })
          }
        )
      ]
    }
  );
};
export {
  ResponsivePopover
};
