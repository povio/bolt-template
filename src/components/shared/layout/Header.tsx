import { AuthContext, Button } from "@povio/ui";
import { useNavigate } from "@tanstack/react-router";

import { RouteConfig } from "@/config/route.config";

export function Header() {
  const { isAuthenticated, logout } = AuthContext.useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-end gap-2 p-2">
      {isAuthenticated ? (
        <Button
          width="hug"
          onPress={() => logout()}
        >
          Logout
        </Button>
      ) : (
        <Button
          width="hug"
          onPress={() => navigate({ to: RouteConfig.login.to })}
        >
          Login
        </Button>
      )}
    </header>
  );
}
