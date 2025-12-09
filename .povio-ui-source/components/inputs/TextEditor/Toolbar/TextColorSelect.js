import { jsx } from "react/jsx-runtime";
import { TextColorIcon } from "../../../../assets/icons/TextColor.js";
import { ColorPickerDropdown } from "./ColorPickerDropdown.js";
import { defaultColors } from "../textEditor.types.js";
const TextColorSelect = ({ editor }) => {
  const isColorEnabled = editor.extensionManager.extensions.some((extension) => extension.name === "color");
  if (!isColorEnabled) {
    return null;
  }
  const onChange = (color) => {
    editor.chain().focus().setColor(color).run();
  };
  const textColor = editor.getAttributes("textStyle").color || "#000000";
  return /* @__PURE__ */ jsx(
    ColorPickerDropdown,
    {
      value: textColor,
      onChange,
      colors: defaultColors,
      isDisabled: !editor.isEditable,
      children: /* @__PURE__ */ jsx(
        TextColorIcon,
        {
          className: "size-6",
          textColor
        }
      )
    }
  );
};
export {
  TextColorSelect
};
