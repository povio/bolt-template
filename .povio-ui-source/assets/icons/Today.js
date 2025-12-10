import { jsx } from "react/jsx-runtime";
const TodayIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    className: "fill-current",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        d: "M9.184 9.672v-.945h5.628v.945h-2.27V16H11.45V9.672z"
      }
    )
  }
);
export {
  TodayIcon
};
