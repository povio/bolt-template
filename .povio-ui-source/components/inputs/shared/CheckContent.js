import { jsx } from "react/jsx-runtime";
import { typography } from "../../text/Typography/typography.cva.js";
import { UIStyle } from "../../../config/uiStyle.context.js";
const CheckContent = ({ children, ...props }) => {
  const uiStyle = UIStyle.useConfig();
  const typographyCva = uiStyle?.typography?.cva ?? typography;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: typographyCva({
        size: "label-1",
        variant: "default",
        ...props.typography,
        className: "text-text-default-2"
      }),
      children
    }
  );
};
export {
  CheckContent
};
