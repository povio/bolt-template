import { Button, Typography } from "@povio/ui";
import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "@/hooks/useAuth";

function HomePage() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-20">
      <Typography
        as="h1"
        size="title-4"
      >
        Hello World!
      </Typography>

      {isAuthenticated && (
        <Button
          width="hug"
          onPress={logout}
        >
          Logout
        </Button>
      )}
    </div>
  );
}

export const Route = createFileRoute("/(private)/")({
  component: HomePage,
});
