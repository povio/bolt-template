import { useNavigate, useLocation } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { z } from "zod";
function getFieldType(schema, fieldKey) {
  if (!schema || !schema.shape) return "unknown";
  let fieldSchema = schema.shape[fieldKey];
  while (fieldSchema) {
    if (fieldSchema instanceof z.ZodOptional || fieldSchema instanceof z.ZodNullable) {
      fieldSchema = fieldSchema.unwrap();
    } else {
      break;
    }
  }
  if (!fieldSchema) return "unknown";
  if (fieldSchema instanceof z.ZodNumber) return "number";
  if (fieldSchema instanceof z.ZodBoolean) return "boolean";
  if (fieldSchema instanceof z.ZodString) return "string";
  return "unknown";
}
function serializeFiltersToQuery(filterData, prefix) {
  const query = {};
  for (const [key, value] of Object.entries(filterData)) {
    if (value === null || value === void 0) {
      continue;
    }
    if (Array.isArray(value) || typeof value === "object") {
      query[`filter[${prefix && `${prefix}-`}${key}]`] = JSON.stringify(value);
    } else if (typeof value === "boolean") {
      query[`filter[${prefix && `${prefix}-`}${key}]`] = value ? "true" : "false";
    } else if (typeof value === "number") {
      query[`filter[${prefix && `${prefix}-`}${key}]`] = value.toString();
    } else {
      query[`filter[${prefix && `${prefix}-`}${key}]`] = value;
    }
  }
  return query;
}
function parseFilterFromQuery(query, schema) {
  const filter = {};
  for (const [key, value] of Object.entries(query)) {
    const match = key.match(/^filter\[(.+?)\]$/);
    if (match) {
      const filterKey = match[1];
      const baseKey = filterKey.includes("-") ? filterKey.split("-").pop() || filterKey : filterKey;
      if (value.startsWith("[") && value.endsWith("]") || value.startsWith("{") && value.endsWith("}")) {
        filter[filterKey] = JSON.parse(value);
      } else if (["true", "false"].includes(value)) {
        filter[filterKey] = value === "true";
      } else {
        const expectedType = getFieldType(schema, baseKey);
        if (expectedType === "number" && !Number.isNaN(Number(value)) && value !== "" && value !== null) {
          filter[filterKey] = Number(value);
        } else if (expectedType === "boolean" && ["true", "false"].includes(value)) {
          filter[filterKey] = value === "true";
        } else {
          filter[filterKey] = value;
        }
      }
    }
  }
  return filter;
}
function useFilters(defaultFilterValues, prefix = "", schema) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryObject = useMemo(
    () => Object.fromEntries(new URLSearchParams(location.searchStr || "").entries()),
    [location.searchStr]
  );
  const hasAppliedDefaultsRef = useRef(false);
  const lastPathnameRef = useRef(location.pathname);
  const queryFilters = parseFilterFromQuery(queryObject, schema);
  const [filterData, setFilterData] = useState(queryFilters);
  useEffect(() => {
    if (lastPathnameRef.current !== location.pathname) {
      hasAppliedDefaultsRef.current = false;
      lastPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);
  useEffect(() => {
    const currentQueryObject = Object.fromEntries(new URLSearchParams(location.searchStr || "").entries());
    const currentFilters = parseFilterFromQuery(currentQueryObject, schema);
    const shouldApplyDefaults = defaultFilterValues && Object.keys(currentFilters).length === 0 && !hasAppliedDefaultsRef.current;
    if (shouldApplyDefaults) {
      const flatFilterQuery = serializeFiltersToQuery(defaultFilterValues, prefix);
      const sp = new URLSearchParams(location.searchStr || "");
      let needsNavigation = false;
      Object.entries(flatFilterQuery).forEach(([k, v]) => {
        const currentValue = sp.get(k);
        if (Array.isArray(v)) {
          const currentValues = sp.getAll(k);
          if (JSON.stringify(currentValues.sort()) !== JSON.stringify(v.sort())) {
            needsNavigation = true;
          }
        } else {
          if (currentValue !== v) {
            needsNavigation = true;
          }
        }
      });
      if (needsNavigation) {
        Object.entries(flatFilterQuery).forEach(([k, v]) => {
          sp.delete(k);
          if (Array.isArray(v)) {
            v.forEach((val) => sp.append(k, val));
          } else {
            sp.set(k, v);
          }
        });
        const to = `${location.pathname}${sp.toString() ? `?${sp.toString()}` : ""}`;
        navigate({ to, replace: true });
      }
      hasAppliedDefaultsRef.current = true;
    }
  }, [defaultFilterValues, prefix, location.pathname, location.searchStr]);
  useEffect(() => {
    const newQueryFilters = parseFilterFromQuery(queryObject, schema);
    setFilterData(newQueryFilters);
  }, [queryObject, schema]);
  const setFilterValue = (data) => {
    const next = { ...filterData };
    const isReset = Object.keys(data).length === 0;
    const isResetToDefault = data === defaultFilterValues;
    if (isResetToDefault) {
      Object.keys(next).forEach((key) => delete next[key]);
      Object.entries(defaultFilterValues ?? {}).forEach(([key, value]) => {
        next[key] = value;
      });
    } else if (!isReset) {
      Object.entries(data).forEach(([key, value]) => {
        if (value === void 0) {
          delete next[key];
        } else {
          next[key] = value;
        }
      });
    } else {
      Object.keys(next).forEach((key) => delete next[key]);
    }
    const sp = new URLSearchParams(location.searchStr || "");
    Array.from(sp.keys()).forEach((key) => {
      if (key.startsWith(`filter[${prefix && `${prefix}-`}`)) {
        sp.delete(key);
      }
    });
    const flatFilterQuery = serializeFiltersToQuery(next, prefix);
    Object.entries(flatFilterQuery).forEach(([k, v]) => {
      sp.delete(k);
      if (Array.isArray(v)) {
        v.forEach((val) => sp.append(k, val));
      } else {
        sp.set(k, v);
      }
    });
    const to = `${location.pathname}${sp.toString() ? `?${sp.toString()}` : ""}`;
    navigate({ to, replace: true });
    setFilterData(next);
  };
  const getFilterValue = (keys) => {
    const result = {};
    keys.forEach((key) => {
      result[key] = filterData[key];
    });
    return result;
  };
  const clearAllFilters = () => {
    setFilterValue(defaultFilterValues ?? {});
  };
  return { filterData, setFilterValue, getFilterValue, clearAllFilters };
}
export {
  parseFilterFromQuery,
  useFilters
};
