import { jsx } from "react/jsx-runtime";
import { FileTrigger } from "react-aria-components";
import { FileUploadContentEmpty } from "./FileUploadContentEmpty.js";
import { FileUploadContentError } from "./FileUploadContentError.js";
import { FileUploadContentFilled } from "./FileUploadContentFilled.js";
import { FileUploadContentLoading } from "./FileUploadContentLoading.js";
const FileUploadContent = ({
  variant,
  as,
  isDisabled,
  browseText,
  uploadText,
  emptyText,
  uploadState,
  handleCancelUpload,
  handleRemove,
  acceptedFileTypes,
  allowsMultiple,
  handleSelect,
  ...rest
}) => {
  const currentState = uploadState.at(0);
  const fileTriggerProps = {
    ...rest,
    acceptedFileTypes,
    allowsMultiple,
    onSelect: handleSelect
  };
  if (!allowsMultiple && currentState) {
    if (currentState.state === "uploading") {
      return /* @__PURE__ */ jsx(
        FileUploadContentLoading,
        {
          index: 0,
          variant,
          as,
          singleFile: true,
          isDisabled,
          state: currentState,
          onCancel: handleCancelUpload
        }
      );
    }
    if (currentState.state === "uploaded") {
      return /* @__PURE__ */ jsx(
        FileUploadContentFilled,
        {
          as,
          variant,
          singleFile: true,
          isDisabled,
          state: currentState,
          browseText,
          fileTriggerProps,
          onRemove: () => {
            handleRemove(currentState.id ?? "");
          }
        }
      );
    }
    if (currentState.state === "error") {
      return /* @__PURE__ */ jsx(
        FileUploadContentError,
        {
          as,
          variant,
          singleFile: true,
          isDisabled,
          state: currentState,
          onRemove: () => {
            handleRemove(currentState.id ?? "");
          }
        }
      );
    }
  }
  return /* @__PURE__ */ jsx(FileTrigger, { ...fileTriggerProps, children: /* @__PURE__ */ jsx(
    FileUploadContentEmpty,
    {
      as,
      variant,
      singleFile: true,
      isDisabled,
      title: emptyText,
      uploadText,
      browseText
    }
  ) });
};
export {
  FileUploadContent
};
