import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Typography } from "../text/Typography/Typography.js";
const CellText = ({ children, style, className }) => /* @__PURE__ */ jsx(
  Typography,
  {
    variant: "default",
    size: "label-1",
    as: "span",
    className: clsx("block overflow-hidden text-ellipsis px-2 py-1-5 text-text-default-2", className),
    style,
    "data-rac": true,
    children
  }
);
export {
  CellText
};
