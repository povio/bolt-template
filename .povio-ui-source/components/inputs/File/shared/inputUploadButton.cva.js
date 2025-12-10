import { cva } from "class-variance-authority";
import { clsx } from "clsx";
const inputUploadButtonBase = cva(
  ["flex w-full items-center justify-between gap-input-gap-input-to-button-gap"],
  {
    variants: {
      variant: {
        default: [],
        nested: []
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const inputUploadButton = (props) => {
  const { className, ...rest } = props;
  return clsx(inputUploadButtonBase(rest), className);
};
const inputUploadDropZone = cva(
  [
    "min-w-0 flex-1",
    "flex items-center",
    "group-invalid/input-upload:border group-invalid/input-upload:border-input-outlined-outline-error",
    "data-[drop-target]:border-input-outlined-outline-hover",
    "hover:border-input-outlined-outline-hover"
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-input-rounding-default border border-input-outlined-outline-idle border-solid bg-input-outlined-idle"
        ],
        nested: [
          "rounded-input-rounding-default border border-input-outlined-outline-idle border-solid bg-input-outlined-idle"
        ]
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
export {
  inputUploadButton,
  inputUploadButtonBase,
  inputUploadDropZone
};
