import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LinkIcon } from "../../../../assets/icons/Link.js";
import { Button } from "../../../buttons/Button/Button.js";
import { InlineIconButton } from "../../../buttons/InlineIconButton/InlineIconButton.js";
import { TextInput } from "../../Input/TextInput/TextInput.js";
import { ResponsivePopover } from "../../../overlays/ResponsivePopover/ResponsivePopover.js";
import { ns } from "../../../../config/i18n.js";
const HyperlinkAction = ({ editor }) => {
  const { t } = useTranslation(ns);
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const isLinkEnabled = !!editor.extensionManager.extensions.find((extension) => extension.name === "link");
  const linkHref = editor.getAttributes("link")?.href;
  useEffect(() => {
    setUrl(linkHref || "");
  }, [linkHref]);
  if (!isLinkEnabled) {
    return null;
  }
  const onRemove = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setIsOpen(false);
  };
  const onApply = () => {
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs(
    ResponsivePopover,
    {
      isOpen,
      onOpenChange: setIsOpen,
      sheetLabel: t(($) => $.ui.textEditor.link.label),
      trigger: /* @__PURE__ */ jsx(
        InlineIconButton,
        {
          color: "secondary",
          label: t(($) => $.ui.textEditor.link.label),
          icon: LinkIcon,
          className: clsx(editor.isActive("link") && "!text-interactive-text-primary-idle"),
          isDisabled: !editor.isEditable
        }
      ),
      children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            variant: "outlined",
            hideLabel: true,
            label: t(($) => $.ui.textEditor.link.urlLabel),
            placeholder: t(($) => $.ui.textEditor.link.urlPlaceholder),
            value: url,
            onChange: setUrl,
            className: "mb-4"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "contained",
              color: "secondary",
              size: "xs",
              width: "hug",
              onPress: onApply,
              isDisabled: !url,
              children: t(($) => $.ui.textEditor.link.apply)
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outlined",
              color: "secondary",
              size: "xs",
              width: "hug",
              onPress: onRemove,
              isDisabled: !editor.isActive("link"),
              children: t(($) => $.ui.textEditor.link.remove)
            }
          )
        ] })
      ]
    }
  );
};
export {
  HyperlinkAction
};
