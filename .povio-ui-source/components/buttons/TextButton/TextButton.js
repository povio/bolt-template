import { jsx } from "react/jsx-runtime";
import { Button } from "../Button/Button.js";
const TextButton = ({ children, ...props }) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...props,
      variant: "text",
      size: "none",
      width: props.width ?? "hug",
      disableTooltip: props.disableTooltip,
      children
    }
  );
};
export {
  TextButton
};
