import { cva } from "class-variance-authority";
import { uiGroupOutlineClass } from "../../outline.clsx.js";
import { compoundMapper } from "../../../utils/compoundMapper.js";
const radio = cva(
  [
    "flex items-center justify-center border-2",
    "relative size-3-5 rounded-full p-1-5",
    "before:absolute before:hidden before:size-1 before:rounded-full",
    uiGroupOutlineClass
  ],
  {
    variants: {
      variant: {
        default: [
          "border-interactive-contained-secondary-idle",
          "group-disabled:border-interactive-contained-secondary-disabled",
          "group-hover:border-interactive-contained-secondary-hover",
          "group-pressed:border-interactive-contained-secondary-pressed",
          "group-selected:border-interactive-contained-primary-idle",
          "group-selected:bg-interactive-contained-primary-idle",
          "group-selected:group-hover:bg-interactive-contained-primary-hover",
          "group-selected:group-hover:border-interactive-contained-primary-hover",
          "group-selected:group-pressed:bg-interactive-contained-primary-pressed",
          "group-selected:group-pressed:border-interactive-contained-primary-pressed",
          "group-selected:group-disabled:bg-interactive-contained-primary-disabled",
          "group-selected:group-disabled:border-interactive-contained-primary-disabled",
          "group-indeterminate:border-interactive-contained-primary-idle",
          "group-indeterminate:bg-interactive-contained-primary-idle",
          "group-indeterminate:group-hover:bg-interactive-contained-primary-hover",
          "group-indeterminate:group-hover:border-interactive-contained-primary-hover",
          "group-indeterminate:group-pressed:bg-interactive-contained-primary-pressed",
          "group-indeterminate:group-pressed:border-interactive-contained-primary-pressed",
          "group-invalid:border-interactive-contained-error-idle",
          "group-focus-visible:outline-interactive-contained-primary-focus",
          "before:bg-interactive-contained-primary-on-idle",
          "group-hover:before:bg-interactive-contained-primary-on-hover",
          "group-selected:before:block"
        ]
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const radioIndicatorClass = "group flex items-center gap-2";
const radioTypography = compoundMapper({
  default: {
    size: "label-1",
    variant: "default"
  }
});
export {
  radio,
  radioIndicatorClass,
  radioTypography
};
