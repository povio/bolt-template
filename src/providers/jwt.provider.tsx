import { AuthContext } from "@povio/ui";
import { useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useCallback, useEffect, useState } from "react";

import { LoadingState } from "@/components/shared/layout/LoadingState";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/config/jwt.config";
// Replace these if they are different on your backend
import { UserApi } from "@/openapi/user/user.api";
import type { UserModels } from "@/openapi/user/user.models";
import { UserQueries } from "@/openapi/user/user.queries";

export const JWTProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null | undefined>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    return null;
  });

  const user = queryClient.getQueryData<UserModels.UserMeResponse>(UserQueries.keys.get()) ?? null;
  const authenticated = !!accessToken;
  const isInitializing = accessToken === undefined;

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

  const logout = useCallback(() => {
    onAccessTokenChange(null);
    onRefreshTokenChange(null);
    queryClient.clear();
  }, [queryClient, onAccessTokenChange, onRefreshTokenChange]);

  const userPromise = async () => {
    try {
      const user = await UserApi.get();
      queryClient.setQueryData<UserModels.UserMeResponse>(UserQueries.keys.get(), user);
      return user;
    } catch {
      logout();
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    onAccessTokenChange(token);
  }, [onAccessTokenChange]);

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
      userPromise={userPromise}
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
