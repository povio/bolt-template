import { cva } from "class-variance-authority";
import { uiOutlineClass } from "../../outline.clsx.js";
const link = cva(["underline", uiOutlineClass], {
  variants: {
    variant: {
      default: [
        "text-interactive-text-primary-idle focus-visible:outline-interactive-text-primary-focus",
        "hover:text-interactive-text-primary-hover focus-visible:text-interactive-text-primary-focus active:text-interactive-text-primary-pressed"
      ]
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
export {
  link
};
