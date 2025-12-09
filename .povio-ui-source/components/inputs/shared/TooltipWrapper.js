import { jsx } from "react/jsx-runtime";
import { Tooltip } from "../../overlays/Tooltip/Tooltip.js";
const TooltipWrapper = (props) => {
  if (props.as !== "inline") {
    return props.children;
  }
  return /* @__PURE__ */ jsx(
    Tooltip,
    {
      text: props.error || void 0,
      placement: "bottom",
      color: "error",
      hidden: !props.error,
      isNonInteractiveTrigger: true,
      children: /* @__PURE__ */ jsx("div", { children: props.children })
    }
  );
};
export {
  TooltipWrapper
};
