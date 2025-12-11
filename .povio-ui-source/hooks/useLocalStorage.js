import { useState, useCallback } from "react";
const getValue = (key, schema) => {
  if (!localStorage) {
    return null;
  }
  const lsValue = localStorage.getItem(key);
  if (!lsValue) {
    return null;
  }
  let jsonOrString;
  try {
    jsonOrString = JSON.parse(lsValue);
  } catch {
    jsonOrString = lsValue;
  }
  const parsedValue = schema.safeParse(jsonOrString);
  if (parsedValue.success) {
    return parsedValue.data;
  } else {
    return null;
  }
};
const useLocalStorage = ({ key, schema }) => {
  const [value, setValue] = useState(() => getValue(key, schema));
  const set = useCallback(
    (newValue) => {
      if (!localStorage) {
        return;
      }
      const parsedValue = schema.safeParse(newValue);
      if (!parsedValue.success) {
        return;
      }
      if (typeof parsedValue.data === "string") {
        localStorage.setItem(key, parsedValue.data);
      } else {
        localStorage.setItem(key, JSON.stringify(parsedValue.data));
      }
      setValue(parsedValue.data);
    },
    [key, schema]
  );
  const remove = useCallback(() => {
    if (!localStorage) {
      return;
    }
    localStorage.removeItem(key);
    setValue(null);
  }, [key]);
  return { value, set, remove };
};
export {
  useLocalStorage
};
