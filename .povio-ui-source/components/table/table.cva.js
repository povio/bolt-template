import { cva } from "class-variance-authority";
const tableRow = cva(
  [
    "h-9 max-h-12",
    "hover:bg-elevation-fill-default-2",
    "disabled:opacity-50",
    "selected:bg-elevation-fill-default-2",
    "hover:selected:bg-interactive-subtle-secondary-hover",
    "clickable:cursor-pointer",
    "focus-within:bg-elevation-fill-default-2"
  ],
  {
    variants: {
      alternatingBackground: {
        even: "even:bg-elevation-fill-inverted-4/5",
        odd: "odd:bg-elevation-fill-inverted-4/5"
      }
    }
  }
);
const tableHeadRow = cva(["h-8 w-full"]);
const tableHeadData = cva(
  [
    "border-b border-b-elevation-outline-default-1 border-solid px-table-header-cell-container-side-default py-table-header-cell-container-height-default text-left"
  ],
  {
    variants: {
      hasRightBorder: {
        true: "border-l border-l-elevation-outline-default-1 border-solid",
        false: ""
      }
    },
    defaultVariants: {
      hasRightBorder: true
    }
  }
);
const tableData = cva(
  [
    "relative h-0-5 overflow-hidden text-ellipsis whitespace-nowrap border-t border-t-transparent px-2 py-2",
    "border-b border-b-elevation-outline-default-1",
    "has-[*>[data-hovered]:not([data-disabled])]:hover:border-b-input-outlined-outline-hover",
    "has-[*>[data-invalid]]:border-b-input-outlined-outline-error!",
    "has-[*>[data-focused]]:border-b-input-outlined-outline-active"
  ],
  {
    variants: {
      hasRightBorder: {
        true: "border-l border-l-elevation-outline-default-1",
        false: ""
      }
    },
    defaultVariants: {
      hasRightBorder: true
    }
  }
);
export {
  tableData,
  tableHeadData,
  tableHeadRow,
  tableRow
};
