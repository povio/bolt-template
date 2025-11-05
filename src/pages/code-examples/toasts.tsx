import { Button, CheckIcon, useToast } from '@povio/ui'
import { createFileRoute } from '@tanstack/react-router'

function ToastsExamplesPage() {
  const { successToast, errorToast, warningToast, neutralToast } = useToast();

  const handleSuccessToast = () => {
    successToast({ text: 'Success', icon: CheckIcon, variant: 'contained' });
  }

  const handleErrorToast = () => {
    errorToast({ text: 'Error', position: 'bottom-left' });
  }

  const handleWarningToast = () => {
    warningToast({ text: 'Warning', isLoading: true });
  }

  const handleNeutralToast = () => {
    neutralToast({ text: 'Info', actions: [{ text: 'Action', onPress: () => console.log('Action pressed') }] });
  }
  
  return (
    <div className="p-20 flex gap-4">
      <Button onPress={handleSuccessToast} color="success">Success</Button>
      <Button onPress={handleErrorToast} color="error">Error</Button>
      <Button onPress={handleWarningToast} color="warning">Warning</Button>
      <Button onPress={handleNeutralToast} color="secondary">Neutral</Button>
    </div>
  );
}

export const Route = createFileRoute('/code-examples/toasts')({
  component: ToastsExamplesPage,
});
