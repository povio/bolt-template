import { createFileRoute } from '@tanstack/react-router';

function HomePage() {
  return (
    <div className="p-20 flex justify-center items-center">
      <p className="text-3xl">Hello World!</p>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
