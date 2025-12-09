import { jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ViewIcon } from "../../../../assets/icons/View.js";
import { ViewOffIcon } from "../../../../assets/icons/ViewOff.js";
import { TextInput } from "../TextInput/TextInput.js";
import { ns } from "../../../../config/i18n.js";
const PasswordInput = (props) => {
  const { t } = useTranslation(ns);
  const [isRevealed, setIsRevealed] = useState(false);
  return /* @__PURE__ */ jsx(
    TextInput,
    {
      ...props,
      type: isRevealed ? "text" : "password",
      action: {
        icon: isRevealed ? ViewIcon : ViewOffIcon,
        altText: t(($) => isRevealed ? $.ui.password.hide : $.ui.password.reveal),
        onClick: () => setIsRevealed(!isRevealed)
      }
    }
  );
};
export {
  PasswordInput
};
