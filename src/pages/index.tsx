import { createFileRoute } from '@tanstack/react-router';
import { Button, TextInput, Typography } from '@povio/ui';

function HomePage() {
  return (
    <div className="p-20 flex flex-col gap-4 justify-center items-center">
      <Typography size="title-4" className="text-red-500">Hello World!</Typography>
      <Button>Click me</Button>
      <TextInput label="Name" placeholder="Enter your name" />
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
