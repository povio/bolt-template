import { jsx } from "react/jsx-runtime";
import { InputItem } from "./InputItem.js";
function Inputs({
  form,
  inputDefs,
  children
}) {
  if (!children) {
    return inputDefs.map((inputDef) => /* @__PURE__ */ jsx(
      InputItem,
      {
        form,
        inputDef
      },
      String(inputDef.name)
    ));
  }
  const childrenParams = {};
  for (const inputDef of inputDefs) {
    childrenParams[inputDef.name] = /* @__PURE__ */ jsx(
      InputItem,
      {
        form,
        inputDef
      }
    );
  }
  return children(childrenParams);
}
export {
  Inputs
};
