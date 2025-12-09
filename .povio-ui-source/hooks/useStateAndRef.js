import { useState, useRef, useCallback } from "react";
import { ObjectUtils } from "../utils/object.utils.js";
const useStateAndRef = (initialState) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(state);
  const updateValue = useCallback(
    (value) => {
      ref.current = ObjectUtils.isFunction(value) ? value(ref.current) : value;
      setState(ref.current);
    },
    [setState]
  );
  return [state, ref, updateValue];
};
export {
  useStateAndRef
};
