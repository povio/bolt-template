import { jsx } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { Select } from "../../Selection/Select/Select.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { ns } from "../../../../config/i18n.js";
const TextStyleSelect = ({ editor }) => {
  const { t } = useTranslation(ns);
  const isHeadingEnabled = !!editor.extensionManager.extensions.find((extension) => extension.name === "heading");
  if (!isHeadingEnabled) {
    return null;
  }
  const getItem = (level) => {
    return {
      id: level,
      label: t(($) => $.ui.textEditor.textStyle[`heading${level}`]),
      content: /* @__PURE__ */ jsx(Typography, { size: `title-${level}`, children: t(($) => $.ui.textEditor.textStyle[`heading${level}`]) })
    };
  };
  const onChange = (val) => {
    if (!val) {
      const currentLevel = editor.getAttributes("heading")?.level;
      if (!currentLevel) {
        return;
      }
      editor.chain().focus().toggleHeading({ level: currentLevel }).run();
      return;
    }
    if (!editor.can().setHeading({ level: val })) {
      return;
    }
    editor.chain().focus().setHeading({ level: val }).run();
  };
  return /* @__PURE__ */ jsx(
    Select,
    {
      as: "inline",
      placeholder: t(($) => $.ui.textEditor.textStyle.label),
      label: t(($) => $.ui.textEditor.textStyle.label),
      hideLabel: true,
      ignoreTriggerWidth: true,
      onChange,
      items: [
        {
          id: 0,
          label: t(($) => $.ui.textEditor.textStyle.normal)
        },
        ...editor.can().toggleHeading({ level: 1 }) ? [getItem(1)] : [],
        ...editor.can().toggleHeading({ level: 2 }) ? [getItem(2)] : [],
        ...editor.can().toggleHeading({ level: 3 }) ? [getItem(3)] : [],
        ...editor.can().toggleHeading({ level: 4 }) ? [getItem(4)] : [],
        ...editor.can().toggleHeading({ level: 5 }) ? [getItem(5)] : [],
        ...editor.can().toggleHeading({ level: 6 }) ? [getItem(6)] : []
      ],
      value: editor.getAttributes("heading")?.level || 0,
      isDisabled: !editor.isEditable
    }
  );
};
export {
  TextStyleSelect
};
