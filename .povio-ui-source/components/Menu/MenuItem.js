import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { MenuItem as MenuItem$1 } from "react-aria-components";
import { ArrowRightIcon } from "../../assets/icons/ArrowRight.js";
const MenuItem = ({ label, content, children, ...item }) => {
  const hasSubmenu = !!children && children?.length > 0;
  return /* @__PURE__ */ jsxs(
    MenuItem$1,
    {
      ...item,
      textValue: label,
      "aria-label": label,
      className: clsx(menuItemClass, item.className),
      children: [
        content ?? label,
        hasSubmenu && /* @__PURE__ */ jsx(ArrowRightIcon, { className: "size-6" })
      ]
    }
  );
};
const menuItemClass = clsx(
  "flex cursor-pointer items-center justify-between gap-list-gap-checkbox-to-label px-list-side-item py-list-height-item",
  "border-b border-b-elevation-outline-default-1 outline-none last:border-b-0",
  "bg-elevation-fill-default-1 text-interactive-text-secondary-idle",
  "disabled:cursor-default disabled:text-interactive-text-secondary-disabled",
  "hover:bg-elevation-fill-default-1 hover:text-interactive-text-secondary-hover",
  "open:bg-interactive-contained-primary-idle open:text-interactive-contained-primary-on-idle",
  "open:hover:bg-interactive-contained-primary-hover open:hover:text-interactive-contained-primary-on-hover",
  "focus-visible:bg-elevation-fill-default-1 focus-visible:text-interactive-text-secondary-hover"
);
export {
  MenuItem,
  menuItemClass
};
