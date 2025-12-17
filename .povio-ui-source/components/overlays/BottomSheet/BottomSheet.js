import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useViewportSize, useResizeObserver } from "@react-aria/utils";
import { clsx } from "clsx";
import { useState, useEffect, useMemo, useRef } from "react";
import { DialogTrigger, Dialog, ModalOverlay, Modal } from "react-aria-components";
import { DomUtils } from "../../../utils/dom.utils.js";
import { useMotionValue, animate, AnimatePresence, motion } from "framer-motion";
const MotionModal = motion.create(Modal);
const MotionModalOverlay = motion.create(ModalOverlay);
const inertiaTransition = {
  type: "inertia",
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300
};
const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1]
};
const BottomSheetBase = ({
  isOpen,
  onOpenChange,
  onStateChange,
  isDismissable = false,
  isScrollable = true,
  height = "full",
  label,
  portalContainerRef,
  children,
  footer,
  sheetMarginTop = 96,
  sheetMarginBottom = 128
}) => {
  const viewport = useViewportSize();
  const { sheetHeight, windowHeight } = useMemo(() => {
    const sh = viewport.height - sheetMarginTop;
    const wh = Math.max(window.innerHeight, viewport.height) - sheetMarginTop;
    return { sheetHeight: sh, windowHeight: wh };
  }, [viewport.height, sheetMarginTop]);
  const y = useMotionValue(sheetHeight);
  const closeVelocityRef = useRef(true);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const dialogRef = useRef(null);
  const footerRef = useRef(null);
  const focusTrapRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);
  useResizeObserver({
    ref: footerRef,
    onResize: () => {
      setFooterHeight(footerRef.current?.offsetHeight || 0);
    }
  });
  const oldHeightRef = useRef(0);
  useResizeObserver({
    ref: dialogRef,
    onResize: () => {
      const rect = dialogRef.current?.getBoundingClientRect();
      if (!rect || oldHeightRef.current === rect.height) {
        return;
      }
      oldHeightRef.current = rect.height;
      if (rect.bottom < viewport.height) {
        y.stop();
        animate(y, -(rect.height - viewport.height + sheetMarginTop));
      }
    }
  });
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
    MotionModalOverlay,
    {
      isOpen: true,
      UNSTABLE_portalContainer: portalContainerRef?.current,
      className: "fixed top-0 left-0 z-10 w-screen",
      onOpenChange,
      isDismissable,
      style: { height: viewport.height },
      ref: overlayRef,
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "pointer-events-none absolute inset-0 bg-support-overlay",
            animate: { opacity: 1 },
            initial: { opacity: 0 },
            exit: { opacity: 0 }
          }
        ),
        /* @__PURE__ */ jsx(
          MotionModal,
          {
            isDismissable: true,
            className: clsx(
              "pointer-events-none flex w-full flex-col items-stretch justify-end outline-none will-change-transform",
              isScrollable ? "h-auto" : "h-full"
            ),
            animate: { y: 0, opacity: 1 },
            initial: { y: windowHeight, opacity: 1 },
            exit: { y: windowHeight, opacity: 1 },
            onAnimationComplete: (data) => {
              onStateChange?.(data.y === 0 ? "opened" : "closed");
            },
            onAnimationStart: (data) => {
              onStateChange?.(data.y === 0 ? "opening" : "closing");
            },
            transition: staticTransition,
            style: { y, minHeight: "100%" },
            drag: "y",
            dragElastic: 1,
            dragConstraints: overlayRef,
            onUpdate: (latest) => {
              if (!latest || !footerRef.current) {
                return;
              }
              footerRef.current?.style.setProperty("--scroll-position", `${(latest.y || 0).toFixed(0)}px`);
            },
            onDragStart: () => {
              if (document.activeElement && DomUtils.isKeyboardInput(document.activeElement)) {
                focusTrapRef.current?.focus();
              }
              y.animation?.stop();
              closeVelocityRef.current = isScrollable ? y.get() >= -10 : true;
              containerRef.current?.style.setProperty("pointer-events", "none");
            },
            onDragEnd: (e, { velocity }) => {
              containerRef.current?.style.removeProperty("pointer-events");
              if (y.get() > 0) {
                if (closeVelocityRef.current && velocity.y > 10 || y.get() > 200) {
                  onOpenChange?.(false);
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }
            },
            children: /* @__PURE__ */ jsx(
              Dialog,
              {
                className: "relative flex min-h-0 flex-1 flex-col items-stretch outline-none",
                ref: dialogRef,
                "aria-label": label,
                children: ({ close }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: { minHeight: `${sheetMarginTop}px` },
                      className: clsx("shrink-0", height === "auto" && "grow")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: clsx(
                        "pointer-events-auto relative flex min-h-0 flex-col items-stretch rounded-t-xl bg-elevation-fill-default-1",
                        height === "full" && "flex-1"
                      ),
                      children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: clsx(
                              "absolute bottom-full left-0 w-full outline-none",
                              isDismissable ? "h-0" : "h-screen"
                            ),
                            ref: focusTrapRef,
                            tabIndex: -1
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: clsx("flex min-h-0 grow flex-col items-stretch", isScrollable ? "shrink-0" : "shrink"),
                            ref: containerRef,
                            children: typeof children === "function" ? children(close) : children
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "shrink-0",
                            style: { height: `${footerHeight + sheetMarginBottom}px` }
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-full h-screen w-full bg-elevation-fill-default-1" })
                      ]
                    }
                  ),
                  footer && /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      ref: footerRef,
                      className: clsx(
                        "pointer-events-auto absolute z-50 w-full bg-elevation-fill-default-2",
                        "top-(--visual-viewport-height) left-0 translate-y-[calc(-100%-var(--scroll-position,0px))]"
                      ),
                      children: footer
                    }
                  )
                ] })
              }
            )
          }
        )
      ]
    }
  ) });
};
const BottomSheet = ({
  isOpen,
  portalContainerRef,
  onOpenChange,
  trigger,
  children,
  ...rest
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(!!isOpen);
  const hasTrigger = !!trigger;
  useEffect(() => {
    if (hasTrigger) {
      setIsSheetOpen(!!isOpen);
    }
  }, [isOpen, hasTrigger]);
  if (trigger) {
    const handleOpenChange = (open) => {
      setIsSheetOpen(open);
      onOpenChange?.(open);
    };
    return /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        isOpen: isSheetOpen,
        onOpenChange: handleOpenChange,
        children: [
          trigger,
          /* @__PURE__ */ jsx(
            BottomSheetBase,
            {
              isOpen: isSheetOpen,
              onOpenChange: handleOpenChange,
              portalContainerRef,
              ...rest,
              children
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx(
    BottomSheetBase,
    {
      isOpen,
      onOpenChange,
      portalContainerRef,
      ...rest,
      children
    }
  );
};
export {
  BottomSheet
};
