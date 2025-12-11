import { AuthGuard } from "@povio/ui/auth";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function PublicOnlyLayout() {
  return (
    <AuthGuard type="public-only">
      <Outlet />
    </AuthGuard>
  );
}

export const Route = createFileRoute("/(public-only)")({
  component: PublicOnlyLayout,
});
