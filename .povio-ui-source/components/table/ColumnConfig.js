import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../inputs/Checkbox/Checkbox.js";
import { Modal } from "../overlays/Modal/Modal.js";
import { Table } from "./Table.js";
import { Typography } from "../text/Typography/Typography.js";
import { ns } from "../../config/i18n.js";
import { useTranslationMemo } from "../../hooks/useTranslationMemo.js";
const VisibilityCell = ({ original, onToggle }) => /* @__PURE__ */ jsx(
  Checkbox,
  {
    isSelected: original.visible,
    onChange: () => onToggle(original.id),
    hideLabel: true,
    children: original.label
  }
);
const getColumns = (t, handleToggleVisibility) => [
  {
    id: "name",
    header: t(($) => $.ui.table.column, { ns }),
    meta: {
      width: "flex-1"
    },
    accessorKey: "label"
  },
  {
    id: "visible",
    header: t(($) => $.ui.table.show, { ns }),
    meta: {
      width: "w-20"
    },
    cell: ({ original }) => /* @__PURE__ */ jsx(
      VisibilityCell,
      {
        original,
        onToggle: handleToggleVisibility
      }
    )
  }
];
function ColumnConfigModal({
  isOpen,
  onClose,
  configColumns,
  visibleColumns,
  onVisibilityChange,
  onOrderChange
}) {
  const { t } = useTranslation(ns);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(
      configColumns.map((column) => {
        const columnId = column.id ?? column.accessorKey;
        return {
          id: columnId,
          label: column.header,
          visible: visibleColumns?.[columnId] ?? true
        };
      })
    );
  }, [configColumns, visibleColumns]);
  const handleToggleVisibility = useCallback(
    (columnId) => {
      const newVisible = {
        ...visibleColumns,
        [columnId]: !visibleColumns[columnId]
      };
      onVisibilityChange(newVisible);
    },
    [visibleColumns, onVisibilityChange]
  );
  const getColumnsWithTranslation = useCallback(
    (translateFn) => getColumns(translateFn, handleToggleVisibility),
    [handleToggleVisibility]
  );
  const columns = useTranslationMemo(getColumnsWithTranslation);
  const handleReorder = useCallback(
    (reorderedItems) => {
      setData(reorderedItems);
      onOrderChange(reorderedItems.map((item) => item.id));
    },
    [onOrderChange]
  );
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen,
      onClose,
      showCloseIcon: true,
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 p-4", children: [
        /* @__PURE__ */ jsx(
          Typography,
          {
            as: "h2",
            variant: "prominent-1",
            size: "title-5",
            children: t(($) => $.ui.table.configureColumns)
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "max-h-96 overflow-y-auto", children: /* @__PURE__ */ jsx(
          Table,
          {
            items: data,
            columns,
            showCellBorder: true,
            className: "w-full",
            enableDragDrop: true,
            getRowId: (row) => row.id,
            onReorder: handleReorder
          }
        ) })
      ] })
    }
  );
}
export {
  ColumnConfigModal
};
