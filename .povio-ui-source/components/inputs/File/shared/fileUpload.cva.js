import { cva } from "class-variance-authority";
import { clsx } from "clsx";
const fileUploadDropZoneBase = cva(["relative w-full rounded-input-rounding-default"], {
  variants: {
    variant: {
      vertical: ["flex-col justify-center"],
      horizontal: ["flex-row justify-between"]
    },
    isContainer: {
      true: [
        "data-[drop-target]:before:content-['']",
        "data-[drop-target]:before:absolute",
        "data-[drop-target]:before:z-40",
        "data-[drop-target]:before:width-full",
        "data-[drop-target]:before:height-full",
        "data-[drop-target]:before:top-0",
        "data-[drop-target]:before:left-0",
        "data-[drop-target]:border data-[drop-target]:border-dashed",
        "data-[drop-target]:border-elevation-outline-default-2",
        "data-[drop-target]:before:pointer-events-none data-[drop-target]:before:inset-0",
        "data-[drop-target]:before:bg-elevation-fill-default-2"
      ],
      false: [
        "flex items-center",
        "py-file-upload-container-height-top-bottom",
        "px-file-upload-container-side-default",
        "gap-gap-file-upload-content-gap-icon-to-content",
        "border border-input-outlined-outline-idle border-dashed bg-input-outlined-idle",
        "hover:border-elevation-outline-default-2 hover:bg-elevation-fill-default-2",
        "invalid:border invalid:border-input-outlined-outline-error",
        "data-[drop-target]:border-elevation-outline-default-2 data-[drop-target]:bg-elevation-fill-default-2",
        "data-[has-files]:border-solid"
      ]
    }
  },
  defaultVariants: {
    variant: "vertical"
  }
});
const fileUploadDropZone = (props) => {
  const { className, ...rest } = props;
  return clsx(fileUploadDropZoneBase(rest), className);
};
cva(["flex gap-3"], {
  variants: {
    variant: {
      vertical: ["flex-col"],
      horizontal: ["flex-row flex-wrap"]
    }
  },
  defaultVariants: {
    variant: "vertical"
  }
});
export {
  fileUploadDropZone,
  fileUploadDropZoneBase
};
