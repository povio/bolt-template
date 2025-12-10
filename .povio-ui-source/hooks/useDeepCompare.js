import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { isEqual } from "../utils/isEqual.js";
const useDeepCompareEffect = (callback, dependencies) => {
  return useEffect(callback, useDeepCompareDeps(dependencies));
};
const useDeepCompareLayoutEffect = (callback, dependencies) => {
  return useLayoutEffect(callback, useDeepCompareDeps(dependencies));
};
const useDeepCompareMemo = (factory, dependencies) => {
  return useMemo(factory, useDeepCompareDeps(dependencies));
};
const useDeepCompareDeps = (value) => {
  const ref = useRef(void 0);
  const signalRef = useRef(0);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }
  return [signalRef.current];
};
export {
  useDeepCompareEffect,
  useDeepCompareLayoutEffect,
  useDeepCompareMemo
};
