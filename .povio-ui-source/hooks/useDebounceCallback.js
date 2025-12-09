import { useRef, useState, useCallback, useEffect } from "react";
function useDebounceCallback(callback, { delay = 500 } = {}) {
  const timeoutRef = useRef(null);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsDebouncing(true);
      timeoutRef.current = setTimeout(() => {
        setIsDebouncing(false);
        callback?.(...args);
      }, delay);
    },
    [callback, delay]
  );
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return { callback: debouncedCallback, isDebouncing };
}
export {
  useDebounceCallback
};
