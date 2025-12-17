import { jsx } from "react/jsx-runtime";
import { createContext, useMemo, use } from "react";
var AuthContext;
((AuthContext2) => {
  const Context = createContext({});
  AuthContext2.Provider = ({
    isAuthenticated,
    isInitializing,
    logout,
    updateTokens,
    accessToken,
    user,
    userPromise,
    routes,
    loadingState,
    children
  }) => {
    const value = useMemo(
      () => ({
        isAuthenticated,
        isInitializing,
        logout,
        updateTokens,
        accessToken,
        user,
        userPromise,
        routes,
        loadingState
      }),
      [isAuthenticated, isInitializing, logout, updateTokens, accessToken, user, userPromise, routes, loadingState]
    );
    return /* @__PURE__ */ jsx(Context.Provider, { value, children });
  };
  AuthContext2.useAuth = () => {
    const auth = use(Context);
    return auth;
  };
})(AuthContext || (AuthContext = {}));
export {
  AuthContext
};
