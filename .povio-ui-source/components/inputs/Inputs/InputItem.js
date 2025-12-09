import { jsx } from "react/jsx-runtime";
import { Checkbox } from "../Checkbox/Checkbox.js";
import { DatePicker } from "../DateTime/DatePicker/DatePicker.js";
import { DateRangePicker } from "../DateTime/DateRangePicker/DateRangePicker.js";
import { DateTimePicker } from "../DateTime/DateTimePicker/DateTimePicker.js";
import { TimePicker } from "../DateTime/TimePicker/TimePicker.js";
import { NumberInput } from "../Input/NumberInput/NumberInput.js";
import { PasswordInput } from "../Input/PasswordInput/PasswordInput.js";
import { TextArea } from "../Input/TextArea/TextArea.js";
import { TextInput } from "../Input/TextInput/TextInput.js";
import { Autocomplete } from "../Selection/Autocomplete/Autocomplete.js";
import { QueryAutocomplete } from "../Selection/Autocomplete/QueryAutocomplete.js";
import { Select } from "../Selection/Select/Select.js";
import { Slider } from "../Slider/Slider.js";
import { TextEditor } from "../TextEditor/TextEditor.js";
import { Toggle } from "../Toggle/Toggle.js";
import { Segment } from "../../segment/Segment.js";
const componentRegistry = {
  toggle: Toggle,
  checkbox: Checkbox,
  numberInput: NumberInput,
  slider: Slider,
  textInput: TextInput,
  passwordInput: PasswordInput,
  textArea: TextArea,
  select: Select,
  autocomplete: Autocomplete,
  queryAutocomplete: QueryAutocomplete,
  segment: Segment,
  datePicker: DatePicker,
  dateTimePicker: DateTimePicker,
  timePicker: TimePicker,
  dateRangePicker: DateRangePicker,
  textEditor: TextEditor,
  unknown: null
};
function InputItem({ form, inputDef }) {
  const { name, label, placeholder, props, inputWrapper, render, type } = inputDef;
  const formControl = { control: form.control, name };
  if (render) {
    return render(formControl, form);
  }
  if (!type) {
    return null;
  }
  const Component = componentRegistry[type];
  const usesChildrenAsLabel = ["toggle", "checkbox"].includes(type);
  const inputProps = props ?? {};
  const inputComponent = /* @__PURE__ */ jsx(
    Component,
    {
      ...inputProps,
      label: usesChildrenAsLabel ? void 0 : label,
      placeholder,
      formControl,
      children: usesChildrenAsLabel ? label : void 0
    }
  );
  return inputWrapper ? inputWrapper(inputComponent, label) : inputComponent;
}
export {
  InputItem
};
