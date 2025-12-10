import { CalendarDate, CalendarDateTime, DateValue, ZonedDateTime } from '@internationalized/date';
export declare namespace DateTimeUtils {
    function fromISOtoZonedDateTime(isoString: string): ZonedDateTime;
    function fromDateValueToISO(dateValue: DateValue): string;
    function fromLocalToZonedDateTime(date: Date): ZonedDateTime;
    function fromDateValueToLocal(dateValue: DateValue): Date;
    function fromCalendarDateToUTCISO(calendarDate: CalendarDate, options?: {
        endOfDay?: boolean;
    }): string;
    function fromUTCISOToCalendarDate(isoString: string): CalendarDate;
    function fromCalendarDateTimeToUTCISO(calendarDateTime: CalendarDateTime): string;
    function fromUTCISOToCalendarDateTime(isoString: string): CalendarDateTime;
    function formatTextDateToCalendarDateTime(textDate: string | null): CalendarDateTime | null;
}
