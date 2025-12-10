import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { TextButton } from "../../../buttons/TextButton/TextButton.js";
import { ns } from "../../../../config/i18n.js";
const DateTimeDialogFooter = ({ isValid = true, onTodayPress, onApply }) => {
  const { t } = useTranslation(ns);
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: clsx(
        "flex shrink-0 items-center gap-2 bg-elevation-fill-default-2 px-4 py-3 md:border-elevation-outline-default-1 md:border-t md:bg-elevation-fill-default-1 md:py-1-5",
        onTodayPress ? "justify-between" : "justify-end"
      ),
      children: [
        onTodayPress && /* @__PURE__ */ jsx(
          TextButton,
          {
            type: "button",
            color: "primary",
            onPress: onTodayPress,
            children: t(($) => $.ui.datePicker.today)
          }
        ),
        /* @__PURE__ */ jsx(
          TextButton,
          {
            type: "button",
            color: "secondary",
            onPress: onApply,
            isDisabled: !isValid,
            children: t(($) => $.ui.datePicker.save)
          }
        )
      ]
    }
  );
};
export {
  DateTimeDialogFooter
};
