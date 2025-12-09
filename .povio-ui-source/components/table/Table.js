import { jsx, jsxs } from "react/jsx-runtime";
import { useSensors, useSensor, MouseSensor, TouchSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import { clsx } from "clsx";
import i18next from "i18next";
import { useRef, useCallback, useMemo, useState } from "react";
import { ChevronDownIcon } from "../../assets/icons/ChevronDown.js";
import { ChevronUpIcon } from "../../assets/icons/ChevronUp.js";
import { DragIcon } from "../../assets/icons/Drag.js";
import { InlineIconButton } from "../buttons/InlineIconButton/InlineIconButton.js";
import { CellText } from "./CellText.js";
import { HeaderText } from "./HeaderText.js";
import { UIStyle } from "../../config/uiStyle.context.js";
import { useTableNav } from "../../hooks/useTableNav.js";
import { tableRow, tableHeadRow, tableHeadData, tableData } from "./table.cva.js";
const CustomCellContext = (context) => {
  return { ...context, original: context.row.original, data: context.row.original, value: context.getValue() };
};
const CellRender = (Comp, props) => {
  const rendered = typeof Comp === "function" ? Comp(props) : Comp;
  return typeof rendered === "string" ? /* @__PURE__ */ jsx(CellText, { children: rendered }) : rendered;
};
const RowDragHandleCell = ({ rowId }) => {
  const { attributes, listeners } = useSortable({
    id: rowId
  });
  return /* @__PURE__ */ jsx(
    InlineIconButton,
    {
      ...attributes,
      ...listeners,
      className: "cursor-move p-1",
      label: "Drag handle",
      icon: DragIcon
    }
  );
};
const AutoDragHandleCell = ({ row }) => /* @__PURE__ */ jsx(RowDragHandleCell, { rowId: row.id });
const DraggableRow = ({
  row,
  showCellBorder,
  onRowClick,
  onDoubleClick,
  tableRowCva,
  tableDataCva,
  hasOnClick,
  ...props
}) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative"
  };
  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ jsx(
      "tr",
      {
        ref: setNodeRef,
        style,
        "data-clickable": hasOnClick,
        "data-selected": row.getIsSelected() || void 0,
        className: clsx(tableRowCva(props)),
        onClick: () => {
          row.toggleSelected();
          onRowClick?.(row.original);
        },
        onDoubleClick: () => onDoubleClick?.(row.original),
        children: row.getVisibleCells().map((cell, cellIndex) => {
          const columnMeta = cell.column.columnDef.meta ?? {};
          return /* @__PURE__ */ jsx(
            "td",
            {
              tabIndex: -1,
              className: clsx(
                tableDataCva({ hasRightBorder: cellIndex > 0 && showCellBorder }),
                columnMeta.cellClass,
                columnMeta.width
              ),
              children: CellRender(cell.column.columnDef.cell, CustomCellContext(cell.getContext()))
            },
            cell.id
          );
        })
      }
    )
  );
};
const Table = ({
  items,
  showCellBorder,
  columns,
  onRowClick,
  onDoubleClick,
  className,
  sorting,
  setSorting,
  columnOrder,
  setColumnOrder,
  columnVisibility,
  setColumnVisibility,
  bulkSelectionActions: ActionHeader,
  enableDragDrop = false,
  onDragEnd,
  onReorder,
  getRowId,
  enableRowSelection,
  enableMultiRowSelection = false,
  defaultSelectedRows,
  onRowSelectionChange,
  ...props
}) => {
  const uiStyle = UIStyle.useConfig();
  const tableRowCva = uiStyle?.table?.rowCva ?? tableRow;
  const tableHeadRowCva = uiStyle?.table?.headRowCva ?? tableHeadRow;
  const tableHeadDataCva = uiStyle?.table?.headDataCva ?? tableHeadData;
  const tableDataCva = uiStyle?.table?.dataCva ?? tableData;
  const ref = useRef(null);
  const { listeners } = useTableNav();
  const getCoreRowModelCallback = useCallback(getCoreRowModel, []);
  const getSortedRowModelCallback = useCallback(getSortedRowModel, []);
  const getPaginationRowModelCallback = useCallback(getPaginationRowModel, []);
  const data = useMemo(() => items ?? [], [items]);
  const [internalSelectedRows, setInternalSelectedRows] = useState({});
  const { rowSelection, handleRowSelectionChange } = useMemo(() => {
    const hasExternalRowSelection = defaultSelectedRows !== void 0 && onRowSelectionChange !== void 0;
    return {
      rowSelection: hasExternalRowSelection ? defaultSelectedRows : internalSelectedRows,
      handleRowSelectionChange: hasExternalRowSelection ? onRowSelectionChange : setInternalSelectedRows
    };
  }, [defaultSelectedRows, onRowSelectionChange, internalSelectedRows]);
  const baseColumns = useMemo(() => typeof columns === "function" ? columns(i18next.t) : columns, [columns]);
  const tableColumns = useMemo(() => {
    if (enableDragDrop && getRowId) {
      const dragHandleColumn = {
        id: "drag-handle",
        header: "",
        meta: {
          width: "w-12"
        },
        cell: AutoDragHandleCell,
        enableSorting: false
      };
      return [dragHandleColumn, ...baseColumns];
    }
    return baseColumns;
  }, [baseColumns, enableDragDrop, getRowId]);
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnOrder,
      columnVisibility,
      rowSelection
    },
    rowCount: items.length,
    getCoreRowModel: getCoreRowModelCallback(),
    getSortedRowModel: getSortedRowModelCallback(),
    getPaginationRowModel: getPaginationRowModelCallback(),
    manualPagination: true,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onRowSelectionChange: handleRowSelectionChange,
    manualSorting: true,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    defaultColumn: {
      sortDescFirst: true
    },
    enableRowSelection,
    enableMultiRowSelection,
    getRowId: getRowId ? (row) => String(getRowId(row)) : void 0
  });
  const dataIds = useMemo(() => {
    if (!enableDragDrop || !getRowId) {
      return [];
    }
    return data.map((item) => getRowId(item));
  }, [data, enableDragDrop, getRowId]);
  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!active || !over || active.id === over.id) {
        return;
      }
      if (getRowId && (onReorder || onDragEnd)) {
        if (onReorder) {
          const oldIndex = items.findIndex((item) => getRowId(item) === active.id);
          const newIndex = items.findIndex((item) => getRowId(item) === over.id);
          if (oldIndex !== -1 && newIndex !== -1) {
            const reorderedItems = arrayMove(items, oldIndex, newIndex);
            onReorder(reorderedItems);
          }
        }
        onDragEnd?.(event);
      }
    },
    [onDragEnd, onReorder, items, getRowId]
  );
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));
  const selectedRows = table.getSelectedRowModel().rows;
  const columnCount = table.getHeaderGroups()[0].headers.length;
  const isAnyRowSelected = selectedRows.length > 0 && !!ActionHeader;
  const hasOnClick = !!onRowClick || !!onDoubleClick;
  const tableElement = /* @__PURE__ */ jsxs(
    "table",
    {
      className: clsx("w-full", className),
      ...listeners,
      children: [
        /* @__PURE__ */ jsx("thead", { className: "sticky top-0 border-b border-b-elevation-outline-default-1", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(
          "tr",
          {
            className: clsx(tableHeadRowCva({})),
            children: headerGroup.headers.filter((header) => {
              if (isAnyRowSelected && header.index > 0) {
                return false;
              }
              return header.column.getIsVisible();
            }).map((header, index) => {
              const columnMeta = header.column.columnDef.meta ?? {};
              return /* @__PURE__ */ jsx(
                "th",
                {
                  colSpan: isAnyRowSelected ? columnCount : header.colSpan,
                  tabIndex: -1,
                  className: clsx(
                    tableHeadDataCva({
                      hasRightBorder: index > 0 && showCellBorder
                    }),
                    columnMeta.headerClass,
                    columnMeta.width
                  ),
                  children: isAnyRowSelected ? /* @__PURE__ */ jsx(ActionHeader, { table }) : /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Sort column",
                      ...{
                        className: clsx(
                          "flex select-none items-center gap-1 text-text-default-1",
                          header.column.getCanSort() ? "h-6 cursor-pointer rounded-xs px-1 hover:bg-elevation-fill-default-2" : "cursor-default",
                          columnMeta.sortClass
                        ),
                        onClick: header.column.getToggleSortingHandler()
                      },
                      children: [
                        typeof header.column.columnDef.header === "function" ? flexRender(header.column.columnDef.header, header.getContext()) : /* @__PURE__ */ jsx(HeaderText, { children: header.column.columnDef.header }),
                        {
                          asc: /* @__PURE__ */ jsx(
                            ChevronUpIcon,
                            {
                              width: 18,
                              height: 18
                            }
                          ),
                          desc: /* @__PURE__ */ jsx(
                            ChevronDownIcon,
                            {
                              width: 18,
                              height: 18
                            }
                          )
                        }[header.column.getIsSorted()] ?? null
                      ]
                    }
                  )
                },
                header.id
              );
            })
          },
          headerGroup.id
        )) }),
        /* @__PURE__ */ jsx(
          "tbody",
          {
            ref,
            className: "relative",
            children: enableDragDrop ? /* @__PURE__ */ jsx(
              SortableContext,
              {
                items: dataIds,
                strategy: verticalListSortingStrategy,
                children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
                  DraggableRow,
                  {
                    row,
                    showCellBorder,
                    onRowClick,
                    onDoubleClick,
                    tableRowCva,
                    tableHeadDataCva,
                    tableDataCva,
                    hasOnClick,
                    ...props
                  },
                  row.id
                ))
              }
            ) : table.getRowModel().rows.map((row) => {
              return (
                // oxlint-disable-next-line jsx-a11y/click-events-have-key-events
                /* @__PURE__ */ jsx(
                  "tr",
                  {
                    className: clsx(tableRowCva({ ...props })),
                    onClick: () => {
                      row.toggleSelected();
                      onRowClick?.(row.original);
                    },
                    onDoubleClick: () => onDoubleClick?.(row.original),
                    "data-clickable": hasOnClick,
                    "data-selected": row.getIsSelected() || void 0,
                    children: row.getVisibleCells().map((cell, cellIndex) => {
                      const columnMeta = cell.column.columnDef.meta ?? {};
                      return /* @__PURE__ */ jsx(
                        "td",
                        {
                          tabIndex: -1,
                          className: clsx(
                            tableDataCva({
                              hasRightBorder: cellIndex > 0 && showCellBorder
                            }),
                            columnMeta.cellClass,
                            columnMeta.width
                          ),
                          children: CellRender(cell.column.columnDef.cell, CustomCellContext(cell.getContext()))
                        },
                        cell.id
                      );
                    })
                  },
                  row.id
                )
              );
            })
          }
        )
      ]
    }
  );
  if (enableDragDrop) {
    return /* @__PURE__ */ jsx(
      DndContext,
      {
        collisionDetection: closestCenter,
        modifiers: [restrictToVerticalAxis],
        onDragEnd: handleDragEnd,
        sensors,
        children: tableElement
      }
    );
  }
  return tableElement;
};
export {
  RowDragHandleCell,
  Table
};
