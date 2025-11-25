import { AuthContext } from "@povio/ui";
import { useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useCallback, useEffect, useState } from "react";

import { LoadingState } from "@/components/shared/layout/LoadingState";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/config/jwt.config";
// import { UserQueries } from "@/openapi/user/user.queries";

export const JWTProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null | undefined>(undefined);
  const queryClient = useQueryClient();

  const authenticated = !!accessToken;
  const isInitializing = accessToken === undefined;

  // const { data: user } = UserQueries.useGet({ enabled: authenticated });
  const user = null;

  const onAccessTokenChange = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    setAccessToken(token);
  }, []);

  const onRefreshTokenChange = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    onAccessTokenChange(token);
  }, [onAccessTokenChange]);

  const logout = useCallback(() => {
    onAccessTokenChange(null);
    onRefreshTokenChange(null);
    queryClient.clear();
  }, [onAccessTokenChange, onRefreshTokenChange, queryClient]);

  const updateTokens = useCallback(
    (accessToken: string | null, refreshToken?: string | null) => {
      if (accessToken !== null) {
        onAccessTokenChange(accessToken);
      }
      if (refreshToken !== null && refreshToken !== undefined) {
        onRefreshTokenChange(refreshToken);
      }
    },
    [onAccessTokenChange, onRefreshTokenChange],
  );

  return (
    <AuthContext.Provider
      isAuthenticated={authenticated}
      isInitializing={isInitializing}
      logout={logout}
      updateTokens={updateTokens}
      accessToken={accessToken}
      user={user}
      routes={{
        authenticated: "/",
        unauthenticated: "/login",
      }}
      loadingState={<LoadingState />}
    >
      {children}
    </AuthContext.Provider>
  );
};
