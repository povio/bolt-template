import { jsxs, jsx } from "react/jsx-runtime";
import { Pagination } from "../shared/pagination/Pagination.js";
import { Table } from "./Table.js";
const PaginatedTable = ({
  pagination,
  setPagination,
  items,
  totalItems,
  ...rest
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx(
      Table,
      {
        ...rest,
        items: items ?? []
      }
    ),
    /* @__PURE__ */ jsx(
      Pagination,
      {
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        totalItems: totalItems ?? 0,
        onPageChange: (page) => setPagination({ ...pagination, pageIndex: page }),
        onPageSizeChange: (pageSize) => setPagination({ ...pagination, pageSize, pageIndex: 1 })
      }
    )
  ] });
};
export {
  PaginatedTable
};
