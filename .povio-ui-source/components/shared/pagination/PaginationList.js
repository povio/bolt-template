import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon } from "../../../assets/icons/ChevronLeft.js";
import { ChevronRightIcon } from "../../../assets/icons/ChevronRight.js";
import { ChevronsLeftIcon } from "../../../assets/icons/ChevronsLeft.js";
import { ChevronsRightIcon } from "../../../assets/icons/ChevronsRight.js";
import { Button } from "../../buttons/Button/Button.js";
import { ns } from "../../../config/i18n.js";
import { minWidth } from "./minWidth.cva.js";
const PaginationList = ({
  page,
  totalPages,
  size,
  color,
  variant,
  hideText,
  hideFirstLast,
  hidePrevNext,
  hideNumbers,
  className,
  onPageChange
}) => {
  const { t } = useTranslation(ns);
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;
  const renderPageNumbers = useMemo(() => {
    const pagesToShow = [];
    pagesToShow.push(1);
    if (page > 3) {
      pagesToShow.push("ellipsis");
    }
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pagesToShow.push(i);
    }
    if (page < totalPages - 2) {
      pagesToShow.push("ellipsis");
    }
    if (totalPages > 1 && !pagesToShow.includes(totalPages)) {
      pagesToShow.push(totalPages);
    }
    return pagesToShow.map((p, index) => {
      if (p === "ellipsis") {
        return /* @__PURE__ */ jsx(
          Button,
          {
            variant,
            color,
            size,
            width: "fill",
            className: clsx(minWidth({ size })),
            children: "..."
          },
          `ellipsis-${index}`
        );
      }
      return /* @__PURE__ */ jsx(
        Button,
        {
          width: "hug",
          size,
          variant,
          color,
          "data-selected": p === page ? true : void 0,
          className: clsx(p.toString().length <= 2 && minWidth({ size })),
          onPress: () => onPageChange?.(p),
          children: p.toString()
        },
        `page-${p}`
      );
    });
  }, [page, color, size, variant, totalPages, onPageChange]);
  if (totalPages <= 1) {
    return null;
  }
  const onNext = () => {
    if (!isNextDisabled) {
      onPageChange?.(page + 1);
    }
  };
  const onPrevious = () => {
    if (!isPrevDisabled) {
      onPageChange?.(page - 1);
    }
  };
  return /* @__PURE__ */ jsxs("nav", { className: clsx("flex items-center gap-pagination-button-to-button", className), children: [
    !hideFirstLast && /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => onPageChange?.(1),
        isDisabled: isPrevDisabled,
        size,
        color,
        variant,
        iconOnly: hideText,
        icon: ChevronsLeftIcon,
        children: t(($) => $.ui.pagination.firstBtn)
      }
    ),
    !hidePrevNext && /* @__PURE__ */ jsx(
      Button,
      {
        onClick: onPrevious,
        isDisabled: isPrevDisabled,
        size,
        color,
        variant,
        iconOnly: hideText,
        icon: ChevronLeftIcon,
        children: t(($) => $.ui.pagination.backBtn)
      }
    ),
    !hideNumbers && renderPageNumbers,
    !hidePrevNext && /* @__PURE__ */ jsx(
      Button,
      {
        onClick: onNext,
        isDisabled: isNextDisabled,
        size,
        color,
        variant,
        iconOnly: hideText,
        icon: ChevronRightIcon,
        children: t(($) => $.ui.pagination.nextBtn)
      }
    ),
    !hideFirstLast && /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => onPageChange?.(totalPages),
        isDisabled: isNextDisabled,
        size,
        color,
        variant,
        iconOnly: hideText,
        icon: ChevronsRightIcon,
        children: t(($) => $.ui.pagination.lastBtn)
      }
    )
  ] });
};
export {
  PaginationList
};
