import { jsx } from "react/jsx-runtime";
import { createContext, use } from "react";
var UIStyle;
((UIStyle2) => {
  const Context = createContext(null);
  UIStyle2.Provider = ({ children, config }) => {
    return /* @__PURE__ */ jsx(Context.Provider, { value: config, children });
  };
  UIStyle2.useConfig = () => {
    const context = use(Context);
    return context;
  };
})(UIStyle || (UIStyle = {}));
export {
  UIStyle
};
