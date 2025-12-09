import { cva } from "class-variance-authority";
const loaderWrapper = cva("flex items-center justify-center", {
  variants: {
    size: {
      default: "size-6",
      l: "size-16"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
const loader = cva("animate-loader-spin", {
  variants: {
    size: {
      default: "size-3-5",
      l: "size-8"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
export {
  loader,
  loaderWrapper
};
