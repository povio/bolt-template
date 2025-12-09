var QueriesUtils;
((QueriesUtils2) => {
  QueriesUtils2.prefetchMultipleQueries = (queryClient, queries) => {
    return Promise.all(queries.map((query) => query(queryClient)));
  };
})(QueriesUtils || (QueriesUtils = {}));
export {
  QueriesUtils
};
