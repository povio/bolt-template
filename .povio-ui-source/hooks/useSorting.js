import { useState, useMemo, useEffect } from "react";
import { UIRouter } from "../config/router.context.js";
function useSorting(defaultSorting, prefix = "") {
  const { pathname, replace, searchParams } = UIRouter.useUIRouter();
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
    const params = new URLSearchParams(searchParams);
    params.delete("order");
    if (order) {
      params.append(`order${prefix && `-${prefix}`}`, order);
    }
    const url = `${pathname}${params.size > 0 ? `?${params.toString()}` : ""}`;
    replace(url);
  }, [order]);
  return { sorting, setSorting, order };
}
export {
  useSorting
};
