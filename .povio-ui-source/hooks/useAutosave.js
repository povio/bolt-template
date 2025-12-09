import { useRef, useEffect } from "react";
import { useFormState, useWatch } from "react-hook-form";
import { isEqual } from "../utils/isEqual.js";
import { ObjectUtils } from "../utils/object.utils.js";
function isNilOrEqual(left, right) {
  if (ObjectUtils.isNil(left) && ObjectUtils.isNil(right)) {
    return true;
  }
  return isEqual(left, right);
}
function diffLeftOnly(left, right, shallowKeys) {
  if (!ObjectUtils.isObject(left) || ObjectUtils.isDate(left) || ObjectUtils.isRegExp(left)) {
    return !isNilOrEqual(left, right) ? left : void 0;
  }
  if (Array.isArray(left)) {
    return !isNilOrEqual(left, right) ? left : void 0;
  }
  const result = Object.entries(left).reduce((acc, [key, value]) => {
    const shallowSubtree = shallowKeys?.[key];
    if (shallowSubtree === true) {
      if (!isNilOrEqual(value, right?.[key])) {
        acc[key] = value;
      }
      return acc;
    }
    const diff = diffLeftOnly(value, right?.[key], shallowSubtree);
    if (diff !== void 0 && (!ObjectUtils.isObject(diff) || !ObjectUtils.isEmpty(diff))) {
      acc[key] = diff;
    }
    return acc;
  }, {});
  return ObjectUtils.isEmpty(result) ? void 0 : result;
}
function useAutosave({
  form,
  delay = 500,
  enabled = true,
  onSave,
  onSaveSuccess
}) {
  const timeoutRef = useRef(void 0);
  const { control, reset, handleSubmit } = form;
  const { dirtyFields, defaultValues } = useFormState({ control });
  const formData = useWatch({ control });
  useEffect(() => {
    if (!enabled || Object.keys(dirtyFields).length === 0) {
      return void 0;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleSubmit(async (data) => {
        const dirtyData = Object.entries(dirtyFields).filter(([, value]) => value).reduce((acc, [key]) => {
          acc[key] = data[key];
          return acc;
        }, {});
        const changedData = diffLeftOnly(dirtyData, defaultValues, dirtyFields) ?? {};
        if (Object.keys(changedData).length === 0) {
          return void 0;
        }
        try {
          reset(void 0, { keepValues: true });
          await onSave(changedData);
          onSaveSuccess?.();
        } catch {
          reset(defaultValues);
          return void 0;
        }
        return void 0;
      })();
      return void 0;
    }, delay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [defaultValues, dirtyFields, formData, delay, onSave, handleSubmit, enabled, reset]);
}
export {
  useAutosave
};
