import { jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Tooltip } from "./Tooltip.js";
const TooltipEllipsis = ({ text, children, isDisabled }) => {
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const onContentRef = (ref) => {
    if (ref) {
      setIsEllipsisActive(ref.offsetWidth < ref.scrollWidth);
    }
  };
  const content = children(onContentRef);
  if (isEllipsisActive && !isDisabled) {
    return /* @__PURE__ */ jsx(
      Tooltip,
      {
        text,
        placement: "bottom",
        isDisabled,
        children: content
      }
    );
  }
  return content;
};
export {
  TooltipEllipsis
};
