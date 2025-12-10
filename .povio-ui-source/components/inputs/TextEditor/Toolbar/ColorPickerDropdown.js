import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useState } from "react";
import { DialogTrigger, Button, Popover, Dialog } from "react-aria-components";
import { ArrowDropDownIcon } from "../../../../assets/icons/ArrowDropDown.js";
import { useInputCva } from "../../shared/input.cva.js";
import { ColorPicker } from "./ColorPicker.js";
import { Typography } from "../../../text/Typography/Typography.js";
const ColorPickerDropdown = ({ colors, value, onChange, isDisabled, children }) => {
  const inputCva = useInputCva();
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (color) => {
    onChange(color);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      isOpen,
      onOpenChange: setIsOpen,
      children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: inputCva({
              as: "inline",
              className: clsx("flex items-center justify-between gap-2")
            }),
            isDisabled,
            children: [
              /* @__PURE__ */ jsx(
                Typography,
                {
                  size: "label-1",
                  className: "truncate",
                  children
                }
              ),
              /* @__PURE__ */ jsx(
                ArrowDropDownIcon,
                {
                  className: clsx("size-6 shrink-0", isOpen && "rotate-180"),
                  "aria-hidden": "true"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Popover,
          {
            className: "my-4 w-40 outline-none",
            offset: 0,
            placement: "bottom start",
            children: /* @__PURE__ */ jsx(Dialog, { className: "outline-none", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "flex justify-center overflow-hidden p-2 shadow-5 outline-none",
                  "rounded-input-rounding-default border border-elevation-outline-default-1 bg-elevation-fill-default-1"
                ),
                children: /* @__PURE__ */ jsx(
                  ColorPicker,
                  {
                    colors,
                    value,
                    onChange: handleChange
                  }
                )
              }
            ) })
          }
        )
      ]
    }
  );
};
export {
  ColorPickerDropdown
};
