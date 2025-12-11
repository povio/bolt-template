import { useState, useEffect, useCallback, useMemo } from "react";
import { z } from "zod";
import { UIRouter } from "../config/router.context.js";
function getFieldType(schema, fieldKey) {
  if (!schema || !schema.shape) {
    return "unknown";
  }
  let fieldSchema = schema.shape[fieldKey];
  while (fieldSchema) {
    if (fieldSchema instanceof z.ZodOptional || fieldSchema instanceof z.ZodNullable) {
      fieldSchema = fieldSchema.unwrap();
    } else {
      break;
    }
  }
  if (!fieldSchema) {
    return "unknown";
  }
  if (fieldSchema instanceof z.ZodNumber) {
    return "number";
  }
  if (fieldSchema instanceof z.ZodBoolean) {
    return "boolean";
  }
  if (fieldSchema instanceof z.ZodString) {
    return "string";
  }
  return "unknown";
}
const serializeFiltersToQuery = (filterData, prefix) => {
  const query = {};
  for (const [key, value] of Object.entries(filterData)) {
    if (value === null || value === void 0) {
      continue;
    }
    const filterKey = `filter[${prefix && `${prefix}-`}${key}]`;
    if (Array.isArray(value) || typeof value === "object") {
      query[filterKey] = JSON.stringify(value);
    } else if (typeof value === "boolean") {
      query[filterKey] = value ? "true" : "false";
    } else {
      query[filterKey] = value.toString();
    }
  }
  return query;
};
const parseFilterFromQuery = (searchParams, schema) => {
  const filter = {};
  for (const [key, value] of searchParams.entries()) {
    const match = /^filter\[(.+?)\]$/.exec(key);
    if (!match) {
      continue;
    }
    const filterKey = match[1];
    const isArray = value.startsWith("[") && value.endsWith("]");
    const isObject = value.startsWith("{") && value.endsWith("}");
    const isNumber = !Number.isNaN(Number(value)) && value !== "";
    const isBoolean = ["true", "false"].includes(value);
    if (isArray || isObject || isNumber) {
      filter[filterKey] = JSON.parse(value);
    } else if (isBoolean) {
      filter[filterKey] = value === "true";
    } else {
      const expectedType = getFieldType(schema, filterKey);
      if (expectedType === "number" && !Number.isNaN(Number(value)) && value !== "" && value !== null) {
        filter[filterKey] = Number(value);
      } else if (expectedType === "boolean" && ["true", "false"].includes(value)) {
        filter[filterKey] = value === "true";
      } else {
        filter[filterKey] = value;
      }
    }
  }
  return filter;
};
const useFilters = (defaultFilterValues, prefix = "", schema) => {
  const { searchParams, pathname, replace } = UIRouter.useUIRouter();
  const [filterData, setFilterData] = useState(
    () => parseFilterFromQuery(searchParams, schema)
  );
  useEffect(() => {
    const setUrlToDefaultFilters = () => {
      const flatFilterQuery = serializeFiltersToQuery(defaultFilterValues, prefix);
      const url = `${pathname}?${new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        ...flatFilterQuery
      }).toString()}`;
      replace(url);
    };
    const currentFilters = parseFilterFromQuery(searchParams, schema);
    const hasFiltersSet = Object.keys(currentFilters).length > 0;
    if (defaultFilterValues && !hasFiltersSet) {
      setUrlToDefaultFilters();
    }
  }, [defaultFilterValues, prefix, schema]);
  useEffect(() => {
    const newQueryFilters = parseFilterFromQuery(searchParams, schema);
    setFilterData(newQueryFilters);
  }, [searchParams, schema]);
  const setFilterValue = useCallback(
    (data2) => {
      let newFilters = { ...filterData };
      const isReset = Object.keys(data2).length === 0;
      const isResetToDefault = data2 === defaultFilterValues;
      if (isResetToDefault) {
        newFilters = {
          ...defaultFilterValues
        };
      } else if (isReset) {
        newFilters = {};
      } else {
        Object.entries(data2).forEach(([key, value]) => {
          if (value === void 0) {
            delete newFilters[key];
          } else {
            newFilters[key] = value;
          }
        });
      }
      const prefixPart = prefix ? `${prefix}-` : "";
      const cleanedQuery = searchParams.keys().reduce(
        (acc, k) => {
          if (!k.startsWith(`filter[${prefixPart}`)) {
            acc[k] = searchParams.get(k) ?? "";
          }
          return acc;
        },
        {}
      );
      const flatFilterQuery = serializeFiltersToQuery(newFilters, prefix);
      const url = `${pathname}?${new URLSearchParams({
        ...cleanedQuery,
        ...flatFilterQuery
      }).toString()}`;
      replace(url);
      setFilterData(newFilters);
    },
    [filterData, prefix, pathname, replace, defaultFilterValues, searchParams]
  );
  const getFilterValue = useCallback(
    (keys) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = filterData[key];
      });
      return result;
    },
    [filterData]
  );
  const clearAllFilters = useCallback(() => {
    setFilterValue(defaultFilterValues ?? {});
  }, [defaultFilterValues, setFilterValue]);
  const data = useMemo(() => {
    return { filterData, setFilterValue, getFilterValue, clearAllFilters };
  }, [filterData, setFilterValue, getFilterValue, clearAllFilters]);
  return data;
};
export {
  useFilters
};
