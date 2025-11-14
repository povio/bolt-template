import { AuthGuard } from "@povio/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return (
    <AuthGuard type="public-only">
      <Outlet />
    </AuthGuard>
  );
}

export const Route = createFileRoute("/(public-only)")({
  component: RouteComponent,
});
