import { AuthGuard } from "@povio/ui";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

function PublicOnlyLayout() {
  return (
    <AuthGuard type="public-only">
      <Outlet />
    </AuthGuard>
  );
}

export const Route = createFileRoute("/(public-only)")({
  component: PublicOnlyLayout,
  beforeLoad: async ({ context }): Promise<void | ReturnType<typeof redirect>> => {
    const { auth } = context;

    if (!auth!.isAuthenticated) {
      return;
    }

    try {
      await auth!.userPromise!();

      return redirect({
        to: "/",
      });
    } catch {
      auth!.logout();
      // oxlint-disable-next-line only-throw-error
      throw redirect({
        to: "/login",
      });
    }
  },
});
