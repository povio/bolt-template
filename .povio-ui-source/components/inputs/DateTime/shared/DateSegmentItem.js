import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useRef } from "react";
import { useDateSegment } from "react-aria";
const getPlaceholder = (segment) => {
  if (!segment.isPlaceholder) {
    return null;
  }
  switch (segment.type) {
    case "hour":
      return "hh";
    case "minute":
      return "mm";
    case "second":
      return "ss";
    default:
      return segment.placeholder;
  }
};
const DateSegmentItem = ({ segment, state, isDisabled, timePickerOnly, hidePlaceholder }) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  const isInputEmpty = !state.value;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...segmentProps,
      ref,
      className: clsx(
        "box-content rounded-input-rounding-default",
        isDisabled && "text-interactive-text-secondary-disabled",
        !isDisabled && isInputEmpty && "text-text-default-3 group-focus-within:text-text-default-1",
        !isDisabled && !isInputEmpty && "text-text-default-1",
        "focus-within:outline-1 focus-within:outline-interactive-contained-primary-idle focus-within:outline-offset-1",
        ["hour", "dayPeriod"].includes(segment.type) && !timePickerOnly && "ml-1",
        hidePlaceholder && "opacity-0"
      ),
      children: /* @__PURE__ */ jsxs(Fragment, { children: [
        segment.isPlaceholder && /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": "true",
            className: "pointer-events-none",
            children: getPlaceholder(segment)
          }
        ),
        segment.isPlaceholder ? "" : segment.text
      ] })
    }
  );
};
export {
  DateSegmentItem,
  getPlaceholder
};
