import { cva } from "class-variance-authority";
import { uiGroupOutlineClass } from "../../outline.clsx.js";
import { compoundMapper } from "../../../utils/compoundMapper.js";
const toggle = cva(
  [
    "h-6 w-10 rounded-full before:m-0-5 before:block before:aspect-square before:h-5 before:rounded-full before:transition-transform before:content-[''] group-selected:before:translate-x-4",
    uiGroupOutlineClass
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-interactive-contained-secondary-idle",
          "group-disabled:bg-interactive-contained-secondary-disabled",
          "group-hover:bg-interactive-contained-secondary-hover",
          "group-pressed:bg-interactive-contained-secondary-pressed",
          "group-selected:bg-interactive-contained-primary-idle",
          "group-selected:group-hover:bg-interactive-contained-primary-hover",
          "group-selected:group-pressed:bg-interactive-contained-primary-pressed",
          "group-focus-visible:outline-interactive-text-secondary-focus",
          "before:bg-interactive-contained-secondary-on-idle",
          "group-hover:before:bg-interactive-contained-secondary-on-hover",
          "group-disabled:before:bg-interactive-contained-secondary-on-disabled",
          "group-selected:before:bg-interactive-contained-primary-on-idle",
          "group-selected:group-hover:before:bg-interactive-contained-primary-on-hover",
          "group-selected:group-pressed:before:bg-interactive-contained-primary-on-pressed"
        ]
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const toggleTypography = compoundMapper({
  default: {
    size: "label-1",
    variant: "default"
  }
});
export {
  toggle,
  toggleTypography
};
