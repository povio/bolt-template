import i18next from "i18next";
import { z } from "zod";
import { DateUtils } from "../utils/date.utils.js";
import { StringUtils } from "../utils/string.utils.js";
import { ZodUtils } from "../utils/zod.utils.js";
const DEFAULT_NAMESPACE = "dynamicColumns";
const FORMAT_MAP = {
  datetime: (value) => DateUtils.formatDate(new Date(value)),
  dateRange: (value) => {
    const startDate = DateUtils.formatDate(new Date(value.start));
    const endDate = DateUtils.formatDate(new Date(value.end));
    return `${startDate} - ${endDate}`;
  },
  enum: (value) => StringUtils.capitalize(value),
  number: (value) => value.toLocaleString(i18next.language),
  string: (value) => String(value),
  boolean: (value) => {
    const key = `${DEFAULT_NAMESPACE}.${value ? "yes" : "no"}`;
    if (i18next.exists(key)) {
      return String(i18next.t(key));
    }
    return value ? "Yes" : "No";
  }
};
const ZOD_TYPE_FORMAT_MAP = [
  [z.ZodEnum, FORMAT_MAP.enum],
  [z.ZodNumber, FORMAT_MAP.number],
  [z.ZodString, FORMAT_MAP.string],
  [z.ZodBoolean, FORMAT_MAP.boolean],
  [z.ZodISODateTime, FORMAT_MAP.datetime]
];
const configValueToColumnDef = (value) => {
  if (typeof value === "function" || typeof value === "string") {
    return {
      cell: value
    };
  }
  if (typeof value === "boolean" || value === void 0) {
    return {};
  }
  return value;
};
const convertEntriesToColumnDefs = (entries) => {
  return entries.map(([key, value]) => [key, configValueToColumnDef(value)]);
};
const customConfigValueToColumnDef = (value) => {
  if (typeof value === "string") {
    return {
      accessorKey: value,
      cell: value
    };
  }
  if (typeof value === "function") {
    return {
      cell: value
    };
  }
  return value;
};
const convertCustomEntriesToColumnDefs = (entries) => {
  return entries.map(([key, value]) => [key, customConfigValueToColumnDef(value)]);
};
const excludeEntries = (entries) => {
  return entries.filter(([, value]) => value !== false && value !== void 0);
};
const sortColumns = (columns, orderKeys) => {
  if (!orderKeys) {
    return columns;
  }
  const wildcardIndex = orderKeys.indexOf("*");
  if (wildcardIndex === -1) {
    return columns.sort((columnA, columnB) => {
      const idA = columnA.id;
      const idB = columnB.id;
      const orderMap = new Map(orderKeys.map((key, index) => [String(key), index]));
      const orderA = orderMap.get(String(idA));
      const orderB = orderMap.get(String(idB));
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
  }
  const beforeWildcard = orderKeys.slice(0, wildcardIndex);
  const afterWildcard = orderKeys.slice(wildcardIndex + 1);
  const beforeMap = new Map(beforeWildcard.map((key, index) => [String(key), index]));
  const afterMap = new Map(afterWildcard.map((key, index) => [String(key), index]));
  const before = [];
  const middle = [];
  const after = [];
  columns.forEach((column) => {
    const id = String(column.id);
    if (beforeMap.has(id)) {
      before.push(column);
    } else if (afterMap.has(id)) {
      after.push(column);
    } else {
      middle.push(column);
    }
  });
  before.sort((a, b) => beforeMap.get(String(a.id)) - beforeMap.get(String(b.id)));
  after.sort((a, b) => afterMap.get(String(a.id)) - afterMap.get(String(b.id)));
  return [...before, ...middle, ...after];
};
const formatValueByType = (value, schemaType) => {
  if (value === null || value === void 0) {
    return null;
  }
  if (ZodUtils.isDateRange(schemaType)) {
    return FORMAT_MAP.dateRange(value);
  }
  const unwrappedType = ZodUtils.unwrapZodType(schemaType);
  if (unwrappedType instanceof z.ZodArray) {
    if (!Array.isArray(value)) {
      return null;
    }
    const elementType = unwrappedType.element;
    const formattedElements = value.map((element) => formatValueByType(element, elementType));
    return formattedElements.join(", ");
  }
  const formatFunction = ZOD_TYPE_FORMAT_MAP.find(([zodType]) => unwrappedType instanceof zodType)?.[1];
  if (formatFunction) {
    return formatFunction(value);
  }
  return String(value);
};
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => {
    return current && typeof current === "object" ? current[key] : void 0;
  }, obj);
};
const getKeyType = (schema, key) => {
  const pathParts = key.split(".");
  let currentType = schema.shape[pathParts[0]];
  for (let i = 1; i < pathParts.length; i++) {
    if (currentType instanceof z.ZodObject) {
      currentType = currentType.shape[pathParts[i]];
    } else {
      currentType = schema.shape[key];
      break;
    }
  }
  return currentType;
};
const getCellFunction = (schema, schemaKey, columnDef, options) => {
  const { cell } = columnDef;
  if (typeof cell === "function") {
    return cell;
  }
  return ({ data }) => {
    const isCellKeyString = typeof cell === "string";
    const key = isCellKeyString ? cell : schemaKey;
    const value = getNestedValue(data, key);
    const keyType = getKeyType(schema, key);
    const shouldFormat = !options.disableFormatting?.includes(key);
    const formattedValue = shouldFormat ? formatValueByType(value, keyType) : value;
    let finalValue = formattedValue;
    if (options.emptyValue && !finalValue) {
      finalValue = options.emptyValue;
    }
    if (options.globalWrapper) {
      return options.globalWrapper(finalValue);
    }
    return finalValue;
  };
};
const normalizeSortable = (sortable) => {
  if (!sortable) {
    return void 0;
  }
  if (Array.isArray(sortable)) {
    return sortable;
  }
  if (sortable instanceof z.ZodEnum) {
    return Object.values(sortable.enum);
  }
  return void 0;
};
const getDefaultColumnHeader = (key, options) => {
  const namespace = options.namespace ?? DEFAULT_NAMESPACE;
  const localeKey = `${namespace}.${key}`;
  if (i18next.exists(localeKey)) {
    return String(i18next.t(localeKey));
  }
  return StringUtils.capitalize(key);
};
const overridePresetColumnsHeaders = (presetColumns, options) => {
  const namespace = options.namespace ?? DEFAULT_NAMESPACE;
  return presetColumns.map((columnDef) => {
    const localeKey = `${namespace}.${columnDef.id}`;
    const header = i18next.exists(localeKey) ? i18next.t(localeKey) : columnDef.header;
    return {
      ...columnDef,
      header: typeof header === "string" ? header : columnDef.header
    };
  });
};
const populateColumnDef = (schema, key, columnDef, options, sortableKeys) => {
  const id = columnDef.id ?? key;
  const enableSorting = columnDef.enableSorting ?? sortableKeys?.includes(id) ?? false;
  const header = columnDef.header ?? getDefaultColumnHeader(key, options);
  const cell = getCellFunction(schema, key, columnDef, options);
  return {
    ...columnDef,
    id,
    accessorKey: key,
    meta: {
      width: "flex-1",
      ...options.globalMeta,
      ...columnDef.meta
    },
    header,
    enableSorting,
    cell
  };
};
const populateCustomColumnDef = (schema, key, columnDef, options, sortableKeys) => {
  const id = columnDef.id ?? key;
  const accessorKey = columnDef.accessorKey ?? id;
  const enableSorting = columnDef.enableSorting ?? sortableKeys?.includes(id) ?? false;
  const header = columnDef.header ?? getDefaultColumnHeader(key, options);
  const cell = getCellFunction(schema, key, columnDef, options);
  return {
    ...columnDef,
    id,
    accessorKey,
    meta: {
      width: "flex-1",
      ...options.globalMeta,
      ...columnDef.meta
    },
    header,
    enableSorting,
    cell
  };
};
const addMissingSchemaFields = (schema, existingColumns, options, sortableKeys) => {
  const schemaFields = getAllSchemaKeys(schema);
  const definedFields = new Set(existingColumns.map((col) => col.id));
  const missingFields = schemaFields.filter((field) => !definedFields.has(field));
  const additionalColumns = missingFields.map((field) => {
    return populateColumnDef(schema, field, {}, options, sortableKeys);
  });
  return [...existingColumns, ...additionalColumns];
};
const removeOverriddenPresetColumns = (presetColumns, options) => {
  if (presetColumns.length === 0) {
    return presetColumns;
  }
  const usedColumnsIds = Object.entries(options.columns ?? {}).map(([key, value]) => {
    const columnDef = value;
    return columnDef.id ?? key;
  });
  const usedCustomColumnsIds = Object.entries(options.customColumns ?? {}).map(([key, value]) => {
    const columnDef = value;
    return columnDef.id ?? key;
  });
  const usedIds = /* @__PURE__ */ new Set([...usedColumnsIds, ...usedCustomColumnsIds]);
  return presetColumns.filter((column) => {
    if (!column.id) {
      return true;
    }
    return !usedIds.has(column.id);
  });
};
const getAllSchemaKeys = (schema) => {
  const keys = [];
  const { shape } = schema;
  const traverse = (obj, prefix = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      keys.push(currentPath);
      if (value instanceof z.ZodObject) {
        traverse(value.shape, currentPath);
      }
    });
  };
  traverse(shape);
  return keys;
};
const validateCustomColumnKeys = (schema, customColumnKeys) => {
  const schemaKeys = getAllSchemaKeys(schema);
  const invalidCustomColumnKeys = customColumnKeys.filter(
    (key) => schemaKeys.includes(key)
  );
  if (invalidCustomColumnKeys.length > 0) {
    throw new Error(
      `Invalid custom column keys: [${invalidCustomColumnKeys.join(", ")}]. Custom column keys cannot be part of the schema. Define these columns in the "columns" property instead.`
    );
  }
};
const validateOptionKeyArray = (usedKeys, optionKeys, optionName) => {
  if (!optionKeys) {
    return;
  }
  const extraUnusedKeys = optionKeys.filter((key) => !usedKeys.has(key));
  if (extraUnusedKeys.length > 0) {
    throw new Error(
      `Found unnecessary keys in "${optionName}": [${extraUnusedKeys.join(", ")}].

All available options are: [${Array.from(usedKeys).join(", ")}].`
    );
  }
};
const validateParams = (schema, presetColumns, options) => {
  const { columns, customColumns, sortable, order, disableFormatting, includeAll } = options;
  const columnKeys = Object.keys(columns ?? {});
  const customColumnKeys = customColumns ? Object.keys(customColumns) : [];
  const usedKeys = /* @__PURE__ */ new Set([...columnKeys, ...customColumnKeys]);
  const presetKeys = presetColumns.map((column) => column.id).filter((id) => id !== void 0);
  const schemaKeys = includeAll ? getAllSchemaKeys(schema) : [];
  const allKeys = /* @__PURE__ */ new Set([...presetKeys, ...usedKeys, ...schemaKeys, "*"]);
  if (customColumns) {
    validateCustomColumnKeys(schema, customColumnKeys);
  }
  if (Array.isArray(sortable)) {
    validateOptionKeyArray(usedKeys, sortable, "sortable");
  }
  validateOptionKeyArray(allKeys, order, "order");
  validateOptionKeyArray(usedKeys, disableFormatting, "disableFormatting");
};
const dynamicColumns = ({
  schema,
  preset = [],
  options
}) => {
  validateParams(schema, preset, options);
  const sortableKeys = normalizeSortable(options.sortable);
  let entries = Object.entries(options.columns ?? {});
  entries = excludeEntries(entries);
  entries = convertEntriesToColumnDefs(entries);
  const columns = entries.map(([key, value]) => {
    const columnDef = value;
    return populateColumnDef(schema, key, columnDef, options, sortableKeys);
  });
  let customEntries = Object.entries(options.customColumns ?? {});
  customEntries = convertCustomEntriesToColumnDefs(customEntries);
  const customColumns = customEntries.map(([key, value]) => {
    const columnDef = value;
    return populateCustomColumnDef(schema, key, columnDef, options, sortableKeys);
  });
  let presetColumns = removeOverriddenPresetColumns(preset, options);
  if (options.overridePresetLocales) {
    presetColumns = overridePresetColumnsHeaders(presetColumns, options);
  }
  const mergedColumns = [...presetColumns, ...columns, ...customColumns];
  const allColumns = options.includeAll ? addMissingSchemaFields(schema, mergedColumns, options, sortableKeys) : mergedColumns;
  return sortColumns(allColumns, options.order);
};
export {
  dynamicColumns,
  sortColumns
};
