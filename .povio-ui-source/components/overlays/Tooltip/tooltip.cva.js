import { cva } from "class-variance-authority";
const tooltipCva = cva(
  ["group max-w-64 rounded-tooltip-rounding-default px-tooltip-side-default py-tooltip-height-default shadow-2"],
  {
    variants: {
      color: {
        default: ["bg-interactive-contained-secondary-idle"],
        error: ["w-max bg-elevation-fill-error-1"]
      }
    },
    defaultVariants: {
      color: "default"
    }
  }
);
const tooltipPointerHorizontalCva = cva(
  ["h-2-5 w-5 group-placement-left:hidden group-placement-right:hidden group-placement-top:rotate-180"],
  {
    variants: {
      color: {
        default: ["text-interactive-contained-secondary-idle"],
        error: ["text-elevation-fill-error-1"]
      }
    },
    defaultVariants: {
      color: "default"
    }
  }
);
const tooltipPointerVerticalCva = cva(
  ["h-5 w-2-5 group-placement-bottom:hidden group-placement-top:hidden group-placement-left:rotate-180"],
  {
    variants: {
      color: {
        default: ["text-interactive-contained-secondary-idle"],
        error: ["text-elevation-fill-error-1"]
      }
    },
    defaultVariants: {
      color: "default"
    }
  }
);
const tooltipTextCva = cva([], {
  variants: {
    color: {
      default: ["text-text-inverted-3"],
      error: ["text-text-error-inverted-1"]
    }
  },
  defaultVariants: {
    color: "default"
  }
});
export {
  tooltipCva,
  tooltipPointerHorizontalCva,
  tooltipPointerVerticalCva,
  tooltipTextCva
};
