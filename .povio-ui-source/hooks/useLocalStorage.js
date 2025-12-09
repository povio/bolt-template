import { useState, useEffect, useCallback } from "react";
const useLocalStorage = ({ key, schema }) => {
  const [value, setValue] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!localStorage) {
      setValue(null);
      return;
    }
    try {
      const lsValue = localStorage.getItem(key);
      if (!lsValue) {
        setValue(null);
        return;
      }
      let jsonOrString;
      try {
        jsonOrString = JSON.parse(lsValue);
      } catch {
        jsonOrString = lsValue;
      }
      const parsedValue = schema.safeParse(jsonOrString);
      if (parsedValue.success) {
        setValue(parsedValue.data);
      } else {
        setError(parsedValue.error);
        setValue(null);
      }
    } finally {
      setIsInitialLoading(false);
    }
  }, [key, schema]);
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
  return { value, set, remove, error, isInitialLoading };
};
export {
  useLocalStorage
};
