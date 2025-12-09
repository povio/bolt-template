import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { BulletedListIcon } from "../../../../assets/icons/BulletedList.js";
import { NumberedListIcon } from "../../../../assets/icons/NumberedList.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { ns } from "../../../../config/i18n.js";
const TextListActions = ({ editor }) => {
  const { t } = useTranslation(ns);
  const actions = [
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "bulletList"),
      isEnabled: () => editor.isEditable && editor.can().toggleBulletList(),
      label: t(($) => $.ui.textEditor.marks.bold),
      icon: BulletedListIcon,
      onPress: () => {
        editor.chain().focus().toggleBulletList().run();
      },
      isActive: () => editor.isActive("bulletList")
    },
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "orderedList"),
      isEnabled: () => editor.isEditable && editor.can().toggleOrderedList(),
      label: t(($) => $.ui.textEditor.marks.italic),
      icon: NumberedListIcon,
      onPress: () => {
        editor.chain().focus().toggleOrderedList().run();
      },
      isActive: () => editor.isActive("orderedList")
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
  TextListActions
};
