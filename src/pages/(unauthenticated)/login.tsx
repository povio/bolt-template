import { Button } from "@povio/ui";
import { createFileRoute } from "@tanstack/react-router";

import { useMockAuth } from "@/providers/auth.provider";

function RouteComponent() {
  const { login } = useMockAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Button
        width="hug"
        onPress={login}
      >
        Mock Login
      </Button>
    </div>
  );
}

export const Route = createFileRoute("/(unauthenticated)/login")({
  component: RouteComponent,
});
