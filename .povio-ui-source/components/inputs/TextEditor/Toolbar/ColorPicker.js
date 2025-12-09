import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { ColorSwatchPicker, ColorSwatchPickerItem, ColorSwatch } from "react-aria-components";
const ColorPicker = ({ colors, value, onChange }) => {
  return /* @__PURE__ */ jsx(
    ColorSwatchPicker,
    {
      value,
      onChange: (color) => onChange(color.toString("hex")),
      className: "grid w-full grid-cols-[repeat(auto-fit,minmax(1rem,1fr))] gap-1",
      children: colors.map((color) => /* @__PURE__ */ jsx(
        ColorSwatchPickerItem,
        {
          color,
          className: "group",
          children: /* @__PURE__ */ jsx(
            ColorSwatch,
            {
              className: clsx(
                "size-4 rounded-xs border border-interactive-outlined-secondary-outline-idle border-solid",
                "group-selected:border-interactive-outlined-primary-outline-pressed group-selected:shadow-2",
                "cursor-pointer"
              )
            }
          )
        },
        color
      ))
    }
  );
};
export {
  ColorPicker
};
