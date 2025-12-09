import { DateTime } from "luxon";
var DateUtils;
((DateUtils2) => {
  const DATE_FORMAT = "dd/MM/yyyy";
  function formatDate(date, format = DATE_FORMAT) {
    return DateTime.fromJSDate(date).toFormat(format);
  }
  DateUtils2.formatDate = formatDate;
})(DateUtils || (DateUtils = {}));
export {
  DateUtils
};
