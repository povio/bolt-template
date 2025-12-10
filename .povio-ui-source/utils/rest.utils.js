import axios from "axios";
import { z } from "zod";
var RestUtils;
((RestUtils2) => {
  RestUtils2.extractServerResponseCode = (e) => {
    if (e instanceof z.ZodError) {
      return "validation-exception";
    }
    if (!axios.isAxiosError(e)) {
      return null;
    }
    if (!e.response) {
      return null;
    }
    const data = e.response.data;
    if (typeof data?.code === "string") {
      return data.code;
    }
    return null;
  };
  RestUtils2.doesServerErrorMessageContain = (e, text) => {
    const message = (0, RestUtils2.extractServerErrorMessage)(e);
    if (message === null || message === void 0) {
      return false;
    }
    return message.toLowerCase().includes(text.toLowerCase());
  };
  RestUtils2.extractServerErrorMessage = (e) => {
    if (e instanceof z.ZodError) {
      return e.message;
    }
    if (!axios.isAxiosError(e)) {
      return null;
    }
    if (!e.response) {
      return null;
    }
    const data = e.response.data;
    if (typeof data?.message === "string") {
      return data.message;
    }
    return null;
  };
  RestUtils2.extractContentDispositionFilename = (headers) => {
    const contentDisposition = headers["content-disposition"];
    return contentDisposition ? /filename=["']?([^"';]+)/i.exec(contentDisposition)?.[1] : void 0;
  };
})(RestUtils || (RestUtils = {}));
export {
  RestUtils
};
