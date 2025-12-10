import { jsxs, jsx } from "react/jsx-runtime";
const InfoIcon = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    className: "fill-current",
    ...props,
    children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M12 7.8a1 1 0 0 1 1 1V12a1 1 0 1 1-2 0V8.8a1 1 0 0 1 1-1M12 14.2a1 1 0 1 0 0 2h.008a1 1 0 1 0 0-2z"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          fillRule: "evenodd",
          d: "M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0m9-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14",
          clipRule: "evenodd"
        }
      )
    ]
  }
);
export {
  InfoIcon
};
