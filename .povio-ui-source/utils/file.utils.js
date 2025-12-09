import { RestUtils } from "./rest.utils.js";
var FileUtils;
((FileUtils2) => {
  FileUtils2.getObjectUrl = (data, revokeTimeoutMs = 4e4) => {
    const url = URL.createObjectURL(data instanceof Blob ? data : data.data);
    setTimeout(() => URL.revokeObjectURL(url), revokeTimeoutMs);
    return url;
  };
  FileUtils2.openFile = (data, target = "_blank", revokeTimeoutMs) => {
    const url = (0, FileUtils2.getObjectUrl)(data, revokeTimeoutMs);
    window.open(url, target);
  };
  FileUtils2.downloadFile = (data, fileName, revokeTimeoutMs) => {
    const url = (0, FileUtils2.getObjectUrl)(data, revokeTimeoutMs);
    const contentDispositionFileName = data instanceof Blob ? void 0 : RestUtils.extractContentDispositionFilename(data.headers);
    const a = document.createElement("a");
    a.download = fileName ?? contentDispositionFileName ?? "download";
    a.rel = "noopener";
    a.href = url;
    setTimeout(() => a.dispatchEvent(new MouseEvent("click")));
  };
  FileUtils2.isFileTypeAccepted = (file, fileTypes) => {
    if (!fileTypes || fileTypes.length === 0) {
      return true;
    }
    return fileTypes.some((type) => {
      if (type.includes("/")) {
        return file.type === type || type.endsWith("/*") && file.type.startsWith(type.slice(0, -1));
      }
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    });
  };
  FileUtils2.getCalculatedFileSize = (file) => {
    if (!file) {
      return "";
    }
    if (file.size < 1024) {
      return `${file.size} B`;
    }
    if (file.size < 1024 * 1024) {
      return `${(file.size / 1024).toFixed(2)} KB`;
    }
    if (file.size < 1024 * 1024 * 1024) {
      return `${(file.size / 1024 / 1024).toFixed(2)} MB`;
    }
    return `${(file.size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  };
  FileUtils2.formatBytes = (size, decimals = 2) => {
    if (size < 1024) {
      return `${size} B`;
    }
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(decimals)} KB`;
    }
    if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(decimals)} MB`;
    }
    return `${(size / 1024 / 1024 / 1024).toFixed(decimals)} GB`;
  };
})(FileUtils || (FileUtils = {}));
export {
  FileUtils
};
