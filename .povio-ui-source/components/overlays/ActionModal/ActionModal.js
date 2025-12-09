import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Button } from "../../buttons/Button/Button.js";
import { Modal } from "../Modal/Modal.js";
import { Typography } from "../../text/Typography/Typography.js";
const textAlignClassMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
const ActionModal = ({
  heading,
  description,
  primaryAction,
  secondaryAction,
  buttonSize = "m",
  textAlign = "left",
  modalClassName,
  ...modalProps
}) => {
  const textAlignClass = textAlignClassMap[textAlign];
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      modalClassName: clsx("w-modal", modalClassName),
      ...modalProps,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-modal-gap-text", children: [
          /* @__PURE__ */ jsx(
            Typography,
            {
              size: "title-5",
              variant: "prominent-1",
              as: "h2",
              className: textAlignClass,
              children: heading
            }
          ),
          /* @__PURE__ */ jsx(
            Typography,
            {
              size: "body-3",
              className: textAlignClass,
              children: description
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-wrap gap-modal-gap-buttons pt-1", children: [
          secondaryAction && /* @__PURE__ */ jsx(
            Button,
            {
              variant: secondaryAction?.variant ?? "contained",
              size: buttonSize,
              color: secondaryAction?.color ?? "secondary",
              width: "fill",
              onPress: secondaryAction?.onPress,
              className: clsx("min-w-40 flex-1 shrink-0", secondaryAction?.className),
              children: secondaryAction?.label
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: primaryAction?.variant ?? "contained",
              size: buttonSize,
              color: primaryAction?.color ?? "primary",
              width: "fill",
              onPress: primaryAction.onPress,
              className: clsx("min-w-40 flex-1 shrink-0", primaryAction?.className),
              children: primaryAction.label
            }
          )
        ] })
      ]
    }
  );
};
export {
  ActionModal
};
