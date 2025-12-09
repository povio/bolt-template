import { jsxs, jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { Typography } from "../../../text/Typography/Typography.js";
const ProgressBar = ({ progress = 0, valueLabel = "trailing" }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex w-full items-center justify-center gap-file-upload-content-gap-progress-actions",
        valueLabel === "leading" && "flex-row-reverse"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-fill flex-col items-start gap-2 py-progress-height-height", children: /* @__PURE__ */ jsxs("div", { className: "relative h-1 w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1 w-full shrink-0 rounded-xs bg-input-filled-idle" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-0 left-0 h-1 shrink-0 rounded-xs bg-interactive-contained-primary-idle transition-all duration-300",
              style: { width: `${progress}%` }
            }
          )
        ] }) }),
        valueLabel !== "none" && /* @__PURE__ */ jsxs(
          Typography,
          {
            variant: "default",
            size: "label-2",
            as: "span",
            className: "text-center text-text-default-3",
            children: [
              progress,
              "%"
            ]
          }
        )
      ]
    }
  );
};
export {
  ProgressBar
};
