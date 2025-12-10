import { jsx } from "react/jsx-runtime";
import { createContext, use } from "react";
var LinkContext;
((LinkContext2) => {
  const LinkContextInternal = createContext(null);
  LinkContext2.LinkContextProvider = ({ children, LinkComponent }) => {
    const value = {
      LinkComponent
    };
    return /* @__PURE__ */ jsx(LinkContextInternal.Provider, { value, children });
  };
  LinkContext2.useLinkContext = () => {
    const context = use(LinkContextInternal);
    return context;
  };
})(LinkContext || (LinkContext = {}));
export {
  LinkContext
};
