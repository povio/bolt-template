import { useState, useEffect } from "react";
import { UIRouter } from "../config/router.context.js";
const DEFAULT_STATE = {
  pageIndex: 1,
  pageSize: 20
};
function usePagination(defaultPagination) {
  const { pathname, query, replace, searchParams } = UIRouter.useUIRouter();
  const [pagination, setPagination] = useState(
    defaultPagination ?? {
      pageIndex: searchParams.has("page") ? Number.parseInt(searchParams.get("page") ?? "", 10) : DEFAULT_STATE.pageIndex,
      pageSize: searchParams.has("size") ? Number.parseInt(searchParams.get("size") ?? "", 10) : DEFAULT_STATE.pageSize
    }
  );
  useEffect(() => {
    const { page: _page, size: _size, ...queryParms } = query;
    replace({
      pathname,
      query: {
        ...queryParms,
        ...pagination.pageSize !== DEFAULT_STATE.pageSize ? { size: pagination.pageSize } : {},
        ...pagination.pageIndex !== DEFAULT_STATE.pageIndex ? { page: pagination.pageIndex } : {}
      }
    });
  }, [pagination]);
  return {
    pagination,
    setPagination,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize
  };
}
export {
  usePagination
};
