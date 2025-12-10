import { jsx } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { Controller } from "react-hook-form";
import { SelectBase } from "../shared/SelectBase.js";
const Select = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          SelectBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(SelectBase, { ...props });
};
export {
  Select
};
