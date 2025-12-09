import { jsx } from "react/jsx-runtime";
import { Button } from "../Button/Button.js";
const ToggleButton = ({ children, ...props }) => {
  return (
    // @ts-expect-error Types not matching, but this is only for backwards compatibility
    /* @__PURE__ */ jsx(
      Button,
      {
        ...props,
        toggle: true,
        variant: "outlined",
        color: "primary",
        disableTooltip: props.disableTooltip,
        children
      }
    )
  );
};
export {
  ToggleButton
};
