import { parseAbsoluteToLocal, getLocalTimeZone, fromDate, CalendarDateTime, CalendarDate, parseAbsolute } from "@internationalized/date";
var DateTimeUtils;
((DateTimeUtils2) => {
  function fromISOtoZonedDateTime(isoString) {
    return parseAbsoluteToLocal(isoString);
  }
  DateTimeUtils2.fromISOtoZonedDateTime = fromISOtoZonedDateTime;
  function fromDateValueToISO(dateValue) {
    return dateValue.toDate(getLocalTimeZone()).toISOString();
  }
  DateTimeUtils2.fromDateValueToISO = fromDateValueToISO;
  function fromLocalToZonedDateTime(date) {
    return fromDate(date, getLocalTimeZone());
  }
  DateTimeUtils2.fromLocalToZonedDateTime = fromLocalToZonedDateTime;
  function fromDateValueToLocal(dateValue) {
    return dateValue.toDate(getLocalTimeZone());
  }
  DateTimeUtils2.fromDateValueToLocal = fromDateValueToLocal;
  function fromCalendarDateToUTCISO(calendarDate, options = {}) {
    if (options.endOfDay) {
      const calendarDateTime = new CalendarDateTime(
        calendarDate.year,
        calendarDate.month,
        calendarDate.day,
        23,
        59,
        59,
        999
      );
      return calendarDateTime.toDate("UTC").toISOString();
    }
    return calendarDate.toDate("UTC").toISOString();
  }
  DateTimeUtils2.fromCalendarDateToUTCISO = fromCalendarDateToUTCISO;
  function fromUTCISOToCalendarDate(isoString) {
    const date = new Date(isoString);
    return new CalendarDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
  }
  DateTimeUtils2.fromUTCISOToCalendarDate = fromUTCISOToCalendarDate;
  function fromCalendarDateTimeToUTCISO(calendarDateTime) {
    return calendarDateTime.toDate("UTC").toISOString();
  }
  DateTimeUtils2.fromCalendarDateTimeToUTCISO = fromCalendarDateTimeToUTCISO;
  function fromUTCISOToCalendarDateTime(isoString) {
    const zonedDateTime = parseAbsolute(isoString, "UTC");
    return new CalendarDateTime(
      zonedDateTime.year,
      zonedDateTime.month,
      zonedDateTime.day,
      zonedDateTime.hour,
      zonedDateTime.minute,
      zonedDateTime.second,
      zonedDateTime.millisecond
    );
  }
  DateTimeUtils2.fromUTCISOToCalendarDateTime = fromUTCISOToCalendarDateTime;
  function formatTextDateToCalendarDateTime(textDate) {
    if (!textDate?.includes("hh")) {
      return null;
    }
    const datePart = textDate.split(",").at(0)?.trim();
    if (!datePart) {
      return null;
    }
    const date = new Date(datePart);
    if (!date || date.toString() === "Invalid Date") {
      return null;
    }
    const zonedDateTime = fromDate(date, getLocalTimeZone());
    return new CalendarDateTime(zonedDateTime.year, zonedDateTime.month, zonedDateTime.day, 0, 0, 0, 0);
  }
  DateTimeUtils2.formatTextDateToCalendarDateTime = formatTextDateToCalendarDateTime;
})(DateTimeUtils || (DateTimeUtils = {}));
export {
  DateTimeUtils
};
