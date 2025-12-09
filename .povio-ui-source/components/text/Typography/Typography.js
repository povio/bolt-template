import { jsx } from "react/jsx-runtime";
import { typography } from "./typography.cva.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const Typography = ({ as = "p", className, ...props }) => {
  const uiStyle = UIStyle.useConfig();
  const typographyCva = uiStyle?.typography?.cva ?? typography;
  const Tag = as;
  return /* @__PURE__ */ jsx(
    Tag,
    {
      className: typographyCva({
        ...props,
        sizeMobile: props.sizeMobile ?? props.size,
        className
      }),
      ...props
    }
  );
};
export {
  Typography
};
