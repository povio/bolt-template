import { jsx } from "react/jsx-runtime";
import { createContextualCan } from "@casl/react";
import { AbilityContext } from "./ability.context.js";
const ContextualCan = createContextualCan(AbilityContext.Consumer);
const Can = ({ use, ...props }) => {
  const [action, subject] = use;
  return /* @__PURE__ */ jsx(
    ContextualCan,
    {
      ...props,
      do: action,
      on: subject
    }
  );
};
export {
  Can
};
