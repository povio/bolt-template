import { useMemo } from "react";
import { useTranslation } from "react-i18next";
function useTranslationMemo(func) {
  const { t } = useTranslation();
  return useMemo(() => {
    if (func.length === 1) {
      return func(t);
    }
    return func();
  }, [func, t]);
}
export {
  useTranslationMemo
};
