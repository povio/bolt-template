import { jsxs, jsx } from "react/jsx-runtime";
import React, { useState, useRef } from "react";
import { useHover } from "react-aria";
import { MenuTrigger } from "react-aria-components";
import { MenuPopover } from "./MenuPopover.js";
const CLOSE_DELAY = 100;
const MenuDesktop = ({ trigger, items, closeDelay = CLOSE_DELAY, triggerOnHover = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const isHoveringTrigger = useRef(false);
  const openMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };
  const closeMenu = () => {
    if (isHoveringTrigger.current) {
      return;
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = null;
    }, closeDelay);
  };
  const { hoverProps } = useHover({
    isDisabled: !triggerOnHover,
    onHoverChange: (isHovering) => {
      if (isHovering) {
        isHoveringTrigger.current = true;
        openMenu();
      } else {
        isHoveringTrigger.current = false;
        closeMenu();
      }
    }
  });
  let triggerComponent = trigger;
  if (triggerOnHover) {
    triggerComponent = React.cloneElement(trigger, hoverProps);
  }
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      isOpen: triggerOnHover ? isOpen : void 0,
      onOpenChange: setIsOpen,
      children: [
        triggerComponent,
        /* @__PURE__ */ jsx(
          MenuPopover,
          {
            offset: 0,
            className: "pt-2",
            items,
            isOpen: triggerOnHover ? isOpen : void 0,
            isNonModal: triggerOnHover,
            onMouseEnter: triggerOnHover ? openMenu : void 0,
            onMouseLeave: triggerOnHover ? closeMenu : void 0
          }
        )
      ]
    }
  );
};
export {
  MenuDesktop
};
