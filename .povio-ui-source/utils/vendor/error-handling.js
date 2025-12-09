import axios from "axios";
import i18next from "i18next";
import { z } from "zod";
import { ns } from "../../config/i18n.js";
import { logger } from "../logger.js";
import { RestUtils } from "../rest.utils.js";
class ApplicationException extends Error {
  constructor(message, code, serverMessage) {
    super(message);
    this.serverMessage = null;
    this.code = code;
    this.serverMessage = serverMessage;
  }
}
class ErrorHandler {
  constructor(entries) {
    this.entries = [];
    const dataValidationError = {
      code: "DATA_VALIDATION_ERROR",
      condition: (e) => {
        return e instanceof z.ZodError;
      },
      getMessage: () => i18next.t(($) => $.sharedErrors.dataValidation, {
        ns
      })
    };
    const internalError = {
      code: "INTERNAL_ERROR",
      condition: (e) => {
        if (axios.isAxiosError(e)) {
          return e.response?.status != null && e.response.status >= 500 && e.response.status < 600;
        }
        return false;
      },
      getMessage: () => i18next.t(($) => $.sharedErrors.internalError, {
        ns
      })
    };
    const networkError = {
      code: "NETWORK_ERROR",
      condition: (e) => {
        if (axios.isAxiosError(e)) {
          return e.code === "ERR_NETWORK";
        }
        return false;
      },
      getMessage: () => i18next.t(($) => $.sharedErrors.networkError, {
        ns
      })
    };
    const canceledError = {
      code: "CANCELED_ERROR",
      condition: (e) => {
        if (axios.isCancel(e)) {
          return true;
        }
        if (axios.isAxiosError(e) && e.code === "ECONNABORTED") {
          return true;
        }
        return false;
      },
      getMessage: () => i18next.t(($) => $.sharedErrors.canceledError, {
        ns
      })
    };
    const unknownError = {
      code: "UNKNOWN_ERROR",
      condition: () => true,
      getMessage: () => i18next.t(($) => $.sharedErrors.unknownError, {
        ns
      })
    };
    this.entries = [...entries, dataValidationError, internalError, networkError, canceledError, unknownError];
  }
  // convert the error into an application exception
  rethrowError(error) {
    logger.error(error);
    const errorEntry = this.entries.find((entry) => entry.condition(error ?? {}));
    const serverMessage = RestUtils.extractServerErrorMessage(error);
    throw new ApplicationException(errorEntry.getMessage(error), errorEntry.code, serverMessage);
  }
  // oxlint-disable-next-line class-methods-use-this
  getError(error) {
    if (error instanceof ApplicationException) {
      return error;
    }
    return null;
  }
  // oxlint-disable-next-line class-methods-use-this
  getErrorCode(error) {
    if (error instanceof ApplicationException) {
      return error.code;
    }
    return null;
  }
  static getErrorMessage(error, fallbackToUnknown = true) {
    if (typeof error === "string") {
      return error;
    }
    if (error instanceof Error) {
      return error.message;
    }
    if (error instanceof ApplicationException) {
      return error.message;
    }
    if (fallbackToUnknown) {
      return i18next.t(($) => $.sharedErrors.unknownError, {
        ns
      });
    }
    return null;
  }
}
const SharedErrorHandler = new ErrorHandler([]);
export {
  ApplicationException,
  ErrorHandler,
  SharedErrorHandler
};
