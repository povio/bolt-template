import { AuthGuard } from "@povio/ui";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

function PrivateLayout() {
  return (
    <AuthGuard type="private">
      <Outlet />
    </AuthGuard>
  );
}

export const Route = createFileRoute("/(private)")({
  component: PrivateLayout,
  beforeLoad: async ({ context }): Promise<void | ReturnType<typeof redirect>> => {
    const { auth } = context;

    if (!auth!.isAuthenticated) {
      return redirect({
        to: "/login",
      });
    }

    try {
      await auth!.userPromise!();
    } catch {
      auth!.logout();
      return redirect({
        to: "/login",
      });
    }
  },
});
