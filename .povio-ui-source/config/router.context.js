import { jsx } from "react/jsx-runtime";
import { createContext, use } from "react";
import { RouterProvider } from "react-aria";
var UIRouter;
((UIRouter2) => {
  const UIRouterContext = createContext(null);
  UIRouter2.UIRouterProvider = ({
    children,
    pathname,
    push,
    query,
    replace
  }) => {
    const searchParams = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (Array.isArray(v)) {
        for (const item of v) {
          searchParams.append(k, item);
        }
      } else {
        searchParams.set(k, v);
      }
    }
    const value = {
      searchParams,
      pathname,
      push,
      query,
      replace
    };
    return /* @__PURE__ */ jsx(UIRouterContext, { value, children: /* @__PURE__ */ jsx(RouterProvider, { navigate: (href) => push(href), children }) });
  };
  UIRouter2.useUIRouter = () => {
    const context = use(UIRouterContext);
    if (!context) {
      throw new Error("useUIRouter must be used within a UIRouterContext");
    }
    return context;
  };
})(UIRouter || (UIRouter = {}));
export {
  UIRouter
};
