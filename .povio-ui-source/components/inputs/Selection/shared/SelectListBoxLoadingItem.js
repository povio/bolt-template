import { jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { ListBoxItem } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { selectListBoxItemClass } from "./SelectListBoxItem.js";
import { SelectContext } from "./select.context.js";
import { Loader } from "../../../status/Loader/Loader.js";
import { ns } from "../../../../config/i18n.js";
import { useIntersectionObserver } from "../../../../hooks/useIntersectionObserver.js";
const SelectListBoxLoadingItem = ({ id, label, onLoadMore }) => {
  const { t } = useTranslation(ns);
  const { isDebouncing, isLoading, hasLoadMore } = SelectContext.useSelect();
  const onIntersection = useCallback(() => {
    if (!isDebouncing && !isLoading && hasLoadMore) {
      onLoadMore?.();
    }
  }, [isDebouncing, isLoading, hasLoadMore, onLoadMore]);
  const { setRef } = useIntersectionObserver({
    onIntersection,
    rootMargin: "40px"
  });
  return /* @__PURE__ */ jsx(
    ListBoxItem,
    {
      id,
      textValue: label || t(($) => $.ui.loadingState.text),
      isDisabled: true,
      className: selectListBoxItemClass,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: (ref) => {
            setRef(ref);
            return () => {
              setRef(null);
            };
          },
          className: "flex flex-1 justify-center text-interactive-text-primary-idle",
          children: /* @__PURE__ */ jsx(Loader, {})
        }
      )
    }
  );
};
export {
  SelectListBoxLoadingItem
};
