import { KeyboardEvent } from 'react';
declare const Selectors: {
    readonly Cell: "[role=\"cell\"],[role=\"gridcell\"],[role=\"columnheader\"],[role=\"rowheader\"],td,th";
    readonly Row: "[role=\"row\"],tr";
    readonly RowGroup: "[role=\"rowgroup\"],thead,tbody,tfoot";
    /** Selector from here: https://github.com/Shopify/polaris/blob/main/polaris-react/src/utilities/focus.ts#L10 */
    readonly Focusable: "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled=\"true\"]):not([tabindex=\"-1\"]):not(:disabled),*[tabindex]";
};
type Config = {
    /** Enable debug logs */
    debug?: boolean;
    /** CSS Selectors being used to find Rows, Row Groups, Cells and Focusable elements */
    selectors?: Partial<typeof Selectors>;
    /** How many rows to move when pressing page up/down - Default goes to first/last row */
    pageUpDown?: number;
} | undefined;
declare class DataGridNav {
    private selectors;
    readonly pageUpDown: number | undefined;
    private keys;
    private disabled;
    readonly debug: boolean;
    private activeCell;
    constructor();
    constructor(config: Config);
    private debugLog;
    /**
     * Disables the keyboard listener in cases
     * that elements inside the grid need to use
     * arrows keys etc., like select dropdowns
     */
    disable(): void;
    /**
     * Enables the keyboard listeners
     */
    enable(): void;
    private isFocusable;
    getActiveCell(): HTMLElement | null;
    /** Used as a keyboard listener for key up */
    tableKeyUp(): void;
    /** Used as a keyboard listener for key down */
    tableKeyDown(e: KeyboardEvent): void;
    /**
     * Handles the navigation inside a cell
     */
    cellNavigation(e: KeyboardEvent): void;
    /**
     * Handles the navigation outside a cell
     * on the grid level
     */
    gridNavigation(e: KeyboardEvent): void;
    private pageCellNavigation;
    private verticalCellNavigation;
    /**
     * Sending a row `Element` and then the first cell will be focused.
     *
     * If you want to focus the last cell then the row children can be passed in
     * reversed order
     */
    private focusOnFirstCell;
    /**
     * Get the column index of a `cell` based on the first `row` parent.
     * `cellIndex` could be used, but it's not supported in HTML tables.
     */
    private getColumnIndex;
    /**
     * Get the row index of a `row` based
     * on its sibling rows
     */
    private getRowIndex;
    /**
     * Equivalent to prevUntil/nextUntil in jQuery
     * https://api.jquery.com/prevUntil/
     */
    private findUntil;
}
export declare function useTableNav(options?: Config): {
    listeners: {
        onKeyDown: (e: KeyboardEvent) => void;
        onKeyUp: () => void;
    };
    tableNav: DataGridNav;
};
export {};
