import { cva } from "class-variance-authority";
import { compoundMapper } from "../../../utils/compoundMapper.js";
const labelBase = cva("text-text-default-1", {
  variants: {
    as: {
      default: ["flex items-start gap-1"],
      filter: ["-translate-y-1/2 absolute top-1/2"],
      inline: ["flex items-start gap-1"],
      floating: [
        "pointer-events-none",
        "absolute transition-all duration-75",
        "-translate-y-1/2 top-1/2",
        "text-text-default-2 group-has-[input:disabled]/input-content:text-interactive-text-secondary-disabled",
        "group-disabled/date-picker-content:text-interactive-text-secondary-disabled",
        "group-disabled/text-editor:text-interactive-text-secondary-disabled",
        "group-has-[input:disabled]/select-content:text-interactive-text-secondary-disabled",
        "group-has-[textarea:disabled]/text-area:text-interactive-text-secondary-disabled",
        // TextArea default positioning
        "group-data-[text-area]/text-area:top-5 group-data-[text-area]/text-area:translate-y-0",
        // TextEditor default positioning
        "group-data-[text-editor]/text-editor:top-5 group-data-[text-editor]/text-editor:left-2 group-data-[text-editor]/text-editor:translate-y-0",
        // Text and Number Input
        "group-has-[input:not(:placeholder-shown)]/input-content:top-floating-label-input-height-filled group-has-[input:not(:placeholder-shown)]/input-content:translate-y-0",
        // TextArea
        "group-has-[textarea:not(:placeholder-shown)]/text-area:top-floating-label-input-height-filled group-has-[textarea:not(:placeholder-shown)]/text-area:translate-y-0",
        // TextEditor
        "group-data-[is-filled=true]/text-editor:top-floating-label-input-height-filled group-data-[is-filled=true]/text-editor:translate-y-0",
        // Date and Time Picker
        "group-data-[has-selection]/date-picker-content:top-1 group-data-[has-selection]/date-picker-content:translate-y-0",
        "group-focus-within/date-picker-content:top-1 group-focus-within/date-picker-content:translate-y-0",
        // Select and Autocomplete
        "group-data-[has-selection]/select-content:top-1 group-data-[has-selection]/select-content:translate-y-0",
        "group-data-[searchable-focus-within]/select-content:top-1 group-data-[searchable-focus-within]/select-content:translate-y-0",
        "group-data-[has-search]/select-content:top-1 group-data-[has-search]/select-content:translate-y-0",
        // Text and Number Input
        "group-has-[input:placeholder-shown]/input-content:text-text-default-3",
        "group-has-[input:placeholder-shown]/input-content:!font-medium",
        "group-has-[input:not(:placeholder-shown)]/input-content:!font-semibold",
        "group-has-[input:not(:placeholder-shown)]/input-content:!text-label-3",
        "group-has-[input:not(:placeholder-shown)]/input-content:text-text-default-1",
        // "group-focus-within/input-content:!text-text-default-1",
        // "group-focus-within/input-content:text-label-3",
        // "group-has-[input:focus-within]/input-content:!font-semibold",
        // TextArea
        "group-has-[textarea:placeholder-shown]/text-area:text-text-default-3",
        "group-has-[textarea:placeholder-shown]/text-area:!font-medium",
        "group-has-[textarea:not(placeholder-shown)]/text-area:!font-semibold",
        "group-has-[textarea:not(:placeholder-shown)]/text-area:!text-label-3",
        "group-has-[textarea:not(placeholder-shown)]/text-area:text-text-default-1",
        "group-focus-within/text-area:!text-text-default-1",
        "group-focus-within/text-area:text-label-3",
        "group-has-[textarea:focus-within]/text-area:!font-semibold",
        // TextEditor
        "group-has-[data-text-editor:placeholder-shown]/text-editor:text-text-default-3",
        "group-has-[data-text-editor:placeholder-shown]/text-editor:!font-medium",
        "group-data-[is-filled=true]/text-editor:!font-semibold",
        "group-data-[is-filled=true]/text-editor:!text-label-3",
        "group-data-[is-filled=true]/text-editor:text-text-default-1",
        "group-focus-within/text-editor:!text-text-default-1",
        "group-focus-within/text-editor:text-label-3",
        "group-has-[data-text-editor:focus-within]/text-editor:!font-semibold",
        // DatePicker, TimePicker focus-within
        "group-data-[has-selection]/date-picker-content:!font-semibold",
        "group-data-[has-selection]/date-picker-content:!text-label-3",
        "group-data-[has-selection]/date-picker-content:text-text-default-1",
        "group-focus-within/date-picker-content:!font-semibold",
        "group-focus-within/date-picker-content:!text-label-3",
        "group-focus-within/date-picker-content:text-text-default-1",
        // Select focused state
        "group-data-[has-selection]/select-content:!font-semibold",
        "group-data-[has-selection]/select-content:!text-label-3",
        "group-data-[has-selection]/select-content:text-text-default-1",
        "group-data-[searchable-focus-within]/select-content:!font-semibold",
        "group-data-[searchable-focus-within]/select-content:!text-label-3",
        "group-data-[searchable-focus-within]/select-content:text-text-default-1",
        "group-data-[has-search]/select-content:!font-semibold",
        "group-data-[has-search]/select-content:!text-label-3",
        "group-data-[has-search]/select-content:text-text-default-1"
      ]
    }
  },
  defaultVariants: {
    as: "default"
  }
});
const labelTypography = compoundMapper({
  compoundVariants: [
    {
      as: "default",
      value: {
        size: "label-2",
        variant: "prominent-1"
      }
    },
    {
      as: "filter",
      value: {
        size: "label-1",
        variant: "default"
      }
    },
    {
      as: "inline",
      value: {
        size: "label-2",
        variant: "prominent-1"
      }
    },
    {
      as: "floating",
      value: {
        size: "label-1",
        variant: "default"
      }
    }
  ],
  default: {
    size: "label-2",
    variant: "prominent-1"
  },
  defaultVariants: {
    as: "default"
  }
});
export {
  labelBase,
  labelTypography
};
