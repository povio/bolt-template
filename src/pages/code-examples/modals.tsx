import { Button, Confirmation, Modal, Typography } from "@povio/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

function ModalsExamplesPage() {
  const { confirm } = Confirmation.useConfirmation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async () => {
    const confirmed = await confirm({
      heading: "Confirmation",
      description: "Are you sure you want to confirm?",
      buttonSize: "m",
      textAlign: "center",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
    });

    if (!confirmed) {
      console.log("Cancelled");
      return;
    }

    console.log("Confirmed");
  };

  return (
    <div className="flex flex-col gap-4 p-20">
      <Button onPress={() => setIsModalOpen(true)}>Open Modal</Button>
      <Button onPress={handleConfirm}>Open Confirmation</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showCloseIcon
      >
        <div className="flex w-[20rem] justify-center">
          <Typography
            as="p"
            size="body-1"
          >
            Modal content
          </Typography>
        </div>
      </Modal>
    </div>
  );
}

export const Route = createFileRoute("/code-examples/modals")({
  component: ModalsExamplesPage,
});
