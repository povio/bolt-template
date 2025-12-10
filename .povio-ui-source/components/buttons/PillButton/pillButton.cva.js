import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { uiOutlineClass } from "../../outline.clsx.js";
import { compoundMapper } from "../../../utils/compoundMapper.js";
const pillButton = cva(
  [
    uiOutlineClass,
    "flex items-center justify-center",
    "rounded-pill-rounding-default border border-solid px-pill-side-default py-pill-height-default"
  ],
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        error: ""
      },
      variant: {
        contained: "",
        outlined: "",
        subtle: ""
      }
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        className: [
          "border-interactive-contained-primary-idle bg-interactive-contained-primary-idle text-interactive-contained-primary-on-idle",
          "hover:border-interactive-contained-primary-hover hover:bg-interactive-contained-primary-hover hover:text-interactive-contained-primary-on-hover",
          "pressed:border-interactive-contained-primary-pressed pressed:bg-interactive-contained-primary-pressed pressed:text-interactive-contained-primary-on-pressed",
          "disabled:border-interactive-contained-primary-disabled disabled:bg-interactive-contained-primary-disabled disabled:text-interactive-contained-primary-on-disabled",
          "focus-visible:outline-interactive-contained-primary-focus",
          "selected:border-interactive-contained-primary-toggled-idle selected:bg-interactive-contained-primary-toggled-idle selected:text-interactive-contained-primary-on-toggled-idle",
          "selected:hover:border-interactive-contained-primary-toggled-hover selected:hover:bg-interactive-contained-primary-toggled-hover selected:hover:text-interactive-contained-primary-on-toggled-hover",
          "selected:disabled:border-interactive-contained-primary-toggled-disabled selected:disabled:bg-interactive-contained-primary-toggled-disabled selected:disabled:text-interactive-contained-primary-on-toggled-disabled"
        ]
      },
      {
        variant: "outlined",
        color: "primary",
        className: [
          "border-interactive-outlined-primary-outline-idle bg-interactive-outlined-primary-idle text-interactive-outlined-primary-on-idle",
          "hover:border-interactive-outlined-primary-outline-hover hover:bg-interactive-outlined-primary-hover hover:text-interactive-outlined-primary-on-hover",
          "pressed:border-interactive-outlined-primary-outline-pressed pressed:bg-interactive-outlined-primary-pressed pressed:text-interactive-outlined-primary-on-pressed",
          "disabled:border-interactive-outlined-primary-outline-disabled disabled:bg-interactive-outlined-primary-disabled disabled:text-interactive-outlined-primary-on-disabled",
          "focus-visible:outline-interactive-outlined-primary-focus",
          "selected:border-interactive-outlined-primary-toggled-idle selected:bg-interactive-outlined-primary-toggled-idle selected:text-interactive-outlined-primary-on-toggled-idle",
          "selected:hover:border-interactive-outlined-primary-toggled-hover selected:hover:bg-interactive-outlined-primary-toggled-hover selected:hover:text-interactive-outlined-primary-on-toggled-hover",
          "selected:disabled:border-interactive-outlined-primary-toggled-disabled selected:disabled:bg-interactive-outlined-primary-toggled-disabled selected:disabled:text-interactive-outlined-primary-on-toggled-disabled"
        ]
      },
      {
        variant: "subtle",
        color: "primary",
        className: [
          "border-interactive-subtle-primary-idle bg-interactive-subtle-primary-idle text-interactive-subtle-primary-on-idle",
          "hover:border-interactive-subtle-primary-hover hover:bg-interactive-subtle-primary-hover hover:text-interactive-subtle-primary-on-hover",
          "pressed:border-interactive-subtle-primary-pressed pressed:bg-interactive-subtle-primary-pressed pressed:text-interactive-subtle-primary-on-pressed",
          "disabled:border-interactive-subtle-primary-disabled disabled:bg-interactive-subtle-primary-disabled disabled:text-interactive-subtle-primary-on-disabled",
          "focus-visible:outline-interactive-subtle-primary-focus",
          "selected:border-interactive-contained-primary-toggled-idle selected:bg-interactive-contained-primary-toggled-idle selected:text-interactive-contained-primary-on-toggled-idle",
          "selected:hover:border-interactive-subtle-primary-toggled-hover selected:hover:bg-interactive-subtle-primary-toggled-hover selected:hover:text-interactive-subtle-primary-on-toggled-hover",
          "selected:disabled:border-interactive-subtle-primary-toggled-disabled selected:disabled:bg-interactive-subtle-primary-toggled-disabled selected:disabled:text-interactive-subtle-primary-on-toggled-disabled"
        ]
      },
      {
        variant: "contained",
        color: "secondary",
        className: [
          "border-interactive-contained-secondary-idle bg-interactive-contained-secondary-idle text-interactive-contained-secondary-on-idle",
          "hover:border-interactive-contained-secondary-hover hover:bg-interactive-contained-secondary-hover hover:text-interactive-contained-secondary-on-hover",
          "pressed:border-interactive-contained-secondary-pressed pressed:bg-interactive-contained-secondary-pressed pressed:text-interactive-contained-secondary-on-pressed",
          "disabled:border-interactive-contained-secondary-disabled disabled:bg-interactive-contained-secondary-disabled disabled:text-interactive-contained-secondary-on-disabled",
          "focus-visible:outline-interactive-contained-secondary-focus",
          "selected:border-interactive-contained-secondary-toggled-idle selected:bg-interactive-contained-secondary-toggled-idle selected:text-interactive-contained-secondary-on-toggled-idle",
          "selected:hover:border-interactive-contained-secondary-toggled-hover selected:hover:bg-interactive-contained-secondary-toggled-hover selected:hover:text-interactive-contained-secondary-on-toggled-hover",
          "selected:disabled:border-interactive-contained-secondary-toggled-disabled selected:disabled:bg-interactive-contained-secondary-toggled-disabled selected:disabled:text-interactive-contained-secondary-on-toggled-disabled"
        ]
      },
      {
        variant: "outlined",
        color: "secondary",
        className: [
          "border-interactive-outlined-secondary-outline-idle bg-interactive-outlined-secondary-idle text-interactive-outlined-secondary-on-idle",
          "hover:border-interactive-outlined-secondary-outline-hover hover:bg-interactive-outlined-secondary-hover hover:text-interactive-outlined-secondary-on-hover",
          "pressed:border-interactive-outlined-secondary-outline-pressed pressed:bg-interactive-outlined-secondary-pressed pressed:text-interactive-outlined-secondary-on-pressed",
          "disabled:border-interactive-outlined-secondary-outline-disabled disabled:bg-interactive-outlined-secondary-disabled disabled:text-interactive-outlined-secondary-on-disabled",
          "focus-visible:outline-interactive-outlined-secondary-focus",
          "selected:border-interactive-contained-secondary-toggled-idle selected:bg-interactive-contained-secondary-toggled-idle selected:text-interactive-contained-secondary-on-toggled-idle",
          "selected:hover:border-interactive-contained-secondary-toggled-hover selected:hover:bg-interactive-contained-secondary-toggled-hover selected:hover:text-interactive-contained-secondary-on-toggled-hover",
          "selected:disabled:border-interactive-contained-secondary-toggled-disabled selected:disabled:bg-interactive-contained-secondary-toggled-disabled selected:disabled:text-interactive-contained-secondary-on-toggled-disabled"
        ]
      },
      {
        variant: "subtle",
        color: "secondary",
        className: [
          "border-interactive-subtle-secondary-idle bg-interactive-subtle-secondary-idle text-interactive-subtle-secondary-on-idle",
          "hover:border-interactive-subtle-secondary-hover hover:bg-interactive-subtle-secondary-hover hover:text-interactive-subtle-secondary-on-hover",
          "pressed:border-interactive-subtle-secondary-pressed pressed:bg-interactive-subtle-secondary-pressed pressed:text-interactive-subtle-secondary-on-pressed",
          "disabled:border-interactive-subtle-secondary-disabled disabled:bg-interactive-subtle-secondary-disabled disabled:text-interactive-subtle-secondary-on-disabled",
          "focus-visible:outline-interactive-subtle-secondary-focus",
          "selected:border-interactive-subtle-secondary-toggled-idle selected:bg-interactive-subtle-secondary-toggled-idle selected:text-interactive-subtle-secondary-on-toggled-idle",
          "selected:hover:border-interactive-subtle-secondary-toggled-hover selected:hover:bg-interactive-subtle-secondary-toggled-hover selected:hover:text-interactive-subtle-secondary-on-toggled-hover",
          "selected:disabled:border-interactive-subtle-secondary-toggled-disabled selected:disabled:bg-interactive-subtle-secondary-toggled-disabled selected:disabled:text-interactive-subtle-secondary-on-toggled-disabled"
        ]
      },
      {
        variant: "contained",
        color: "success",
        className: [
          "border-interactive-contained-success-idle bg-interactive-contained-success-idle text-interactive-contained-success-on-idle",
          "hover:border-interactive-contained-success-hover hover:bg-interactive-contained-success-hover hover:text-interactive-contained-success-on-hover",
          "pressed:border-interactive-contained-success-pressed pressed:bg-interactive-contained-success-pressed pressed:text-interactive-contained-success-on-pressed",
          "disabled:border-interactive-contained-success-disabled disabled:bg-interactive-contained-success-disabled disabled:text-interactive-contained-success-on-disabled",
          "focus-visible:outline-interactive-contained-success-focus",
          "selected:border-interactive-contained-success-toggled-idle selected:bg-interactive-contained-success-toggled-idle selected:text-interactive-contained-success-on-toggled-idle",
          "selected:hover:border-interactive-contained-success-toggled-hover selected:hover:bg-interactive-contained-success-toggled-hover selected:hover:text-interactive-contained-success-on-toggled-hover",
          "selected:disabled:border-interactive-contained-success-toggled-disabled selected:disabled:bg-interactive-contained-success-toggled-disabled selected:disabled:text-interactive-contained-success-on-toggled-disabled"
        ]
      },
      {
        variant: "outlined",
        color: "success",
        className: [
          "border-interactive-outlined-success-outline-idle bg-interactive-outlined-success-idle text-interactive-outlined-success-on-idle",
          "hover:border-interactive-outlined-success-outline-hover hover:bg-interactive-outlined-success-hover hover:text-interactive-outlined-success-on-hover",
          "pressed:border-interactive-outlined-success-outline-pressed pressed:bg-interactive-outlined-success-pressed pressed:text-interactive-outlined-success-on-pressed",
          "disabled:border-interactive-outlined-success-outline-disabled disabled:bg-interactive-outlined-success-disabled disabled:text-interactive-outlined-success-on-disabled",
          "focus-visible:outline-interactive-outlined-success-focus",
          "selected:border-interactive-outlined-success-toggled-idle selected:bg-interactive-outlined-success-toggled-idle selected:text-interactive-outlined-success-on-toggled-idle",
          "selected:hover:border-interactive-outlined-success-toggled-hover selected:hover:bg-interactive-outlined-success-toggled-hover selected:hover:text-interactive-outlined-success-on-toggled-hover",
          "selected:disabled:border-interactive-outlined-success-toggled-disabled selected:disabled:bg-interactive-outlined-success-toggled-disabled selected:disabled:text-interactive-outlined-success-on-toggled-disabled"
        ]
      },
      {
        variant: "subtle",
        color: "success",
        className: [
          "border-interactive-subtle-success-idle bg-interactive-subtle-success-idle text-interactive-subtle-success-on-idle",
          "hover:border-interactive-subtle-success-hover hover:bg-interactive-subtle-success-hover hover:text-interactive-subtle-success-on-hover",
          "pressed:border-interactive-subtle-success-pressed pressed:bg-interactive-subtle-success-pressed pressed:text-interactive-subtle-success-on-pressed",
          "disabled:border-interactive-subtle-success-disabled disabled:bg-interactive-subtle-success-disabled disabled:text-interactive-subtle-success-on-disabled",
          "focus-visible:outline-interactive-subtle-success-focus",
          "selected:border-interactive-subtle-success-toggled-idle selected:bg-interactive-subtle-success-toggled-idle selected:text-interactive-subtle-success-on-toggled-idle",
          "selected:hover:border-interactive-subtle-success-toggled-hover selected:hover:bg-interactive-subtle-success-toggled-hover selected:hover:text-interactive-subtle-success-on-toggled-hover",
          "selected:disabled:border-interactive-subtle-success-toggled-disabled selected:disabled:bg-interactive-subtle-success-toggled-disabled selected:disabled:text-interactive-subtle-success-on-toggled-disabled"
        ]
      },
      {
        variant: "contained",
        color: "warning",
        className: [
          "border-interactive-contained-warning-idle bg-interactive-contained-warning-idle text-interactive-contained-warning-on-idle",
          "hover:border-interactive-contained-warning-hover hover:bg-interactive-contained-warning-hover hover:text-interactive-contained-warning-on-hover",
          "pressed:border-interactive-contained-warning-pressed pressed:bg-interactive-contained-warning-pressed pressed:text-interactive-contained-warning-on-pressed",
          "disabled:border-interactive-contained-warning-disabled disabled:bg-interactive-contained-warning-disabled disabled:text-interactive-contained-warning-on-disabled",
          "focus-visible:outline-interactive-contained-warning-focus",
          "selected:border-interactive-contained-warning-toggled-idle selected:bg-interactive-contained-warning-toggled-idle selected:text-interactive-contained-warning-on-toggled-idle",
          "selected:hover:border-interactive-contained-warning-toggled-hover selected:hover:bg-interactive-contained-warning-toggled-hover selected:hover:text-interactive-contained-warning-on-toggled-hover",
          "selected:disabled:border-interactive-contained-warning-toggled-disabled selected:disabled:bg-interactive-contained-warning-toggled-disabled selected:disabled:text-interactive-contained-warning-on-toggled-disabled"
        ]
      },
      {
        variant: "outlined",
        color: "warning",
        className: [
          "border-interactive-outlined-warning-outline-idle bg-interactive-outlined-warning-idle text-interactive-outlined-warning-on-idle",
          "hover:border-interactive-outlined-warning-outline-hover hover:bg-interactive-outlined-warning-hover hover:text-interactive-outlined-warning-on-hover",
          "pressed:border-interactive-outlined-warning-outline-pressed pressed:bg-interactive-outlined-warning-pressed pressed:text-interactive-outlined-warning-on-pressed",
          "disabled:border-interactive-outlined-warning-outline-disabled disabled:bg-interactive-outlined-warning-disabled disabled:text-interactive-outlined-warning-on-disabled",
          "focus-visible:outline-interactive-outlined-warning-focus",
          "selected:border-interactive-outlined-warning-toggled-idle selected:bg-interactive-outlined-warning-toggled-idle selected:text-interactive-outlined-warning-on-toggled-idle",
          "selected:hover:border-interactive-outlined-warning-toggled-hover selected:hover:bg-interactive-outlined-warning-toggled-hover selected:hover:text-interactive-outlined-warning-on-toggled-hover",
          "selected:disabled:border-interactive-outlined-warning-toggled-disabled selected:disabled:bg-interactive-outlined-warning-toggled-disabled selected:disabled:text-interactive-outlined-warning-on-toggled-disabled"
        ]
      },
      {
        variant: "subtle",
        color: "warning",
        className: [
          "border-interactive-subtle-warning-idle bg-interactive-subtle-warning-idle text-interactive-subtle-warning-on-idle",
          "hover:border-interactive-subtle-warning-hover hover:bg-interactive-subtle-warning-hover hover:text-interactive-subtle-warning-on-hover",
          "pressed:border-interactive-subtle-warning-pressed pressed:bg-interactive-subtle-warning-pressed pressed:text-interactive-subtle-warning-on-pressed",
          "disabled:border-interactive-subtle-warning-disabled disabled:bg-interactive-subtle-warning-disabled disabled:text-interactive-subtle-warning-on-disabled",
          "focus-visible:outline-interactive-subtle-warning-focus",
          "selected:border-interactive-subtle-warning-toggled-idle selected:bg-interactive-subtle-warning-toggled-idle selected:text-interactive-subtle-warning-on-toggled-idle",
          "selected:hover:border-interactive-subtle-warning-toggled-hover selected:hover:bg-interactive-subtle-warning-toggled-hover selected:hover:text-interactive-subtle-warning-on-toggled-hover",
          "selected:disabled:border-interactive-subtle-warning-toggled-disabled selected:disabled:bg-interactive-subtle-warning-toggled-disabled selected:disabled:text-interactive-subtle-warning-on-toggled-disabled"
        ]
      },
      {
        variant: "contained",
        color: "error",
        className: [
          "border-interactive-contained-error-idle bg-interactive-contained-error-idle text-interactive-contained-error-on-idle",
          "hover:border-interactive-contained-error-hover hover:bg-interactive-contained-error-hover hover:text-interactive-contained-error-on-hover",
          "pressed:border-interactive-contained-error-pressed pressed:bg-interactive-contained-error-pressed pressed:text-interactive-contained-error-on-pressed",
          "disabled:border-interactive-contained-error-disabled disabled:bg-interactive-contained-error-disabled disabled:text-interactive-contained-error-on-disabled",
          "focus-visible:outline-interactive-contained-error-focus",
          "selected:border-interactive-contained-error-toggled-idle selected:bg-interactive-contained-error-toggled-idle selected:text-interactive-contained-error-on-toggled-idle",
          "selected:hover:border-interactive-contained-error-toggled-hover selected:hover:bg-interactive-contained-error-toggled-hover selected:hover:text-interactive-contained-error-on-toggled-hover",
          "selected:disabled:border-interactive-contained-error-toggled-disabled selected:disabled:bg-interactive-contained-error-toggled-disabled selected:disabled:text-interactive-contained-error-on-toggled-disabled"
        ]
      },
      {
        variant: "outlined",
        color: "error",
        className: [
          "border-interactive-outlined-error-outline-idle bg-interactive-outlined-error-idle text-interactive-outlined-error-on-idle",
          "hover:border-interactive-outlined-error-outline-hover hover:bg-interactive-outlined-error-hover hover:text-interactive-outlined-error-on-hover",
          "pressed:border-interactive-outlined-error-outline-pressed pressed:bg-interactive-outlined-error-pressed pressed:text-interactive-outlined-error-on-pressed",
          "disabled:border-interactive-outlined-error-outline-disabled disabled:bg-interactive-outlined-error-disabled disabled:text-interactive-outlined-error-on-disabled",
          "focus-visible:outline-interactive-outlined-error-focus",
          "selected:border-interactive-outlined-error-toggled-idle selected:bg-interactive-outlined-error-toggled-idle selected:text-interactive-outlined-error-on-toggled-idle",
          "selected:hover:border-interactive-outlined-error-toggled-hover selected:hover:bg-interactive-outlined-error-toggled-hover selected:hover:text-interactive-outlined-error-on-toggled-hover",
          "selected:disabled:border-interactive-outlined-error-toggled-disabled selected:disabled:bg-interactive-outlined-error-toggled-disabled selected:disabled:text-interactive-outlined-error-on-toggled-disabled"
        ]
      },
      {
        variant: "subtle",
        color: "error",
        className: [
          "border-interactive-subtle-error-idle bg-interactive-subtle-error-idle text-interactive-subtle-error-on-idle",
          "hover:border-interactive-subtle-error-hover hover:bg-interactive-subtle-error-hover hover:text-interactive-subtle-error-on-hover",
          "pressed:border-interactive-subtle-error-pressed pressed:bg-interactive-subtle-error-pressed pressed:text-interactive-subtle-error-on-pressed",
          "disabled:border-interactive-subtle-error-disabled disabled:bg-interactive-subtle-error-disabled disabled:text-interactive-subtle-error-on-disabled",
          "focus-visible:outline-interactive-subtle-error-focus",
          "selected:border-interactive-subtle-error-toggled-idle selected:bg-interactive-subtle-error-toggled-idle selected:text-interactive-subtle-error-on-toggled-idle",
          "selected:hover:border-interactive-subtle-error-toggled-hover selected:hover:bg-interactive-subtle-error-toggled-hover selected:hover:text-interactive-subtle-error-on-toggled-hover",
          "selected:disabled:border-interactive-subtle-error-toggled-disabled selected:disabled:bg-interactive-subtle-error-toggled-disabled selected:disabled:text-interactive-subtle-error-on-toggled-disabled"
        ]
      }
    ],
    defaultVariants: {
      color: "primary",
      variant: "contained"
    }
  }
);
const pillButtonContent = cva("", {
  variants: {
    iconPosition: {
      left: "gap-button-gap-icon-to-label pr-button-side-button-content",
      right: "gap-button-gap-icon-to-label pl-button-side-button-content",
      none: "gap-button-gap-icon-to-label"
    }
  },
  defaultVariants: {
    iconPosition: "left"
  }
});
const pillButtonIconSize = clsx("h-6 w-6");
const pillButtonTypography = compoundMapper({
  default: {
    size: "label-2",
    variant: "prominent-1"
  }
});
export {
  pillButton,
  pillButtonContent,
  pillButtonIconSize,
  pillButtonTypography
};
