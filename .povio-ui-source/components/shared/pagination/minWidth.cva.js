import { cva } from "class-variance-authority";
const minWidth = cva("", {
  variants: {
    size: {
      xxs: ["min-w-button-width-min-width-xxs"],
      xs: ["min-w-button-width-min-width-xs"],
      s: ["min-w-button-width-min-width-s"],
      m: ["min-w-button-width-min-width-m"],
      l: ["min-w-button-width-min-width-l"]
    }
  }
});
export {
  minWidth
};
