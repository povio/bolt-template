import i18next from "i18next";
import { z } from "zod";
import { StringUtils } from "../utils/string.utils.js";
import { ZodUtils } from "../utils/zod.utils.js";
const defaultComponentTypes = {
  datetime: "datePicker",
  dateRange: "dateRangePicker",
  textEditor: "textEditor",
  boolean: "toggle",
  number: "numberInput",
  enum: "select",
  string: "textInput",
  email: "textInput",
  object: "unknown",
  array: "select",
  uuid: "select",
  unknown: "unknown"
};
const ZOD_TYPE_COMPONENT_TYPE = [
  [z.ZodBoolean, defaultComponentTypes.boolean],
  [z.ZodNumber, defaultComponentTypes.number],
  [z.ZodEnum, defaultComponentTypes.enum],
  [z.ZodISODateTime, defaultComponentTypes.datetime],
  [z.ZodString, defaultComponentTypes.string],
  [z.ZodEmail, defaultComponentTypes.email],
  [z.ZodObject, defaultComponentTypes.object],
  [z.ZodArray, defaultComponentTypes.array],
  [z.ZodUUID, defaultComponentTypes.uuid]
];
const DEFAULT_NAMESPACE = "dynamicInputs";
const sortInputDefs = (inputDefs, orderKeys) => {
  if (!orderKeys) {
    return inputDefs;
  }
  return inputDefs.sort((a, b) => {
    const orderMap = new Map(orderKeys.map((key, index) => [key, index]));
    const orderA = orderMap.get(a.name);
    const orderB = orderMap.get(b.name);
    if (orderA !== void 0 && orderB !== void 0) {
      return orderA - orderB;
    }
    if (orderA !== void 0 && orderB === void 0) {
      return -1;
    }
    if (orderA === void 0 && orderB !== void 0) {
      return 1;
    }
    return 0;
  });
};
const excludeEntries = (entries) => {
  return entries.filter(([, value]) => value !== false && value !== void 0);
};
const inputConfigToObjectDefinition = (value) => {
  if (typeof value === "object") {
    return value;
  }
  if (typeof value === "function") {
    return { render: value };
  }
  return {};
};
const convertInputsConfigToObjectDefinitions = (entries) => {
  return entries.map(([key, value]) => {
    const k = key;
    return [k, inputConfigToObjectDefinition(value)];
  });
};
const getDefaultInputComponentType = (schemaType) => {
  if (ZodUtils.isDateRange(schemaType)) {
    return defaultComponentTypes.dateRange;
  }
  if (ZodUtils.isTextEditor(schemaType)) {
    return defaultComponentTypes.textEditor;
  }
  const unwrappedType = ZodUtils.unwrapZodType(schemaType);
  const componentType = ZOD_TYPE_COMPONENT_TYPE.find(([zodType]) => unwrappedType instanceof zodType)?.[1];
  if (componentType) {
    return componentType;
  }
  return defaultComponentTypes.unknown;
};
const getDefaultSelectionItems = (keyType) => {
  const unwrappedType = ZodUtils.unwrapZodType(keyType instanceof z.ZodArray ? keyType.element : keyType);
  if (unwrappedType instanceof z.ZodEnum) {
    return Object.values(unwrappedType.options).filter((value) => typeof value === "string").map((value) => ({ id: value, label: StringUtils.capitalize(value) }));
  }
  return [];
};
const getDefaultSelectionMode = (keyType) => {
  return keyType instanceof z.ZodArray ? "multiple" : "single";
};
const getDefaultProps = (componentType, keyType) => {
  const props = {};
  const unwrappedType = ZodUtils.unwrapZodType(keyType);
  if (["select", "autocomplete", "segment"].includes(componentType)) {
    props.items = getDefaultSelectionItems(unwrappedType);
  }
  if (["select", "autocomplete", "queryAutocomplete", "segment"].includes(componentType)) {
    props.selectionMode = getDefaultSelectionMode(unwrappedType);
  }
  return props;
};
const getLabelAndPlaceholder = (value, options, schemaKey) => {
  const namespace = options.namespace ?? DEFAULT_NAMESPACE;
  const stringKey = String(schemaKey);
  let { label, placeholder } = value;
  if (!label) {
    const key = `${namespace}.${stringKey}.label`;
    const translation = i18next.exists(key) ? i18next.t(key) : null;
    label = typeof translation === "string" ? translation : StringUtils.capitalize(stringKey);
  }
  if (!placeholder) {
    const key = `${namespace}.${stringKey}.placeholder`;
    const translation = i18next.exists(key) ? i18next.t(key) : null;
    placeholder = typeof translation === "string" ? translation : void 0;
  }
  return { label, placeholder };
};
const overridePresetLabelsAndPlaceholders = (presetInputDefs, options) => {
  const namespace = options.namespace ?? DEFAULT_NAMESPACE;
  return presetInputDefs.map((inputDef) => {
    const labelName = String(inputDef.name);
    const labelKey = `${namespace}.${labelName}.label`;
    const placeholderKey = `${namespace}.${labelName}.placeholder`;
    const labelTranslation = i18next.exists(labelKey) ? i18next.t(labelKey) : null;
    const placeholderTranslation = i18next.exists(placeholderKey) ? i18next.t(placeholderKey) : null;
    return {
      ...inputDef,
      label: typeof labelTranslation === "string" ? labelTranslation : inputDef.label,
      placeholder: typeof placeholderTranslation === "string" ? placeholderTranslation : inputDef.placeholder
    };
  });
};
const removeOverriddenPresetInputs = (presetInputs, options) => {
  if (presetInputs.length === 0) {
    return presetInputs;
  }
  const usedKeys = new Set(Object.keys(options.inputs ?? {}).map(String));
  return presetInputs.filter((input) => !usedKeys.has(String(input.name)));
};
const validateParams = (schema, presetInputs, options) => {
  const { inputs, order, includeAll } = options;
  if (!order) {
    return;
  }
  const inputKeys = Object.keys(inputs ?? {});
  const presetKeys = presetInputs.map((input) => input.name).filter((name) => name !== void 0);
  const schemaKeys = includeAll ? Object.keys(schema.shape) : [];
  const allInputKeys = /* @__PURE__ */ new Set([...inputKeys, ...presetKeys, ...schemaKeys]);
  const unnecessaryOrderKeys = order.filter((key) => !allInputKeys.has(key));
  if (unnecessaryOrderKeys.length > 0) {
    throw new Error(
      `Found unnecessary keys in "order": [${unnecessaryOrderKeys.join(", ")}]. These keys are not found in any of the input definitions.
All defined input keys are: [${Array.from(allInputKeys).join(", ")}].
In the case of a preset input definition, the key is the name attribute.`
    );
  }
};
const populateInputDef = (schema, schemaKey, value, options) => {
  const name = String(schemaKey);
  const { label, placeholder } = getLabelAndPlaceholder(value, options, schemaKey);
  const inputWrapper = value.inputWrapper ?? options.globalInputWrapper;
  if ("render" in value) {
    return {
      name,
      render: value.render
    };
  }
  const schemaKeyType = schema.shape[schemaKey];
  const componentType = "type" in value ? value.type : getDefaultInputComponentType(schemaKeyType);
  const defaultProps = componentType ? getDefaultProps(componentType, schemaKeyType) : {};
  const props = { ...defaultProps, ...options.globalProps, ...value.props };
  return {
    type: componentType === "unknown" ? null : componentType,
    name,
    label,
    placeholder,
    inputWrapper,
    props
  };
};
const addMissingSchemaFields = (schema, existingInputDefs, options) => {
  const schemaFields = Object.keys(schema.shape);
  const definedFields = new Set(existingInputDefs.map((def) => def.name));
  const missingFields = schemaFields.filter((field) => !definedFields.has(field));
  const additionalInputDefs = missingFields.map((field) => {
    return populateInputDef(schema, field, {}, options);
  });
  return [...existingInputDefs, ...additionalInputDefs];
};
const dynamicInputs = ({
  schema,
  preset = [],
  options
}) => {
  validateParams(schema, preset, options);
  let entries = Object.entries(options.inputs ?? {});
  entries = excludeEntries(entries);
  const dynamicInputDefs = convertInputsConfigToObjectDefinitions(entries);
  const inputDefs = dynamicInputDefs.map(([key, value]) => {
    return populateInputDef(schema, key, value, options);
  });
  let presetInputDefs = removeOverriddenPresetInputs(preset, options);
  if (options.overridePresetLocales) {
    presetInputDefs = overridePresetLabelsAndPlaceholders(presetInputDefs, options);
  }
  const mergedInputDefs = [...presetInputDefs, ...inputDefs];
  const allInputDefs = options.includeAll ? addMissingSchemaFields(schema, mergedInputDefs, options) : mergedInputDefs;
  return sortInputDefs(allInputDefs, options.order);
};
export {
  dynamicInputs,
  getDefaultInputComponentType,
  getDefaultSelectionMode
};
