import { jsx } from "react/jsx-runtime";
import { mergeRefs, useLabels } from "@react-aria/utils";
import { clsx } from "clsx";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FormField } from "../FormField/FormField.js";
import { UIConfig } from "../../../config/uiConfig.context.js";
import { InputUploadContent } from "./shared/InputUploadContent.js";
import { InputUploadFilled } from "./shared/InputUploadFilled.js";
const InputUploadBase = ({
  ref: _ref,
  label,
  tooltipText,
  variant,
  helperText,
  isRequired,
  isDisabled,
  headerClassName,
  errorClassName,
  isHeaderHidden,
  error,
  className,
  onChange,
  value,
  defaultValue,
  allowsMultiple = false,
  hideLabel,
  acceptedFileTypes,
  ...rest
}) => {
  const ui = UIConfig.useConfig();
  const [internalFiles, setInternalFiles] = useState(() => {
    if (value !== void 0) {
      if (allowsMultiple) {
        return value || [];
      }
      return value ? [value] : [];
    }
    if (defaultValue !== void 0) {
      if (allowsMultiple) {
        return defaultValue || [];
      }
      return defaultValue ? [defaultValue] : [];
    }
    return [];
  });
  const files = value !== void 0 ? (() => {
    if (allowsMultiple) {
      return value || [];
    }
    return value ? [value] : [];
  })() : internalFiles;
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
  const updateFiles = (newFiles) => {
    if (value === void 0) {
      setInternalFiles(newFiles);
    }
    if (allowsMultiple) {
      onChange?.(newFiles);
    } else {
      onChange?.(newFiles[0] || null);
    }
  };
  const isFileAccepted = (file) => {
    if (!acceptedFileTypes || acceptedFileTypes.length === 0) {
      return true;
    }
    return acceptedFileTypes.some((type) => {
      if (type.includes("/")) {
        return file.type === type || type.endsWith("/*") && file.type.startsWith(type.slice(0, -1));
      }
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    });
  };
  const handleSelect = (inputFiles) => {
    if (!inputFiles) {
      return;
    }
    const filesArray = Array.from(inputFiles);
    const acceptedFiles = filesArray.filter(isFileAccepted);
    if (allowsMultiple) {
      updateFiles([...files, ...acceptedFiles]);
    } else {
      updateFiles([acceptedFiles[0]]);
    }
  };
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
    const acceptedFiles = inputFiles.filter(isFileAccepted);
    if (allowsMultiple) {
      updateFiles([...files, ...acceptedFiles]);
    } else {
      updateFiles([acceptedFiles[0]]);
    }
  };
  const handleRemove = () => {
    updateFiles([]);
  };
  return /* @__PURE__ */ jsx(
    FormField,
    {
      ...formFieldProps,
      labelProps,
      className: clsx("w-full", className),
      children: files.length > 0 ? /* @__PURE__ */ jsx(
        InputUploadFilled,
        {
          files,
          onRemove: handleRemove,
          isDisabled
        }
      ) : /* @__PURE__ */ jsx(
        InputUploadContent,
        {
          ...rest,
          label,
          error,
          allowsMultiple,
          acceptedFileTypes,
          variant,
          isDisabled,
          onSelect: handleSelect,
          onDrop: handleDrop
        }
      )
    }
  );
};
const InputUpload = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          InputUploadBase,
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
  return /* @__PURE__ */ jsx(InputUploadBase, { ...props });
};
export {
  InputUpload
};
