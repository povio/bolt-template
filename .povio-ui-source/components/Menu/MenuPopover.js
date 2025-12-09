import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Popover, Menu, SubmenuTrigger } from "react-aria-components";
import { MenuItem } from "./MenuItem.js";
const MenuPopover = ({ items, ...props }) => {
  return /* @__PURE__ */ jsx(
    Popover,
    {
      ...props,
      className: clsx("outline-none", props.className),
      children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-list-rounding-dropdown border border-elevation-outline-default-1 shadow-5 outline-none", children: /* @__PURE__ */ jsx(Menu, { className: "outline-none", children: items.map(
        (item, index) => !item.children || item.children.length === 0 ? /* @__PURE__ */ jsx(
          MenuItem,
          {
            ...item
          },
          index
        ) : (
          // oxlint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ jsxs(SubmenuTrigger, { children: [
            /* @__PURE__ */ jsx(MenuItem, { ...item }),
            /* @__PURE__ */ jsx(
              MenuPopover,
              {
                offset: 0,
                className: "pl-2",
                items: item.children
              }
            )
          ] }, index)
        )
      ) }) })
    }
  );
};
export {
  MenuPopover
};
