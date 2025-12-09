import { jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { z } from "zod";
import { InputItem } from "./InputItem.js";
import { getDefaultInputComponentType } from "../../../helpers/dynamicInputs.js";
import { StringUtils } from "../../../utils/string.utils.js";
import { ZodUtils } from "../../../utils/zod.utils.js";
const createFieldComponent = (field, schemaKeyType, form) => {
  return function FieldComponent({
    inputType,
    label,
    placeholder,
    ...inputProps
  }) {
    const name = field;
    const type = inputType ?? getDefaultInputComponentType(schemaKeyType);
    const unwrappedKeyType = ZodUtils.unwrapZodType(schemaKeyType);
    const defaultProps = unwrappedKeyType instanceof z.ZodArray ? { selectionMode: "multiple" } : {};
    const inputDef = {
      name,
      type,
      label,
      placeholder,
      props: { ...defaultProps, ...inputProps }
    };
    return /* @__PURE__ */ jsx(
      InputItem,
      {
        form,
        inputDef
      }
    );
  };
};
function Form({
  form,
  schema,
  onSubmit,
  onError,
  className,
  children
}) {
  const components = useMemo(() => {
    const fieldComponents = {};
    const fields = Object.keys(schema.shape);
    for (const field of fields) {
      const componentName = StringUtils.capitalize(String(field));
      const schemaKeyType = schema.shape[field];
      fieldComponents[componentName] = createFieldComponent(
        field,
        schemaKeyType,
        form
      );
    }
    return fieldComponents;
  }, [schema.shape, form]);
  return /* @__PURE__ */ jsx(
    "form",
    {
      onSubmit: form.handleSubmit(onSubmit, onError),
      className,
      children: children(components)
    }
  );
}
export {
  Form
};
