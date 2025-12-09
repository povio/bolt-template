import { useState, useEffect, useCallback, useMemo } from "react";
function sortByKeyOrder(data, orderedKeys = []) {
  return [...data].sort((a, b) => {
    return orderedKeys.findIndex((key) => key === (a.id ?? a.accessorKey)) - orderedKeys.findIndex((key) => key === (b.id ?? b.accessorKey));
  });
}
function useTableColumnConfig(defaultColumns, options = {}) {
  const [internalVisibleColumns, setInternalVisibleColumns] = useState(
    () => defaultColumns.reduce((acc, col) => {
      const key = col.id ?? col.accessorKey;
      acc[key] = true;
      return acc;
    }, {})
  );
  const [internalColumnOrder, setInternalColumnOrder] = useState(
    () => defaultColumns.map((col) => col.id ?? col.accessorKey)
  );
  useEffect(() => {
    if (options.visibleColumns) {
      setInternalVisibleColumns(options.visibleColumns);
    }
  }, [options.visibleColumns]);
  useEffect(() => {
    if (options.columnOrder) {
      setInternalColumnOrder(options.columnOrder);
    }
  }, [options.columnOrder]);
  const handleVisibilityChange = useCallback(
    (value) => {
      setInternalVisibleColumns(value);
      options?.onVisibilityChange?.(value);
    },
    [options]
  );
  const handleOrderChange = useCallback(
    (value) => {
      setInternalColumnOrder(value);
      options?.onOrderChange?.(value);
    },
    [options]
  );
  const configColumns = useMemo(
    () => sortByKeyOrder(defaultColumns, internalColumnOrder),
    [defaultColumns, internalColumnOrder]
  );
  const columns = useMemo(
    () => configColumns.filter(
      (col) => internalVisibleColumns?.[col.id ?? col.accessorKey] ?? true
    ),
    [configColumns, internalVisibleColumns]
  );
  return {
    configColumns,
    columns,
    visibleColumns: internalVisibleColumns,
    columnOrder: internalColumnOrder,
    onVisibilityChange: handleVisibilityChange,
    onOrderChange: handleOrderChange
  };
}
export {
  useTableColumnConfig
};
