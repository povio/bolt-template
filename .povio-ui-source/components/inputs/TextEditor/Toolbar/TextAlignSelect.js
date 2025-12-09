import { jsx } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { AlignCenterIcon } from "../../../../assets/icons/AlignCenter.js";
import { AlignLeftIcon } from "../../../../assets/icons/AlignLeft.js";
import { AlignLeftRightIcon } from "../../../../assets/icons/AlignLeftRight.js";
import { AlignRightIcon } from "../../../../assets/icons/AlignRight.js";
import { Select } from "../../Selection/Select/Select.js";
import { ns } from "../../../../config/i18n.js";
const TextAlignSelect = ({ editor }) => {
  const { t } = useTranslation(ns);
  const isAlignEnabled = !!editor.extensionManager.extensions.find((extension) => extension.name === "textAlign");
  if (!isAlignEnabled) {
    return null;
  }
  const onChange = (val) => {
    if (val) {
      editor.chain().focus().setTextAlign(val).run();
    } else {
      editor.chain().focus().unsetTextAlign().run();
    }
  };
  const getItem = (id, Icon) => {
    return {
      id,
      label: t(($) => $.ui.textEditor.textAlign[id]),
      content: /* @__PURE__ */ jsx(Icon, { className: "size-6" }),
      isActive: editor.isActive({ textAlign: id }),
      can: editor.can().setTextAlign(id)
    };
  };
  const items = [
    getItem("left", AlignLeftIcon),
    getItem("center", AlignCenterIcon),
    getItem("right", AlignRightIcon),
    getItem("justify", AlignLeftRightIcon)
  ];
  const enabledItems = items.filter((item) => item.can);
  return /* @__PURE__ */ jsx(
    Select,
    {
      as: "inline",
      label: t(($) => $.ui.textEditor.textAlign.label),
      placeholder: t(($) => $.ui.textEditor.textAlign.label),
      hideLabel: true,
      ignoreTriggerWidth: true,
      showSelectionContent: true,
      onChange,
      items: enabledItems,
      value: enabledItems.find((item) => item.isActive)?.id || "left",
      isDisabled: !editor.isEditable
    }
  );
};
export {
  TextAlignSelect
};
