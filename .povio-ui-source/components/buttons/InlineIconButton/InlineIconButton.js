import { jsx } from "react/jsx-runtime";
import { Button } from "../Button/Button.js";
const InlineIconButton = ({ label, ...props }) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...props,
      iconOnly: true,
      variant: "text",
      size: "none",
      width: "hug",
      children: label
    }
  );
};
export {
  InlineIconButton
};
