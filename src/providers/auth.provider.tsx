import { AuthContext } from "@povio/ui";
import type { User } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useCallback, useEffect, useState } from "react";

import { LoadingState } from "@/components/shared/layout/LoadingState";
import type { AuthModels } from "@/data/auth/auth.models";
import { isSupabaseConfigured } from "@/lib/supabase";

export interface AuthUser {
  user: User;
  profile: AuthModels.Profile;
}

interface MockProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface MockAuthUser {
  user: {
    id: string;
    email?: string;
    userMetadata?: Record<string, unknown>;
  } | null;
  profile: MockProfile | null;
}

const MOCK_USER: MockAuthUser = {
  user: {
    id: "mock-user-id",
    email: "demo@example.com",
    userMetadata: {},
  },
  profile: {
    id: "mock-user-id",
    email: "demo@example.com",
    name: "Demo User",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  },
};

const STORAGE_KEY = "mock_auth_state";
const queryKey = ["auth"];

function getMockAuthState(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

function setMockAuthState(isAuthenticated: boolean): void {
  if (typeof window === "undefined") return;
  if (isAuthenticated) {
    localStorage.setItem(STORAGE_KEY, "true");
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

async function fetchMockAuthState(): Promise<MockAuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const isAuthenticated = getMockAuthState();
  return isAuthenticated ? MOCK_USER : { user: null, profile: null };
}

export function useMockAuth() {
  const queryClient = useQueryClient();

  const login = useCallback(async () => {
    setMockAuthState(true);
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient]);

  const logout = useCallback(async () => {
    setMockAuthState(false);
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient]);

  return {
    login,
    logout,
    isConfigured: isSupabaseConfigured,
  };
}

export function SupabaseAuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [authReady, setAuthReady] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: fetchMockAuthState,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const authenticated = !!data?.user;
  const isInitializing = isLoading || !authReady;

  const user: MockAuthUser | undefined = data?.user
    ? {
        user: data.user,
        profile: data.profile,
      }
    : undefined;

  useEffect(() => {
    setAuthReady(true);
  }, []);

  const logout = useCallback(async () => {
    setMockAuthState(false);
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient]);

  return (
    <AuthContext.Provider
      isAuthenticated={authenticated}
      isInitializing={isInitializing}
      logout={logout}
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
}
