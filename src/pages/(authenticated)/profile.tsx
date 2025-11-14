import { Typography } from "@povio/ui";
import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "@/hooks/useAuth";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <Typography
        as="p"
        size="body-1"
      >
        User ID: {user?.user?.id}
      </Typography>
      <Typography
        as="p"
        size="body-1"
      >
        Name: {user?.profile?.name}
      </Typography>
      <Typography
        as="p"
        size="body-1"
      >
        Email: {user?.profile?.email}
      </Typography>
      <Typography
        as="p"
        size="body-1"
      >
        Avatar URL: {user?.profile?.avatarUrl}
      </Typography>
    </div>
  );
}

export const Route = createFileRoute("/(authenticated)/profile")({
  component: ProfilePage,
});
