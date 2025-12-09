import { useState, useEffect } from "react";
import { UIRouter } from "../../../config/router.context.js";
import { AuthContext } from "./auth.context.js";
const AuthGuard = ({ type, redirectTo, children }) => {
  const { isAuthenticated, routes, loadingState } = AuthContext.useAuth();
  const { replace } = UIRouter.useUIRouter();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return loadingState;
  }
  if (type === "private" && !isAuthenticated) {
    replace(redirectTo || routes?.unauthenticated || "/");
    return null;
  }
  if (type === "public-only" && isAuthenticated) {
    replace(redirectTo || routes?.authenticated || "/");
    return null;
  }
  return children;
};
export {
  AuthGuard
};
