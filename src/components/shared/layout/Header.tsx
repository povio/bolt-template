import { AuthContext, Button } from "@povio/ui";
import { useNavigate } from "@tanstack/react-router";

export function Header() {
  const { isAuthenticated, logout } = AuthContext.useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-end gap-2 p-2">
      {isAuthenticated && (
        <Button
          width="hug"
          onPress={() => navigate({ to: "/profile" })}
        >
          Profile
        </Button>
      )}

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
          onPress={() => navigate({ to: "/login" })}
        >
          Login
        </Button>
      )}
    </header>
  );
}
