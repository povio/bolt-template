import { Typography } from "@povio/ui";
import { createFileRoute } from "@tanstack/react-router";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-20">
      <Typography
        as="h1"
        size="title-4"
      >
        Hello World!
      </Typography>
    </div>
  );
}

export const Route = createFileRoute("/(private)/")({
  component: HomePage,
});
