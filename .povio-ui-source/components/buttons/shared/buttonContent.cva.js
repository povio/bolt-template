import { cva } from "class-variance-authority";
const buttonContent = cva("flex w-full items-center justify-center", {
  variants: {
    iconPosition: {
      left: "flex-row",
      right: "flex-row-reverse",
      none: "flex-row"
    }
  },
  defaultVariants: {
    iconPosition: "left"
  }
});
export {
  buttonContent
};
