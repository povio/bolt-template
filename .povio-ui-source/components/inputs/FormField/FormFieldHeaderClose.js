import { jsx } from "react/jsx-runtime";
import { Button } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../../assets/icons/Close.js";
import { ns } from "../../../config/i18n.js";
const FormFieldHeaderClose = ({ onClose }) => {
  const { t } = useTranslation(ns);
  return /* @__PURE__ */ jsx(
    Button,
    {
      onPress: onClose,
      "aria-label": t(($) => $.ui.closeAlt),
      className: "shrink-0 focus-visible:outline-interactive-text-secondary-focus",
      children: /* @__PURE__ */ jsx(CloseIcon, { className: "size-6 text-interactive-text-secondary-idle" })
    }
  );
};
export {
  FormFieldHeaderClose
};
