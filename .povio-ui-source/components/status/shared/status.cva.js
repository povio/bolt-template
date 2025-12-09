import { cva } from "class-variance-authority";
const statusIcon = cva("size-6 shrink-0", {
  variants: {
    variant: {
      outlined: "",
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
      class: "text-text-default-2"
    },
    {
      variant: "outlined",
      color: "success",
      class: "text-text-success-1"
    },
    {
      variant: "outlined",
      color: "warning",
      class: "text-text-warning-1"
    },
    {
      variant: "outlined",
      color: "error",
      class: "text-text-error-1"
    }
  ],
  defaultVariants: {
    variant: "outlined",
    color: "neutral"
  }
});
const statusSeparator = cva("h-px shrink-0 self-stretch md:h-auto md:w-px", {
  variants: {
    variant: {
      outlined: "",
      contained: "hidden"
    },
    color: {
      neutral: "bg-elevation-outline-default-1",
      success: "bg-elevation-outline-success-1",
      warning: "bg-elevation-outline-warning-1",
      error: "bg-elevation-outline-error-1"
    }
  },
  defaultVariants: {
    color: "neutral"
  }
});
export {
  statusIcon,
  statusSeparator
};
