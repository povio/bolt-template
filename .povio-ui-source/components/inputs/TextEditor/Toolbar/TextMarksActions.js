import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { BoldIcon } from "../../../../assets/icons/Bold.js";
import { ItalicIcon } from "../../../../assets/icons/Italic.js";
import { StrikethroughIcon } from "../../../../assets/icons/Strikethrough.js";
import { UnderlinedIcon } from "../../../../assets/icons/Underlined.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { ns } from "../../../../config/i18n.js";
const TextMarksActions = ({ editor }) => {
  const { t } = useTranslation(ns);
  const actions = [
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "bold"),
      isEnabled: () => editor.isEditable && editor.can().toggleBold(),
      label: t(($) => $.ui.textEditor.marks.bold),
      icon: BoldIcon,
      onPress: () => {
        editor.chain().focus().toggleBold().run();
      },
      isActive: () => editor.isActive("bold")
    },
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "italic"),
      isEnabled: () => editor.isEditable && editor.can().toggleItalic(),
      label: t(($) => $.ui.textEditor.marks.italic),
      icon: ItalicIcon,
      onPress: () => {
        editor.chain().focus().toggleItalic().run();
      },
      isActive: () => editor.isActive("italic")
    },
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "strike"),
      isEnabled: () => editor.isEditable && editor.can().toggleStrike(),
      label: t(($) => $.ui.textEditor.marks.strikethrough),
      icon: StrikethroughIcon,
      onPress: () => {
        editor.chain().focus().toggleStrike().run();
      },
      isActive: () => editor.isActive("strike")
    },
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "underline"),
      isEnabled: () => editor.isEditable && editor.can().toggleUnderline(),
      label: t(($) => $.ui.textEditor.marks.underline),
      icon: UnderlinedIcon,
      onPress: () => {
        editor.chain().focus().toggleUnderline().run();
      },
      isActive: () => editor.isActive("underline")
    }
  ];
  const enabledActions = actions.filter((action) => action.can);
  if (enabledActions.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "flex h-full items-center gap-3", children: enabledActions.map((action) => /* @__PURE__ */ jsx(
    InlineIconButton,
    {
      color: "secondary",
      label: action.label,
      onPress: action.onPress,
      icon: action.icon,
      isDisabled: !action.isEnabled(),
      className: clsx(action.isActive() && "!text-interactive-text-primary-idle")
    },
    action.label
  )) });
};
export {
  TextMarksActions
};
