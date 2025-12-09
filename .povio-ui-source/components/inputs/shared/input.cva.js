import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { uiOutlineClass } from "../../outline.clsx.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const inputBase = cva([uiOutlineClass, "flex w-full truncate"], {
  variants: {
    variant: {
      outlined: "",
      filled: ""
    },
    as: {
      default: "rounded-input-rounding-default",
      floating: [
        "rounded-input-rounding-default",
        "py-floating-label-input-height-empty!",
        "group-has-[input:not(:placeholder-shown)]/input-content:pb-floating-label-input-height-filled!",
        "group-has-[input:not(:placeholder-shown)]/input-content:pt-[calc(var(--spacing-input-height-default)+14px)]!"
        // TODO: remove this hardcoded value
      ],
      filter: "rounded-input-rounding-default",
      inline: [
        "h-full",
        "border-transparent border-b-0 bg-transparent text-text-default-1",
        "hover:border-input-outlined-outline-hover",
        "focus:border-input-outlined-outline-active",
        "invalid:border-input-outlined-outline-error",
        "disabled:hover:border-transparent"
      ]
    }
  },
  compoundVariants: [
    {
      variant: "outlined",
      as: "default",
      className: [
        "border border-input-outlined-outline-idle border-solid bg-input-outlined-idle text-text-default-1",
        "hover:border-input-outlined-outline-hover hover:border-solid hover:bg-input-outlined-hover hover:text-text-default-1",
        "focus-within:border-input-outlined-outline-active focus-within:border-solid focus-within:bg-input-outlined-active focus-within:text-text-default-1",
        "invalid:border-input-outlined-outline-error invalid:border-solid invalid:bg-input-outlined-error invalid:text-text-default-1",
        "disabled:border-input-outlined-outline-disabled disabled:border-solid disabled:bg-input-outlined-disabled disabled:text-text-default-1",
        "placeholder:text-text-default-3",
        "focus-visible:outline-interactive-contained-primary-focus"
      ]
    },
    {
      variant: "filled",
      as: "default",
      className: [
        "bg-input-filled-idle text-text-default-1",
        "hover:border hover:border-input-filled-outline-hover hover:border-solid hover:bg-input-filled-hover hover:text-text-default-1",
        "focus-within:border focus-within:border-input-filled-outline-active focus-within:border-solid focus-within:bg-input-filled-active focus-within:text-text-default-1",
        "invalid:border invalid:border-input-filled-outline-error invalid:border-solid invalid:bg-input-filled-error invalid:text-text-default-1",
        "disabled:bg-input-filled-disabled disabled:text-text-default-1",
        "placeholder:text-text-default-3",
        "focus-visible:outline-interactive-contained-primary-focus"
      ]
    },
    {
      variant: "outlined",
      as: "floating",
      className: [
        "border border-input-outlined-outline-idle border-solid bg-input-outlined-idle text-text-default-1",
        "hover:border-input-outlined-outline-hover hover:border-solid hover:bg-input-outlined-hover hover:text-text-default-1",
        "focus-within:border-input-outlined-outline-active focus-within:border-solid focus-within:bg-input-outlined-active focus-within:text-text-default-1",
        "invalid:border-input-outlined-outline-error invalid:border-solid invalid:bg-input-outlined-error invalid:text-text-default-1",
        "disabled:border-input-outlined-outline-disabled disabled:border-solid disabled:bg-input-outlined-disabled disabled:text-text-default-1",
        "placeholder:text-text-default-3",
        "focus-visible:outline-interactive-contained-primary-focus"
      ]
    },
    {
      variant: "filled",
      as: "floating",
      className: [
        "bg-input-filled-idle text-text-default-1",
        "hover:border hover:border-input-filled-outline-hover hover:border-solid hover:bg-input-filled-hover hover:text-text-default-1",
        "focus-within:border focus-within:border-input-outlined-outline-active focus-within:border-solid focus-within:bg-input-outlined-idle focus-within:text-text-default-1",
        "invalid:border invalid:border-input-filled-outline-error invalid:border-solid invalid:bg-input-filled-error invalid:text-text-default-1",
        "disabled:bg-input-filled-disabled disabled:text-text-default-1",
        "placeholder:text-text-default-3",
        "focus-visible:outline-interactive-contained-primary-focus"
      ]
    },
    {
      variant: "outlined",
      as: "filter",
      className: [
        "border border-input-outlined-outline-idle border-solid bg-input-outlined-idle text-text-default-1",
        "hover:border-input-outlined-outline-hover hover:border-solid hover:bg-input-outlined-hover hover:text-text-default-1",
        "focus-within:border-input-outlined-outline-active focus-within:border-solid focus-within:bg-input-outlined-active focus-within:text-text-default-1",
        "invalid:border-input-outlined-outline-error invalid:border-solid invalid:bg-input-outlined-error invalid:text-text-default-1",
        "disabled:border-input-outlined-outline-disabled disabled:border-solid disabled:bg-input-outlined-disabled disabled:text-text-default-1",
        "placeholder:text-text-default-3",
        "focus-visible:outline-interactive-contained-primary-focus"
      ]
    },
    {
      variant: "outlined",
      as: "filter",
      className: [
        "bg-input-filled-idle text-text-default-1",
        "hover:border hover:border-input-filled-outline-hover hover:border-solid hover:bg-input-filled-hover hover:text-text-default-1",
        "focus-within:border focus-within:border-input-filled-outline-active focus-within:border-solid focus-within:bg-input-filled-active focus-within:text-text-default-1",
        "invalid:border invalid:border-input-filled-outline-error invalid:border-solid invalid:bg-input-filled-error invalid:text-text-default-1",
        "disabled:bg-input-filled-disabled disabled:text-text-default-1",
        "placeholder:text-text-default-3",
        "focus-visible:outline-interactive-contained-primary-focus"
      ]
    }
  ],
  defaultVariants: {
    variant: "outlined",
    as: "default"
  }
});
const inputSize = cva("", {
  variants: {
    size: {
      "extra-small": "px-input-side-default py-input-height-default text-label-1",
      small: "px-input-side-default py-input-height-default text-label-1",
      default: "px-input-side-default py-input-height-default text-label-1",
      large: "px-input-side-default py-input-height-default text-label-1"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
const inputSide = cva("", {
  variants: {
    size: {
      "extra-small": "",
      small: "",
      default: "",
      large: ""
    },
    type: {
      left: "",
      right: "",
      var: ""
    }
  },
  compoundVariants: [
    { type: "left", size: "extra-small", className: "left-input-side-default" },
    { type: "right", size: "extra-small", className: "right-input-side-default" },
    { type: "var", size: "extra-small", className: "--spacing-input-side-default" },
    { type: "left", size: "small", className: "left-input-side-default" },
    { type: "right", size: "small", className: "right-input-side-default" },
    { type: "var", size: "small", className: "--spacing-input-side-default" },
    { type: "left", size: "default", className: "left-input-side-default" },
    { type: "right", size: "default", className: "right-input-side-default" },
    { type: "var", size: "default", className: "--spacing-input-side-default" },
    { type: "left", size: "large", className: "left-input-side-default" },
    { type: "right", size: "large", className: "right-input-side-default" },
    { type: "var", size: "large", className: "--spacing-input-side-default" }
  ],
  defaultVariants: {
    size: "default"
  }
});
const useInputCva = () => {
  const uiStyle = UIStyle.useConfig();
  const inputBaseCva = uiStyle?.input?.baseCva ?? inputBase;
  const inputSizeCva = uiStyle?.input?.sizeCva ?? inputSize;
  return ({ className, ...rest }) => {
    return clsx(inputBaseCva(rest), inputSizeCva(rest), className);
  };
};
export {
  inputBase,
  inputSide,
  inputSize,
  useInputCva
};
