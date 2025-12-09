import { cva } from "class-variance-authority";
const alert = cva("min-h-0 overflow-hidden rounded-alert-rounding-default p-0", {
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
    }
  },
  compoundVariants: [
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
});
export {
  alert
};
