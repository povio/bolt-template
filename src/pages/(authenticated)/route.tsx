import { AuthGuard } from "@povio/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return (
    <AuthGuard type="private">
      <Outlet />
    </AuthGuard>
  );
}
export const Route = createFileRoute("/(authenticated)")({
  component: RouteComponent,
});
