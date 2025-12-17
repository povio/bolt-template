import { ToRelativeOptions } from 'luxon';
export declare namespace DateUtils {
    function formatDate(date: Date, format?: string): string;
    function formatRelativeTime(date: Date | string, options?: ToRelativeOptions): string;
}
