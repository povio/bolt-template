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
      triggerClassName: props.triggerClassName,
      triggerTabIndex: props.triggerTabIndex,
      children: /* @__PURE__ */ jsx("div", { tabIndex: -1, children: props.children })
    }
  );
};
export {
  TooltipWrapper
};
