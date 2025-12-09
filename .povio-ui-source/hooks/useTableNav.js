import { logger } from "../utils/logger.js";
const Selectors = {
  Cell: '[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"],td,th',
  Row: '[role="row"],tr',
  RowGroup: '[role="rowgroup"],thead,tbody,tfoot',
  /** Selector from here: https://github.com/Shopify/polaris/blob/main/polaris-react/src/utilities/focus.ts#L10 */
  Focusable: 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]'
};
class DataGridNav {
  constructor(config = {}) {
    this.keys = [];
    this.activeCell = null;
    this.debugLog = (functionName, message) => {
      if (this.debug) {
        logger.info(`[${functionName}]: ${message}`);
      }
    };
    const { selectors = {}, pageUpDown, debug = false } = config;
    this.selectors = { ...Selectors, ...selectors };
    this.pageUpDown = pageUpDown;
    this.keys = [];
    this.debug = debug;
    this.disabled = false;
  }
  /**
   * Disables the keyboard listener in cases
   * that elements inside the grid need to use
   * arrows keys etc., like select dropdowns
   */
  disable() {
    this.disabled = true;
  }
  /**
   * Enables the keyboard listeners
   */
  enable() {
    this.disabled = false;
  }
  // oxlint-disable-next-line class-methods-use-this
  isFocusable(el) {
    return el instanceof HTMLElement || el instanceof SVGElement;
  }
  getActiveCell() {
    return this.activeCell;
  }
  /** Used as a keyboard listener for key up */
  tableKeyUp() {
    this.keys = [];
  }
  /** Used as a keyboard listener for key down */
  tableKeyDown(e) {
    if (this.disabled) {
      return;
    }
    if ("ArrowDown" === e.key || "ArrowUp" === e.key || "ArrowLeft" === e.key || "ArrowRight" === e.key) {
      e.preventDefault();
    }
    if (this.keys.length === 0 || this.keys[this.keys.length - 1] !== e.key) {
      this.keys.push(e.key);
    }
    if (!(e.target instanceof Element)) {
      return;
    }
    const cell = e.target.parentElement?.closest(`${this.selectors.Cell},${this.selectors.Row}`);
    if (!cell) {
      return;
    }
    if (cell.matches(this.selectors.Cell)) {
      this.cellNavigation(e);
    } else {
      this.gridNavigation(e);
    }
  }
  /**
   * Handles the navigation inside a cell
   */
  cellNavigation(e) {
    if (!(e.target instanceof Element)) {
      return;
    }
    if (e.key === "Escape") {
      const cell = e.target.closest(this.selectors.Cell);
      if (cell && this.isFocusable(cell)) {
        cell.focus();
        return;
      }
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      const cell = e.target.closest(this.selectors.Cell);
      if (!cell) {
        return;
      }
      const focusableWidgets = [...cell.querySelectorAll(this.selectors.Focusable)];
      const widgetIdx = focusableWidgets.findIndex((el) => el === e.target);
      const nextFocusable = widgetIdx === focusableWidgets.length - 1 ? 0 : widgetIdx + 1;
      const widgetToFocus = focusableWidgets[nextFocusable];
      if (this.isFocusable(widgetToFocus)) {
        widgetToFocus.focus();
      }
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      const cell = e.target.closest(this.selectors.Cell);
      if (!cell) {
        return;
      }
      const focusableWidgets = [...cell.querySelectorAll(this.selectors.Focusable)];
      const widgetIdx = focusableWidgets.findIndex((el) => el === e.target);
      const previousFocusable = widgetIdx === 0 ? focusableWidgets.length - 1 : widgetIdx - 1;
      const widgetToFocus = focusableWidgets[previousFocusable];
      if (this.isFocusable(widgetToFocus)) {
        widgetToFocus.focus();
      }
    }
  }
  /**
   * Handles the navigation outside a cell
   * on the grid level
   */
  gridNavigation(e) {
    const { target } = e;
    if (!(e.target instanceof Element)) {
      return;
    }
    if (!(target instanceof Element)) {
      return;
    }
    if (this.keys.length === 1) {
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        const cell = e.target.querySelector(this.selectors.Focusable);
        if (cell && this.isFocusable(cell) && cell instanceof HTMLInputElement) {
          cell.focus();
          cell.value = `${cell.value}${e.key}`;
          e.preventDefault();
        }
        return;
      }
      if (e.key === "Backspace") {
        const cell = e.target.querySelector(this.selectors.Focusable);
        if (cell && this.isFocusable(cell) && cell instanceof HTMLInputElement) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(cell, "");
            const ev = new Event("input", { bubbles: true });
            cell.dispatchEvent(ev);
          }
        }
        return;
      }
      if (e.key === "Enter") {
        const cell = e.target.querySelector(this.selectors.Focusable);
        if (cell && this.isFocusable(cell)) {
          if (cell.getAttribute("data-type") === "select-trigger") {
            cell.click();
            return;
          }
          cell.focus();
          e.preventDefault();
        }
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const direction = e.key === "ArrowLeft" ? "prev" : "next";
        const cell = e.target.closest(this.selectors.Cell);
        let nextCell = null;
        if (direction === "next" && cell?.nextElementSibling instanceof HTMLElement) {
          nextCell = cell.nextElementSibling;
        }
        if (direction === "prev" && cell?.previousElementSibling instanceof HTMLElement) {
          nextCell = cell.previousElementSibling;
        }
        if (nextCell && this.isFocusable(nextCell)) {
          nextCell.focus();
          e.preventDefault();
        }
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        this.verticalCellNavigation(e);
        return;
      }
      if (e.key === "PageUp" || e.key === "PageDown") {
        this.pageCellNavigation(e);
        return;
      }
      if (e.key === "Home" || e.key === "End") {
        const row = e.target.closest(this.selectors.Row);
        const rowChildren = [...row?.children || []];
        if (e.key === "End") {
          rowChildren.reverse();
        }
        this.focusOnFirstCell(rowChildren);
      }
    } else {
      const [firstKey, secondKey] = this.keys;
      if (firstKey === "Control" && // oxlint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      (secondKey === "Home" || secondKey === "End")) {
        const row = e.target.closest(this.selectors.Row);
        const siblings = row.parentElement?.children;
        if (!siblings) {
          return;
        }
        const rowToFocus = secondKey === "Home" ? siblings[0] : siblings[siblings.length - 1];
        const rowChildren = [...rowToFocus?.children || []];
        if (secondKey === "End") {
          rowChildren.reverse();
        }
        this.focusOnFirstCell(rowChildren);
      }
    }
  }
  pageCellNavigation(e) {
    if (!(e.target instanceof Element)) {
      return;
    }
    const row = e.target.closest(this.selectors.Row);
    const cell = e.target.closest(this.selectors.Cell);
    if (row && cell) {
      const position = this.getColumnIndex(cell);
      if (position === void 0) {
        return;
      }
      const direction = e.key === "PageUp" ? "prev" : "next";
      const siblings = row.parentElement?.children;
      if (!siblings) {
        return;
      }
      let destinationRow;
      if (this.pageUpDown) {
        const methodClbk = direction === "prev" ? "previousSibling" : "nextSibling";
        let sibling = row[methodClbk];
        if (sibling === null) {
          return;
        }
        let lastVisitedSibling = sibling;
        for (let i = 0; i < this.pageUpDown - 1 && sibling; i++) {
          sibling = sibling[methodClbk];
          if (sibling) {
            lastVisitedSibling = sibling;
          }
        }
        destinationRow = sibling || lastVisitedSibling;
      } else {
        destinationRow = direction === "prev" ? siblings[0] : siblings[siblings.length - 1];
      }
      if (!destinationRow || !(destinationRow instanceof Element)) {
        return;
      }
      const child = destinationRow.children[position];
      if (child && this.isFocusable(child)) {
        child.focus();
      }
    }
  }
  verticalCellNavigation(e) {
    if (!(e.target instanceof Element)) {
      return;
    }
    const row = e.target.closest(this.selectors.Row);
    const cell = e.target.closest(this.selectors.Cell);
    if (row && cell) {
      const cellPosition = this.getColumnIndex(cell);
      const rowPosition = this.getRowIndex(row);
      if (cellPosition === void 0 || rowPosition === void 0) {
        return;
      }
      const direction = e.key === "ArrowUp" ? "prev" : "next";
      if (rowPosition === 0 && direction === "prev") {
        const currentRowGroup = row.parentElement?.closest(this.selectors.RowGroup);
        const siblingRowGroups = [...currentRowGroup?.parentElement?.children || []];
        const currentRowGroupIdx = siblingRowGroups.findIndex((el) => el === currentRowGroup);
        if (currentRowGroupIdx !== 0) {
          const previousRowGroup = siblingRowGroups[currentRowGroupIdx - 1];
          const rows = [...previousRowGroup.querySelectorAll(this.selectors.Row)];
          const child2 = rows[rows.length - 1].children[cellPosition];
          if (child2 && this.isFocusable(child2)) {
            child2.focus();
          }
          return;
        }
      }
      const siblingRows = [...row.parentElement?.querySelectorAll(this.selectors.Row) || []];
      if (rowPosition === siblingRows.length - 1 && direction === "next") {
        const currentRowGroup = row.parentElement?.closest(this.selectors.RowGroup);
        const siblingRowGroups = [...currentRowGroup?.parentElement?.children || []];
        const currentRowGroupIdx = siblingRowGroups.findIndex((el) => el === currentRowGroup);
        if (currentRowGroupIdx !== siblingRowGroups.length - 1) {
          const nextRowGroup = siblingRowGroups[currentRowGroupIdx + 1];
          const rows = [...nextRowGroup.querySelectorAll(this.selectors.Row)];
          const child2 = rows[0].children[cellPosition];
          if (child2 && this.isFocusable(child2)) {
            child2.focus();
          }
          return;
        }
        return;
      }
      const destinationRow = this.findUntil(direction, row, this.selectors.Row);
      if (!destinationRow) {
        return;
      }
      const child = destinationRow.children[cellPosition];
      if (child && this.isFocusable(child)) {
        child.focus();
      }
    }
  }
  /**
   * Sending a row `Element` and then the first cell will be focused.
   *
   * If you want to focus the last cell then the row children can be passed in
   * reversed order
   */
  focusOnFirstCell(el) {
    for (let i = 0; i < el.length; i++) {
      const child = el[i];
      if (this.isFocusable(child)) {
        child.focus();
        return;
      }
    }
  }
  /**
   * Get the column index of a `cell` based on the first `row` parent.
   * `cellIndex` could be used, but it's not supported in HTML tables.
   */
  getColumnIndex(cell) {
    let position = 0;
    const siblings = cell?.parentNode?.children;
    if (!siblings) {
      return void 0;
    }
    while (cell !== siblings[position] && siblings[position] !== void 0) {
      position++;
    }
    if (siblings[position] === void 0) {
      return void 0;
    }
    return position;
  }
  /**
   * Get the row index of a `row` based
   * on its sibling rows
   */
  getRowIndex(row) {
    let position = 0;
    const siblings = row?.parentNode?.children;
    if (!siblings) {
      return void 0;
    }
    while (row !== siblings[position] && siblings[position] !== void 0) {
      position++;
    }
    if (siblings[position] === void 0) {
      return void 0;
    }
    return position;
  }
  /**
   * Equivalent to prevUntil/nextUntil in jQuery
   * https://api.jquery.com/prevUntil/
   */
  // oxlint-disable-next-line class-methods-use-this
  findUntil(direction, el, matchSelector, exitSelector) {
    let element = el;
    const method = direction === "next" ? "nextSibling" : "previousSibling";
    while (element[method]) {
      const sibling = element[method];
      if (!sibling) {
        return null;
      }
      if (exitSelector && sibling instanceof Element && sibling.matches(exitSelector)) {
        return null;
      }
      if (sibling instanceof Element && sibling.matches(matchSelector)) {
        return sibling;
      }
      element = sibling;
    }
    return null;
  }
}
function useTableNav(options) {
  const nav = new DataGridNav(options);
  return {
    listeners: {
      onKeyDown: (e) => nav.tableKeyDown(e),
      onKeyUp: () => nav.tableKeyUp()
    },
    tableNav: nav
  };
}
export {
  useTableNav
};
