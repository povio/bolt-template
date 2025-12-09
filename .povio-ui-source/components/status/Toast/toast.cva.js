import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { compoundMapper } from "../../../utils/compoundMapper.js";
const toastContainer = cva("m-toast-gap-margin-mobile w-auto p-0 md:m-toast-gap-margin-desktop", {
  variants: {
    position: {
      "bottom-right": "right-0 bottom-0",
      "bottom-left": "bottom-0 left-0",
      "top-right": "top-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-center": "bottom-0",
      "top-center": "top-0"
    }
  }
});
const toastWrapper = clsx("m-0! min-h-0 w-auto! max-w-toast bg-transparent! p-0! shadow-none!");
const toast = cva(
  "inline-flex w-auto flex-col items-center overflow-hidden rounded-toast-rounding-default shadow-4 md:flex-row",
  {
    variants: {
      variant: {
        outlined: "border bg-elevation-fill-default-1 text-text-default-1",
        contained: "text-text-inverted-1"
      },
      color: {
        neutral: "",
        success: "",
        warning: "",
        error: ""
      },
      position: {
        "bottom-right": "",
        "bottom-left": "",
        "bottom-center": "",
        "top-right": "",
        "top-left": "",
        "top-center": ""
      }
    },
    compoundVariants: [
      {
        position: ["bottom-right", "bottom-left", "bottom-center"],
        className: "mt-toast-gap-margin-mobile md:mt-toast-gap-margin-desktop"
      },
      {
        position: ["top-right", "top-left", "top-center"],
        className: "mb-toast-gap-margin-mobile md:mb-toast-gap-margin-desktop"
      },
      {
        variant: "outlined",
        color: "neutral",
        className: "border-elevation-outline-default-1"
      },
      {
        variant: "outlined",
        color: "success",
        className: "border-elevation-outline-success-1"
      },
      {
        variant: "outlined",
        color: "warning",
        className: "border-elevation-outline-warning-1"
      },
      {
        variant: "outlined",
        color: "error",
        className: "border-elevation-outline-error-1"
      },
      {
        variant: "contained",
        color: "neutral",
        className: "bg-elevation-fill-inverted-1"
      },
      {
        variant: "contained",
        color: "success",
        className: "bg-elevation-fill-success-1"
      },
      {
        variant: "contained",
        color: "warning",
        className: "bg-elevation-fill-warning-1"
      },
      {
        variant: "contained",
        color: "error",
        className: "bg-elevation-fill-error-1"
      }
    ],
    defaultVariants: {
      variant: "outlined",
      color: "neutral"
    }
  }
);
const buttonColorVariant = compoundMapper({
  compoundVariants: [
    {
      variant: "outlined",
      color: "neutral",
      value: { color: "secondary" }
    },
    {
      variant: "outlined",
      color: "success",
      value: { color: "success" }
    },
    {
      variant: "outlined",
      color: "warning",
      value: { color: "warning" }
    },
    {
      variant: "outlined",
      color: "error",
      value: { color: "error" }
    },
    {
      variant: "contained",
      color: "neutral",
      value: { color: "primary", inverted: true }
    },
    {
      variant: "contained",
      color: "success",
      value: { color: "success", inverted: true }
    },
    {
      variant: "contained",
      color: "warning",
      value: { color: "warning", inverted: true }
    },
    {
      variant: "contained",
      color: "error",
      value: { color: "error", inverted: true }
    }
  ],
  defaultVariants: {
    variant: "outlined",
    color: "neutral"
  },
  default: { color: "secondary" }
});
export {
  buttonColorVariant,
  toast,
  toastContainer,
  toastWrapper
};
