import { DateTime } from "luxon";
var DateUtils;
((DateUtils2) => {
  const DATE_FORMAT = "dd/MM/yyyy";
  const DATETIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
  function formatDate(date, format = DATE_FORMAT) {
    return DateTime.fromJSDate(date).toFormat(format);
  }
  DateUtils2.formatDate = formatDate;
  function formatRelativeTime(date, options) {
    const dateTime = typeof date === "string" ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
    if (!dateTime.isValid) {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return formatDate(dateObj, DATETIME_FORMAT);
    }
    const relative = dateTime.toRelative(options);
    return relative || formatDate(dateTime.toJSDate(), DATETIME_FORMAT);
  }
  DateUtils2.formatRelativeTime = formatRelativeTime;
})(DateUtils || (DateUtils = {}));
export {
  DateUtils
};
