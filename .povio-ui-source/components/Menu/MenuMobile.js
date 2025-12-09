import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useRef, useState } from "react";
import { Button, Menu } from "react-aria-components";
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeft.js";
import { menuItemClass, MenuItem } from "./MenuItem.js";
import { BottomSheet } from "../overlays/BottomSheet/BottomSheet.js";
const MenuMobile = ({ trigger, items }) => {
  const activeItemRef = useRef(null);
  const activeItemParentsRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const onAction = (item) => {
    if (!item.children) {
      activeItemRef.current = null;
      activeItemParentsRef.current = [];
      setActiveItem(null);
      setIsOpen(false);
      return;
    }
    if (activeItemRef.current) {
      activeItemParentsRef.current.push(activeItemRef.current);
    }
    activeItemRef.current = item;
    setActiveItem(activeItemRef.current);
  };
  const onClose = () => {
    if (activeItemRef.current) {
      return;
    }
    setIsOpen(false);
  };
  const onBack = () => {
    activeItemRef.current = activeItemParentsRef.current.pop() ?? null;
    setActiveItem(activeItemRef.current);
  };
  return /* @__PURE__ */ jsx(
    BottomSheet,
    {
      isOpen,
      onOpenChange: setIsOpen,
      trigger,
      isDismissable: true,
      children: () => /* @__PURE__ */ jsxs(Fragment, { children: [
        activeItem && /* @__PURE__ */ jsxs(
          Button,
          {
            className: clsx(menuItemClass, "!justify-start w-full font-labels-default"),
            onPress: onBack,
            children: [
              /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "size-6" }),
              activeItem.label
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Menu,
          {
            autoFocus: true,
            onClose,
            className: "outline-none",
            children: (activeItem?.children ?? items).map((item, index) => /* @__PURE__ */ jsx(
              MenuItem,
              {
                ...item,
                onAction: () => onAction(item)
              },
              index
            ))
          }
        )
      ] })
    }
  );
};
export {
  MenuMobile
};
