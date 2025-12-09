import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useMemo } from "react";
import { FileUploadContentError } from "./FileUploadContentError.js";
import { FileUploadContentFilled } from "./FileUploadContentFilled.js";
import { FileUploadContentLoading } from "./FileUploadContentLoading.js";
const FileCard = ({ index, as, state, onRemove, isDisabled, onCancel }) => {
  const content = useMemo(() => {
    if (state.state === "uploading") {
      return /* @__PURE__ */ jsx(
        FileUploadContentLoading,
        {
          index,
          variant: "horizontal",
          as,
          isDisabled,
          state,
          onCancel: () => onCancel?.(index)
        }
      );
    }
    if (state.state === "error") {
      return /* @__PURE__ */ jsx(
        FileUploadContentError,
        {
          as,
          removeWithIcon: true,
          variant: "horizontal",
          isDisabled,
          state,
          onRemove: () => {
            onCancel?.(index);
          }
        }
      );
    }
    return /* @__PURE__ */ jsx(
      FileUploadContentFilled,
      {
        as,
        removeWithIcon: true,
        variant: "horizontal",
        isDisabled,
        state,
        onRemove: () => {
          onRemove?.(state.id ?? "");
        }
      }
    );
  }, [state, index, as, isDisabled, onCancel, onRemove]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex items-center self-stretch",
        "bg-elevation-fill-default-1",
        "px-file-upload-file-card-side-default",
        "py-4",
        "rounded-file-upload-file-card-rounding-default border border-elevation-outline-default-1 border-solid"
      ),
      children: content
    }
  );
};
export {
  FileCard
};
