import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { mergeRefs, useLabels } from "@react-aria/utils";
import { clsx } from "clsx";
import { useState, useCallback } from "react";
import { DropZone } from "react-aria-components";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormField } from "../FormField/FormField.js";
import { ns } from "../../../config/i18n.js";
import { UIConfig } from "../../../config/uiConfig.context.js";
import { FileUtils } from "../../../utils/file.utils.js";
import { FileCardList } from "./shared/FileCardList.js";
import { FileUploadContent } from "./shared/FileUploadContent.js";
import { FileUploadContentEmpty } from "./shared/FileUploadContentEmpty.js";
import { fileUploadDropZone } from "./shared/fileUpload.cva.js";
const FileUploadBase = (props) => {
  const { t } = useTranslation(ns);
  const {
    ref: _ref,
    label,
    tooltipText,
    variant = "vertical",
    as = "button",
    helperText,
    isRequired,
    isDisabled,
    headerClassName,
    errorClassName,
    isHeaderHidden,
    error,
    className,
    allowsMultiple = false,
    hideLabel,
    acceptedFileTypes,
    emptyText = t(($) => $.ui.fileUpload.emptyText),
    uploadText = t(($) => $.ui.fileUpload.uploadText),
    browseText = t(($) => $.ui.fileUpload.browse),
    fileUpload,
    fileRemove,
    children,
    listRenderer,
    ...rest
  } = props;
  const ui = UIConfig.useConfig();
  const [uploadState, setUploadState] = useState(props.value ?? []);
  const formFieldProps = {
    error,
    label,
    tooltipText,
    helperText,
    isRequired,
    isHeaderHidden,
    hideLabel: hideLabel ?? ui.input.hideLabel,
    isDisabled,
    headerClassName,
    errorClassName
  };
  const labelProps = useLabels({ "aria-label": label });
  const handleUpload = useCallback(
    async (inputFiles) => {
      const acceptedFiles = inputFiles.filter((file) => FileUtils.isFileTypeAccepted(file, acceptedFileTypes));
      if (acceptedFiles.length === 0 || !fileUpload) {
        return;
      }
      if (!allowsMultiple) {
        setUploadState([]);
      }
      const newUploadState = [];
      acceptedFiles.forEach((file) => {
        newUploadState.push({ state: "uploading", progress: 0, file, abortController: new AbortController() });
      });
      const startIndex = allowsMultiple ? uploadState.length : 0;
      setUploadState((prev) => [...prev, ...newUploadState]);
      const promises = [];
      acceptedFiles.forEach(async (file, index) => {
        promises.push(
          fileUpload(
            {
              data: {
                resourceName: file.name,
                fileName: file.name,
                fileSize: file.size,
                method: "put"
              }
            },
            file,
            {
              onUploadProgress: ({ loaded, total }) => {
                if (total == null) {
                  return;
                }
                const progress = Math.round(loaded / total * 100);
                setUploadState(
                  (prev) => prev.map((state, i) => i === startIndex + index ? { ...state, progress } : state)
                );
              },
              abortController: newUploadState[index]?.abortController
            }
          )
        );
      });
      const response = await Promise.all(promises);
      response.forEach((res, index) => {
        setUploadState(
          (prev) => prev.map((state, i) => i === startIndex + index ? { ...state, state: "uploaded", id: res.id } : state)
        );
      });
    },
    [fileUpload, acceptedFileTypes, setUploadState, allowsMultiple, uploadState.length]
  );
  const handleSelect = useCallback(
    (inputFiles) => {
      if (!inputFiles) {
        return;
      }
      const filesArray = Array.from(inputFiles);
      handleUpload(filesArray);
    },
    [handleUpload]
  );
  const handleDrop = async (e) => {
    if (!e.items) {
      return;
    }
    const promises = [];
    e.items.forEach((item) => {
      if (item.kind === "file") {
        promises.push(item.getFile());
      }
    });
    const inputFiles = await Promise.all(promises);
    handleUpload(inputFiles);
  };
  const handleRemove = useCallback(
    (id) => {
      fileRemove?.({ id });
      setUploadState((prev) => prev.filter((state) => state.id !== id));
    },
    [fileRemove]
  );
  const handleCancelUpload = useCallback(
    (index) => {
      const findState = uploadState[index];
      if (findState) {
        findState.abortController?.abort("canceled by user");
        setUploadState((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [uploadState]
  );
  return /* @__PURE__ */ jsxs(
    FormField,
    {
      ...formFieldProps,
      labelProps,
      className: clsx("w-full", className),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-between gap-input-gap-input-to-button-gap", children: /* @__PURE__ */ jsx(
          DropZone,
          {
            ...rest,
            "data-rac": "",
            "data-disabled": isDisabled || void 0,
            "data-invalid": !!error || void 0,
            "data-multiple": allowsMultiple || void 0,
            "data-has-files": uploadState.length > 0 || void 0,
            isDisabled,
            onDrop: handleDrop,
            className: fileUploadDropZone({ variant, isContainer: !!children, className: "group/file-upload-drop-zone" }),
            children: children ? /* @__PURE__ */ jsxs(Fragment, { children: [
              children({
                files: uploadState,
                onRemove: handleRemove,
                onCancel: handleCancelUpload
              }),
              /* @__PURE__ */ jsx(
                FileUploadContentEmpty,
                {
                  as,
                  variant,
                  singleFile: true,
                  hideButton: true,
                  isDisabled,
                  title: emptyText,
                  uploadText,
                  browseText,
                  className: "-translate-x-1/2 -translate-y-1/2 group-drop-target/file-upload-drop-zone:flex! absolute top-1/2 left-1/2 z-50 hidden flex-col"
                }
              )
            ] }) : /* @__PURE__ */ jsx(
              FileUploadContent,
              {
                ...rest,
                variant,
                as,
                isDisabled,
                browseText,
                uploadText,
                emptyText,
                uploadState,
                handleSelect,
                handleCancelUpload,
                handleRemove,
                acceptedFileTypes,
                allowsMultiple
              }
            )
          }
        ) }),
        !children && allowsMultiple && uploadState.length > 0 && (listRenderer ? listRenderer({
          files: uploadState,
          onRemove: handleRemove,
          onCancel: handleCancelUpload
        }) : /* @__PURE__ */ jsx(
          FileCardList,
          {
            as,
            uploadState,
            isDisabled,
            onRemove: handleRemove,
            onCancel: handleCancelUpload
          }
        ))
      ]
    }
  );
};
const FileUpload = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          FileUploadBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: field.value,
            onChange: field.onChange,
            isDisabled: field.disabled || props.isDisabled,
            error: props.error ?? error?.message
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(FileUploadBase, { ...props });
};
export {
  FileUpload
};
