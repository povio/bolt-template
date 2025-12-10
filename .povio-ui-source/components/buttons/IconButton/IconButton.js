import { jsx } from "react/jsx-runtime";
import { Button } from "../Button/Button.js";
const IconButton = ({ label, ...props }) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...props,
      iconOnly: true,
      width: "hug",
      disableTooltip: props.disableTooltip,
      children: label
    }
  );
};
export {
  IconButton
};
