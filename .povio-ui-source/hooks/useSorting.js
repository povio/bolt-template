import { useState, useMemo, useEffect } from "react";
import { UIRouter } from "../config/router.context.js";
function useSorting(defaultSorting, prefix = "") {
  const { pathname, replace, searchParams, query } = UIRouter.useUIRouter();
  const [sorting, setSorting] = useState(
    defaultSorting ?? searchParams.get(`order${prefix && `-${prefix}`}`)?.split(",").map((item) => {
      if (item.startsWith("-")) {
        return { id: item.slice(1), desc: true };
      }
      if (item.startsWith("+")) {
        return { id: item.slice(1), desc: false };
      }
      return { id: item, desc: false };
    }) ?? []
  );
  const order = useMemo(() => {
    return sorting.map((field) => `${field.desc ? "-" : "+"}${field.id}`).join(",");
  }, [sorting]);
  useEffect(() => {
    const { sort: _sort, ...queryParms } = query;
    replace({
      pathname,
      query: { ...queryParms, ...order ? { [`order${prefix && `-${prefix}`}`]: order } : {} }
    });
  }, [order]);
  return { sorting, setSorting, order };
}
export {
  useSorting
};
