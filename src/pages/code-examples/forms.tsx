import { TextInput, NumberInput, Select, Button, useForm, useFormAutosave, Typography } from '@povio/ui';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { useState } from 'react';

const optionEnum = z.enum(["ONE", "TWO", "THREE"]);
const OptionEnum = optionEnum.enum;

const RegularFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.number().min(18, "Must be at least 18"),
  country: optionEnum,
});
type RegularFormType = z.infer<typeof RegularFormSchema>;

const AutosaveFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: optionEnum,
});
type AutosaveFormType = z.infer<typeof AutosaveFormSchema>;

const countryOptions = [
  { id: OptionEnum.ONE, label: "United States" },
  { id: OptionEnum.TWO, label: "Canada" },
  { id: OptionEnum.THREE, label: "United Kingdom" },
];

const priorityOptions = [
  { id: OptionEnum.ONE, label: "Low" },
  { id: OptionEnum.TWO, label: "Medium" },
  { id: OptionEnum.THREE, label: "High" },
];

function RegularFormExample() {
  const [submittedData, setSubmittedData] = useState<RegularFormType | null>(null);

  const { control, handleSubmit, reset } = useForm({
    zodSchema: RegularFormSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      country: OptionEnum.ONE,
    }
  });

  const onSubmit = (data: RegularFormType) => {
    console.log("Regular form submitted:", data);
    setSubmittedData(data);
  };

  return (
    <section className="flex flex-col gap-4">
      <Typography as="h2" size="title-3">Regular Form</Typography>
      <Typography as="p" size="body-2" className="text-content-secondary">
        A traditional form that submits data when the user clicks the submit button. Uses <code>useForm</code> hook.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
        <TextInput
          formControl={{ control, name: "firstName" }}
          label="First Name"
          placeholder="Enter your first name"
        />

        <TextInput
          formControl={{ control, name: "lastName" }}
          label="Last Name"
          placeholder="Enter your last name"
        />

        <NumberInput
          formControl={{ control, name: "age" }}
          label="Age"
          placeholder="Enter your age"
          minValue={0}
          maxValue={120}
        />

        <Select
          formControl={{ control, name: "country" }}
          label="Country"
          placeholder="Select a country..."
          items={countryOptions}
        />

        <div className="flex gap-4">
          <Button type="submit">Submit</Button>
          <Button
            color="secondary"
            onPress={() => {
              reset();
              setSubmittedData(null);
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      {submittedData && (
        <div className="mt-4 p-4 bg-elevation-fill-default-2 rounded-lg max-w-md">
          <Typography as="h3" size="title-5" className="mb-2">Submitted Data:</Typography>
          <pre className="text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

function AutosaveFormExample() {
  const [autosaveData, setAutosaveData] = useState<AutosaveFormType | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const { control } = useFormAutosave({
    zodSchema: AutosaveFormSchema,
    getResetValues: () => ({
      title: "",
      description: "",
      priority: OptionEnum.TWO,
    }),
    resetDeps: [],
    onAutosave: async (data: Partial<AutosaveFormType>) => {
      console.log("Autosave triggered:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setAutosaveData(data as AutosaveFormType);
      setLastSavedAt(new Date());
    },
    autosaveDelay: 1000, // Wait 1 second after user stops typing before saving
  });

  return (
    <section className="flex flex-col gap-4">
      <Typography as="h2" size="title-3">Autosave Form</Typography>
      <Typography as="p" size="body-2" className="text-content-secondary">
        A form that automatically saves data as the user types. Uses <code>useFormAutosave</code> hook with debouncing to avoid excessive API calls.
      </Typography>

      <form className="flex flex-col gap-4 max-w-md">
        <TextInput
          formControl={{ control, name: "title" }}
          label="Title"
          placeholder="Enter a title"
        />

        <TextInput
          formControl={{ control, name: "description" }}
          label="Description"
          placeholder="Enter a description (optional)"
        />

        <Select
          formControl={{ control, name: "priority" }}
          label="Priority"
          placeholder="Select priority..."
          items={priorityOptions}
        />

        {lastSavedAt && (
          <Typography as="p" size="body-3" className="text-content-secondary">
            Last saved at: {lastSavedAt.toLocaleTimeString()}
          </Typography>
        )}
      </form>

      {autosaveData && (
        <div className="mt-4 p-4 bg-elevation-fill-default-2 rounded-lg max-w-md">
          <Typography as="h3" size="title-5" className="mb-2">Autosaved Data:</Typography>
          <pre className="text-sm">{JSON.stringify(autosaveData, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

function FormsExamplesPage() {
  return (
    <div className="p-20 flex flex-col gap-8">
      <RegularFormExample />
      <div className="border-t border-elevation-stroke-default" />
      <AutosaveFormExample />
    </div>
  )
}

export const Route = createFileRoute('/code-examples/forms')({
  component: FormsExamplesPage,
})
