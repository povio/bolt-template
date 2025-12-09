import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { NumberInput } from "../../inputs/Input/NumberInput/NumberInput.js";
import { Typography } from "../../text/Typography/Typography.js";
import { ns } from "../../../config/i18n.js";
import { PaginationList } from "./PaginationList.js";
const Pagination = ({
  size = "s",
  variant = "subtle",
  color = "secondary",
  page,
  totalItems,
  totalPages,
  pageSize,
  hideText = true,
  hideFirstLast = true,
  hidePrevNext = false,
  hideNumbers = false,
  className,
  onPageChange,
  onPageSizeChange
}) => {
  const { t } = useTranslation(ns);
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      id: "pagination",
      className: clsx("flex items-center gap-2", className),
      children: [
        totalItems > pageSize && /* @__PURE__ */ jsx(
          PaginationList,
          {
            page,
            size,
            color,
            variant,
            hideText,
            hideFirstLast,
            hidePrevNext,
            hideNumbers,
            totalPages: totalPages ?? Math.ceil(totalItems / pageSize),
            onPageChange
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "default",
              size: "label-2",
              as: "span",
              className: "whitespace-nowrap text-text-default-1",
              children: t(($) => $.ui.pagination.resultsPerPage)
            }
          ),
          /* @__PURE__ */ jsx(
            NumberInput,
            {
              value: pageSize,
              onChange: (value) => onPageSizeChange?.(Number(value)),
              label: t(($) => $.ui.pagination.resultsPerPage),
              hideLabel: true,
              className: "w-min",
              inputClassName: "min-w-12 !px-3 !py-0-5"
            }
          )
        ] })
      ]
    }
  );
};
export {
  Pagination
};
