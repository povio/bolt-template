import { TextArea, NumberInput, TextInput, useForm, Select, PasswordInput, Autocomplete, Slider, Checkbox, Toggle, RadioGroup, DatePicker, DateRangePicker, TimePicker, DateTimePicker, Segment, InputUpload, Button } from '@povio/ui';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

enum OptionEnum {
  Option1 = "option-1",
  Option2 = "option-2",
  Option3 = "option-3",
}

const FormSchema = z.object({
  input: z.string(),
  numberInput: z.number(),
  textArea: z.string(),
  password: z.string(),
  selectSingleMode: z.enum(OptionEnum),
  selectMultipleMode: z.array(z.enum(OptionEnum)),
  autocompleteSingleMode: z.enum(OptionEnum),
  autocompleteMultipleMode: z.array(z.enum(OptionEnum)),
  slider: z.number(),
  rangeSlider: z.array(z.number()),
  checkbox: z.boolean(),
  toggle: z.boolean(),
  radioGroup: z.enum(OptionEnum),
  date: z.string(),
  dateRange: z.object({ start: z.iso.datetime({ offset: true }).nullable(), end: z.iso.datetime().nullable() }),
  time: z.string(),
  dateTime: z.string(),
  textEditor: z.object({ html: z.string().optional(), json: z.record(z.string(), z.any()) }),
  segmentSingleMode: z.enum(OptionEnum),
  segmentMultipleMode: z.array(z.enum(OptionEnum)),
  inputUpload: z.array(z.instanceof(File)),
});
type FormType = z.infer<typeof FormSchema>;

const options = [
  { id: OptionEnum.Option1, label: "Option 1" },
  { id: OptionEnum.Option2, label: "Option 2" },
];

const segmentDualOptions = [
  { id: OptionEnum.Option1, label: "Option 1" },
  { id: OptionEnum.Option2, label: "Option 2" },
];

const segmentOptions = [
  { id: OptionEnum.Option1, label: "Option 1" },
  { id: OptionEnum.Option2, label: "Option 2" },
  { id: OptionEnum.Option3, label: "Option 3" },
];

function InputExamplesPage() {

  const { control, handleSubmit, reset } = useForm({
    zodSchema: FormSchema,
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-20 flex flex-col gap-4">
      <TextInput
        formControl={{ control, name: "input" }}
        label="Input label"
        placeholder="Input placeholder"
      />

      <NumberInput
        formControl={{ control, name: "numberInput" }}
        label="Number input label"
        placeholder="Number input placeholder"
      />

      <TextArea
        formControl={{ control, name: "textArea" }}
        label="TextArea label"
        placeholder="TextArea placeholder"
      />

      <PasswordInput
        formControl={{ control, name: "password" }}
        label="Password label"
        placeholder="Password placeholder"
      />

      <Select
        formControl={{ control, name: "selectSingleMode" }}
        label="Select single mode label"
        placeholder="Select option..."
        items={options}
      />

      <Select
        formControl={{ control, name: "selectMultipleMode" }}
        selectionMode="multiple"
        label="Select multiple mode label"
        placeholder="Select option..."
        items={options}
      />

      <Autocomplete
        formControl={{ control, name: "autocompleteSingleMode" }}
        label="Autocomplete single mode label"
        placeholder="Select option..."
        items={options}
      />

      <Autocomplete
        formControl={{ control, name: "autocompleteMultipleMode" }}
        selectionMode="multiple"
        label="Autocomplete multiple mode label"
        placeholder="Select option..."
        items={options}
      />

      <Slider
        formControl={{ control, name: "slider" }}
        label="Percentage"
        unit="%"
      />

      <Slider
        isRange
        formControl={{ control, name: "rangeSlider" }}
        label="Range"
        unit="%"
      />

      <Checkbox formControl={{ control, name: "checkbox" }}>Checkbox text</Checkbox>

      <Toggle formControl={{ control, name: "toggle" }}>Toggle text</Toggle>

      <RadioGroup
        formControl={{ control, name: "radioGroup" }}
        label="RadioGroup label"
        options={[
          { value: OptionEnum.Option1, label: "Option 1" },
          { value: OptionEnum.Option2, label: "Option 2" },
        ]}
      />

      <DatePicker
        formControl={{ control, name: "date" }}
        label="DatePicker label"
      />

      <DateRangePicker
        formControl={{ control, name: "dateRange" }}
        label="DateRangePicker label"
      />

      <TimePicker
        formControl={{ control, name: "time" }}
        label="TimePicker label"
      />

      <DateTimePicker
        formControl={{ control, name: "dateTime" }}
        label="DateTimePicker label"
      />

      <Segment
        formControl={{ control, name: "segmentSingleMode" }}
        items={segmentDualOptions}
      />

      <Segment
        formControl={{ control, name: "segmentMultipleMode" }}
        items={segmentOptions}
        selectionMode="multiple"
      />

      <InputUpload
        formControl={{ control, name: "inputUpload" }}
        allowsMultiple
        label="InputUpload label"
      />

      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button
          color="secondary"
          onPress={() => reset()}
        >
          Reset
        </Button>
      </div>
    </form>
  )
}

export const Route = createFileRoute('/code-examples/inputs')({
  component: InputExamplesPage,
})
