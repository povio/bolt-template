import { createFileRoute } from '@tanstack/react-router';
import { Button, Confirmation, InfoIcon, TextInput, Typography, useToast } from '@povio/ui';
import { RouteConfig } from '@/config/route.config';

function HomePage() {
  const { confirm } = Confirmation.useConfirmation();
  const { successToast } = useToast();

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

    successToast({
      text: 'Button pressed and confirmed',
    });
  };

  return (
    <div className="p-20 flex flex-col gap-4 justify-center items-center">
      <Typography size="title-4" className="text-red-500">Hello World!</Typography>
      <Button width="hug" onPress={handleClick}>Click me</Button>
      <TextInput label="Name" placeholder="Enter your name" />
      <Button link={{ href: RouteConfig.about.to }} icon={InfoIcon}>To about page</Button>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
