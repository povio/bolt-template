import { jsxs, jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { Loader } from "../status/Loader/Loader.js";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver.js";
import { Table } from "./Table.js";
const InfiniteTable = ({
  hasNextPage,
  isFetchingNextPage = false,
  fetchNextPage,
  ...rest
}) => {
  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);
  const { setRef } = useIntersectionObserver({
    onIntersection: handleLoadMore,
    rootMargin: "100px"
  });
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx(Table, { ...rest }),
    (hasNextPage || isFetchingNextPage) && /* @__PURE__ */ jsx(
      "div",
      {
        ref: (ref) => {
          setRef(ref);
          return () => {
            setRef(null);
          };
        },
        className: "flex justify-center py-4",
        children: /* @__PURE__ */ jsx(Loader, {})
      }
    )
  ] });
};
export {
  InfiniteTable
};
