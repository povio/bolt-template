import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../../assets/icons/Close.js";
import { InlineIconButton } from "../../buttons/InlineIconButton/InlineIconButton.js";
import { ns } from "../../../config/i18n.js";
const InputClear = ({ onClear, className, style }) => {
  const { t } = useTranslation(ns);
  return /* @__PURE__ */ jsx(
    InlineIconButton,
    {
      color: "secondary",
      className: clsx(
        "group-hover/date-picker-content:flex! group-hover/select-content:flex! hidden! items-center group-focus-within:flex group-hover:flex",
        className
      ),
      label: t(($) => $.ui.clearAlt),
      icon: CloseIcon,
      onPress: onClear,
      excludeFromTabOrder: true,
      style
    }
  );
};
export {
  InputClear
};
