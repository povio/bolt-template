import { cva } from "class-variance-authority";
const modalContent = cva(
  [
    "relative flex flex-col items-center gap-modal-gap-content px-modal-side-mobile py-modal-height-mobile md:px-modal-side-desktop md:py-modal-height-desktop",
    "w-fit max-w-full [&>*]:max-w-full",
    "border-elevation-outline-default-1 bg-elevation-fill-default-1 outline-none",
    "pointer-events-auto"
  ],
  {
    variants: {
      aside: {
        left: "h-screen rounded-none border-r",
        right: "h-screen rounded-none border-l",
        center: "rounded-modal-rounding-default border"
      }
    },
    defaultVariants: {
      aside: "center"
    }
  }
);
const modalOverlay = cva(
  ["fixed inset-0 z-10 flex h-(--visual-viewport-height) w-screen overflow-y-auto bg-elevation-fill-default-3/80"],
  {
    variants: {
      aside: {
        left: "p-0",
        right: "p-0",
        center: "p-4"
      }
    },
    defaultVariants: {
      aside: "center"
    }
  }
);
const modalMain = cva(["pointer-events-none my-auto flex w-full"], {
  variants: {
    aside: {
      left: "entering:animate-drawer-enter-left exiting:animate-drawer-exit-left justify-start",
      right: "entering:animate-drawer-enter-right exiting:animate-drawer-exit-right justify-end",
      center: "justify-center"
    }
  },
  defaultVariants: {
    aside: "center"
  }
});
export {
  modalContent,
  modalMain,
  modalOverlay
};
