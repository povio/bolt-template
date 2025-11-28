import { AuthContext } from "@povio/ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useCallback, useEffect, useState } from "react";

import { LoadingState } from "@/components/shared/layout/LoadingState";

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
  };
  profile: MockProfile;
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
const AUTH_SESSION_QUERY_KEY = ["auth", "session"];
const AUTH_USER_QUERY_KEY = ["auth", "user"];

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

// Mock function to check session state
// Bolt AI should replace this with actual Supabase session check (e.g., supabase.auth.getSession())
async function checkMockSession(): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return getMockAuthState();
}

// Mock function to simulate fetching user data from Supabase
// Bolt AI should replace this with actual Supabase auth logic (e.g., supabase.auth.getUser())
async function fetchMockUser(): Promise<MockAuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_USER;
}

// Remove this when removing mock auth implementation
export function useMockAuth() {
  const queryClient = useQueryClient();

  const login = useCallback(async () => {
    setMockAuthState(true);
    // Invalidate session query to trigger provider update and refetch user data
    await queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
  }, [queryClient]);

  return {
    login,
  };
}

export function SupabaseAuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [authReady, setAuthReady] = useState(false);

  // Query to check session state - Bolt AI should replace with supabase.auth.getSession()
  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: checkMockSession,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  const user = queryClient.getQueryData<MockAuthUser>(AUTH_USER_QUERY_KEY) ?? null;
  const authenticated = !!isAuthenticated;
  const isInitializing = isLoading || !authReady;

  const logout = useCallback(async () => {
    // Bolt AI should replace this with await supabase.auth.signOut()
    setMockAuthState(false);
    queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
  }, [queryClient]);

  // Mock userPromise - Bolt AI should replace this with actual Supabase user fetching
  const userPromise = async () => {
    try {
      const userData = await fetchMockUser();
      queryClient.setQueryData<MockAuthUser>(AUTH_USER_QUERY_KEY, userData);
      return userData;
    } catch {
      logout();
      return null;
    }
  };

  useEffect(() => {
    setAuthReady(true);

    // Mock auth state change listener
    // Bolt AI should replace this with supabase.auth.onAuthStateChange()
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [queryClient]);

  return (
    <AuthContext.Provider
      isAuthenticated={authenticated}
      isInitializing={isInitializing}
      logout={logout}
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
}
