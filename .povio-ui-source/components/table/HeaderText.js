import { jsx } from "react/jsx-runtime";
import { Typography } from "../text/Typography/Typography.js";
const HeaderText = ({ children }) => /* @__PURE__ */ jsx(
  Typography,
  {
    variant: "default",
    size: "label-1",
    as: "span",
    className: "overflow-hidden text-ellipsis px-table-cell-content-side-m py-table-cell-content-height-m text-text-default-1",
    children
  }
);
export {
  HeaderText
};
