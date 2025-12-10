import { jsx } from "react/jsx-runtime";
import { HighlightOnIcon } from "../../../../assets/icons/HighlightOn.js";
import { ColorPickerDropdown } from "./ColorPickerDropdown.js";
import { defaultColors } from "../textEditor.types.js";
const TextHighlightSelect = ({ editor }) => {
  const isHighlightEnabled = editor.extensionManager.extensions.some((extension) => extension.name === "highlight");
  if (!isHighlightEnabled) {
    return null;
  }
  const onChange = (color) => {
    if (color === "#FFFFFF") {
      editor.chain().focus().unsetHighlight().run();
    } else {
      editor.chain().focus().setHighlight({ color }).run();
    }
  };
  const highlightColor = editor.getAttributes("highlight").color || "#FFFFFF";
  return /* @__PURE__ */ jsx(
    ColorPickerDropdown,
    {
      value: highlightColor,
      onChange,
      colors: defaultColors,
      isDisabled: !editor.isEditable,
      children: /* @__PURE__ */ jsx(
        HighlightOnIcon,
        {
          className: "size-6",
          highlightColor
        }
      )
    }
  );
};
export {
  TextHighlightSelect
};
