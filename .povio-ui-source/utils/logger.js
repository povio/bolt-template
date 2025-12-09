import log from "loglevel";
import prefix from "loglevel-plugin-prefix";
prefix.reg(log);
prefix.apply(log, {
  template: "[%t] %l:",
  timestampFormatter: (date) => {
    return date.toISOString();
  }
});
const logger = {
  info: (...args) => log.info(...args),
  debug: (...args) => log.debug(...args),
  warn: (...args) => log.warn(...args),
  error: (...args) => log.error(...args),
  trace: (...args) => log.trace(...args)
};
export {
  logger
};
