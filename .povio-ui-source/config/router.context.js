import { jsx } from "react/jsx-runtime";
import { createContext, useMemo, use } from "react";
import { RouterProvider } from "react-aria";
var UIRouter;
((UIRouter2) => {
  const UIRouterContext = createContext(null);
  UIRouter2.UIRouterProvider = ({
    children,
    pathname,
    push,
    replace,
    searchString
  }) => {
    const searchParams = useMemo(() => {
      return new URLSearchParams(searchString);
    }, [searchString]);
    const value = useMemo(
      () => ({
        searchParams,
        pathname,
        push,
        searchString,
        replace
      }),
      [searchParams, pathname, push, searchString, replace]
    );
    return /* @__PURE__ */ jsx(UIRouterContext, { value, children: /* @__PURE__ */ jsx(RouterProvider, { navigate: push, children }) });
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
