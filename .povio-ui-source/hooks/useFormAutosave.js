import { useRef, useEffect } from "react";
import { useAutosave } from "./useAutosave.js";
import { useForm } from "./useForm.js";
import { ObjectUtils } from "../utils/object.utils.js";
const getResetTimeoutErrorMessage = (resetTimeout) => `Form Reset Timeout (${resetTimeout}ms) - Action Required
Problem: Form values weren't reset after submission.

Likely causes:
• Missing variables in reset dependency array
• Reset dependencies not updating after form save
• Async operations blocking timely reset

Solutions:
1. Ensure reset dependencies include all relevant state variables
2. Confirm your submission handler updates state properly (check query invalidation)
3. For slower operations, consider increasing the timeout threshold`;
function useFormAutosave({
  autosaveDelay,
  enableAutosave,
  onAutosave,
  getResetValues,
  resetDeps,
  resetTimeout = 5e3,
  ...props
}) {
  const form = useForm({ ...props, defaultValues: getResetValues() });
  const shouldResetFormValuesRef = useRef(false);
  const resetFormValuesTimeoutRef = useRef(void 0);
  useEffect(() => {
    const resetValues = getResetValues();
    if (resetValues === void 0) {
      return;
    }
    const resetFormValues = async () => {
      const keepStateOptions = shouldResetFormValuesRef.current ? { keepDirtyValues: true } : void 0;
      shouldResetFormValuesRef.current = false;
      let values = resetValues;
      if (ObjectUtils.isFunction(resetValues)) {
        values = await resetValues();
      }
      form.reset(values, keepStateOptions);
    };
    resetFormValues();
  }, [...resetDeps]);
  const onSaveSuccess = () => {
    shouldResetFormValuesRef.current = true;
    if (resetFormValuesTimeoutRef.current) {
      clearTimeout(resetFormValuesTimeoutRef.current);
    }
    resetFormValuesTimeoutRef.current = setTimeout(() => {
      if (shouldResetFormValuesRef.current) {
        throw new Error(getResetTimeoutErrorMessage(resetTimeout));
      }
    }, resetTimeout);
  };
  useAutosave({
    form,
    delay: autosaveDelay,
    enabled: enableAutosave,
    onSave: onAutosave,
    onSaveSuccess
  });
  return form;
}
export {
  useFormAutosave
};
