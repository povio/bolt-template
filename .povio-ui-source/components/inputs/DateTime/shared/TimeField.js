import { jsx } from "react/jsx-runtime";
import { DateSegmentItem } from "./DateSegmentItem.js";
const TimeField = ({ ref, fieldProps, state, isDisabled, hidePlaceholder }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    "div",
    {
      ...fieldProps,
      ref,
      className: "flex",
      children: state.segments.map((segment, i) => /* @__PURE__ */ jsx(
        DateSegmentItem,
        {
          segment,
          state,
          isDisabled,
          timePickerOnly: true,
          hidePlaceholder
        },
        i
      ))
    }
  ) });
};
export {
  TimeField
};
