import { createFileRoute } from '@tanstack/react-router';
import { Button, Confirmation, TextInput, Typography } from '@povio/ui';

function HomePage() {
  const { confirm } = Confirmation.useConfirmation();

  const handleClick = async () => {
    const confirmed = await confirm({
      heading: 'Confirmation',
      description: 'Are you sure you want to click this button?',
      confirmLabel: 'Yes',
      cancelLabel: 'No',
    });

    if (!confirmed) {
      return;
    }

    console.log('Confirmed');
  };

  return (
    <div className="p-20 flex flex-col gap-4 justify-center items-center">
      <Typography size="title-4" className="text-red-500">Hello World!</Typography>
      <Button onPress={handleClick}>Click me</Button>
      <TextInput label="Name" placeholder="Enter your name" />
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
