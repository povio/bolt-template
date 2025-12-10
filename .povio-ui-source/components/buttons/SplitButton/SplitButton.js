import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { ChevronDownIcon } from "../../../assets/icons/ChevronDown.js";
import { Button } from "../Button/Button.js";
import { IconButton } from "../IconButton/IconButton.js";
import { Menu } from "../../Menu/Menu.js";
const SplitButton = ({
  variant,
  color,
  width,
  size,
  label,
  labelRight,
  link,
  items,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group/split flex items-center",
      "data-split": "",
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            ...props,
            width,
            size,
            variant,
            color,
            link,
            className: clsx("!rounded-r-none! border-r border-solid", className),
            "data-separator": "",
            children: label
          }
        ),
        /* @__PURE__ */ jsx(
          Menu,
          {
            trigger: /* @__PURE__ */ jsx(
              IconButton,
              {
                size,
                variant,
                color,
                label: labelRight,
                icon: ChevronDownIcon,
                className: "rounded-l-none! border-l-0!"
              }
            ),
            items
          }
        )
      ]
    }
  );
};
export {
  SplitButton
};
