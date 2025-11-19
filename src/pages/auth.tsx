import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import z from "zod";

import { LoadingState } from "@/components/shared/layout/LoadingState";
import { RouteConfig } from "@/config/route.config";
import { useAuth } from "@/hooks/useAuth";

const authSearchSchema = z.object({
  type: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = Route.useSearch();
  const { updateTokens } = useAuth();

  useEffect(() => {
    if (accessToken) {
      const decodedAccessToken = decodeURIComponent(accessToken);
      const decodedRefreshToken = refreshToken ? decodeURIComponent(refreshToken) : undefined;
      updateTokens?.(decodedAccessToken, decodedRefreshToken);

      navigate({ to: RouteConfig.home.to });
    } else {
      navigate({ to: RouteConfig.login.to });
    }
  }, [accessToken, refreshToken, navigate, updateTokens]);

  return <LoadingState />;
}

export const Route = createFileRoute("/auth")({
  component: AuthCallbackPage,
  validateSearch: authSearchSchema,
});
