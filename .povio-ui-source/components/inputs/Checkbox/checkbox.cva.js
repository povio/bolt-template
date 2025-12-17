import { cva } from "class-variance-authority";
import { uiGroupOutlineClass } from "../../outline.clsx.js";
import { compoundMapper } from "../../../utils/compoundMapper.js";
const checkbox = cva(
  ["flex items-center justify-center border-2", "relative size-4 shrink-0 rounded-xs p-1", uiGroupOutlineClass],
  {
    variants: {
      variant: {
        default: [
          "m-1 border-interactive-outlined-secondary-on-idle",
          "text-interactive-contained-primary-on-idle",
          "group-hover:text-interactive-contained-primary-on-hover",
          "group-pressed:text-interactive-contained-primary-on-pressed",
          "group-disabled:text-interactive-contained-primary-on-disabled",
          "group-disabled:border-interactive-outlined-secondary-on-disabled",
          "group-hover:border-interactive-outlined-secondary-on-hover",
          "group-pressed:border-interactive-outlined-secondary-on-pressed",
          "group-selected:border-interactive-contained-primary-idle",
          "group-selected:bg-interactive-contained-primary-idle",
          "group-selected:group-hover:bg-interactive-contained-primary-hover",
          "group-selected:group-hover:border-interactive-contained-primary-hover",
          "group-selected:group-pressed:bg-interactive-contained-primary-pressed",
          "group-selected:group-pressed:border-interactive-contained-primary-pressed",
          "group-indeterminate:border-interactive-contained-primary-idle",
          "group-indeterminate:bg-interactive-contained-primary-idle",
          "group-indeterminate:group-hover:bg-interactive-contained-primary-hover",
          "group-indeterminate:group-hover:border-interactive-contained-primary-hover",
          "group-indeterminate:group-pressed:bg-interactive-contained-primary-pressed",
          "group-indeterminate:group-pressed:border-interactive-contained-primary-pressed",
          "group-invalid:border-interactive-outlined-error-on-idle",
          "group-focus-visible:outline-interactive-contained-primary-focus"
        ]
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const checkboxIndicatorClass = "group flex items-center gap-2";
const checkboxTypography = compoundMapper({
  default: {
    size: "label-1",
    variant: "default"
  }
});
export {
  checkbox,
  checkboxIndicatorClass,
  checkboxTypography
};
