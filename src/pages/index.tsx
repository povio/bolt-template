import { createFileRoute, Link } from '@tanstack/react-router';
import { Typography } from '@povio/ui';
import { RouteConfig } from '@/config/route.config';

function HomePage() {
  return (
    <div className="p-20 flex flex-col gap-10 justify-center items-center">
      <Typography as="h1" size="title-4">Hello World!</Typography>

      <Link to={RouteConfig.about.to}>About</Link>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
