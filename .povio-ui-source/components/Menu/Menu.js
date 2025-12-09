import { jsx } from "react/jsx-runtime";
import { MenuDesktop } from "./MenuDesktop.js";
import { MenuMobile } from "./MenuMobile.js";
import { useBreakpoint } from "../../hooks/useBreakpoint.js";
const Menu = (props) => {
  const isDesktop = useBreakpoint("md");
  if (isDesktop) {
    return /* @__PURE__ */ jsx(MenuDesktop, { ...props });
  }
  return /* @__PURE__ */ jsx(MenuMobile, { ...props });
};
export {
  Menu
};
