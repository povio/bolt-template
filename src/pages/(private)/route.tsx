import { AuthGuard } from "@povio/ui/auth";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function PrivateLayout() {
  return (
    <AuthGuard type="private">
      <Outlet />
    </AuthGuard>
  );
}

export const Route = createFileRoute("/(private)")({
  component: PrivateLayout,
});
