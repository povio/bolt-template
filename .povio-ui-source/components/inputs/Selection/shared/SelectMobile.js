import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useRef } from "react";
import { useLabel } from "react-aria";
import { DialogTrigger } from "react-aria-components";
import { FormField } from "../../FormField/FormField.js";
import { FormFieldHeader } from "../../FormField/FormFieldHeader.js";
import { FormFieldHeaderClose } from "../../FormField/FormFieldHeaderClose.js";
import { TextInput } from "../../Input/TextInput/TextInput.js";
import { SelectInput } from "./SelectInput.js";
import { SelectListBox } from "./SelectListBox.js";
import { SelectListBoxSelectionBar } from "./SelectListBoxSelectionBar.js";
import { SelectContext } from "./select.context.js";
import { BottomSheet } from "../../../overlays/BottomSheet/BottomSheet.js";
const SelectMobile = ({
  ref,
  error,
  showSelectionContent,
  inputClassName,
  containerClassName,
  customTrigger,
  onBlur,
  ...props
}) => {
  const {
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden,
    headerClassName,
    errorClassName,
    placeholder,
    variant,
    isDisabled,
    className,
    hideLabel,
    hideDropdownIcon,
    isSearchable,
    isClearable,
    as,
    collapseAfter,
    selectedTagsType
  } = props;
  const formFieldProps = {
    error,
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden: isHeaderHidden || as === "inline" || as === "filter" || as === "floating",
    hideLabel,
    isDisabled,
    headerClassName,
    errorClassName
  };
  const { labelProps, fieldProps } = useLabel({ label });
  const headerProps = {
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden: hideLabel || isHeaderHidden,
    isDisabled,
    className: headerClassName,
    labelProps
  };
  const { fieldState, isOpen, setIsOpen, onInputChange, isMultiple } = SelectContext.useSelect();
  const searchInputRef = useRef(null);
  const dialogTriggerProps = {
    isOpen,
    onOpenChange: setIsOpen
  };
  return /* @__PURE__ */ jsx(
    FormField,
    {
      ...formFieldProps,
      as,
      labelProps,
      className: clsx("w-full", containerClassName),
      children: /* @__PURE__ */ jsxs(DialogTrigger, { ...dialogTriggerProps, children: [
        customTrigger ? /* @__PURE__ */ jsx(
          "div",
          {
            ...fieldProps,
            ref,
            children: customTrigger
          }
        ) : /* @__PURE__ */ jsx(
          SelectInput,
          {
            ref,
            placeholder,
            variant,
            as,
            isDisabled,
            isInvalid: !!error,
            className,
            hideDropdownIcon,
            isSearchable: false,
            isClearable,
            showSelectionContent,
            onBlur,
            fieldProps,
            headerProps,
            collapseAfter,
            selectedTagsType
          }
        ),
        /* @__PURE__ */ jsx(
          BottomSheet,
          {
            isOpen,
            onOpenChange: setIsOpen,
            onStateChange: (state) => {
              if (state === "opened") {
                searchInputRef.current?.focus();
              }
            },
            label,
            footer: isMultiple && /* @__PURE__ */ jsx(SelectListBoxSelectionBar, {}),
            isDismissable: true,
            children: (close) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              isSearchable ? /* @__PURE__ */ jsx(
                TextInput,
                {
                  ref: searchInputRef,
                  label,
                  placeholder,
                  value: fieldState.inputValue,
                  onChange: onInputChange,
                  rightContent: /* @__PURE__ */ jsx(FormFieldHeaderClose, { onClose: close }),
                  inputClassName,
                  className: "mb-1-5 px-4 pt-3"
                }
              ) : /* @__PURE__ */ jsx(
                FormFieldHeader,
                {
                  label,
                  rightContent: /* @__PURE__ */ jsx(FormFieldHeaderClose, { onClose: close }),
                  className: "!mb-1-5 px-4 pt-3"
                }
              ),
              /* @__PURE__ */ jsx(
                SelectListBox,
                {
                  ...props,
                  autoFocus: !isSearchable,
                  isScrollable: false,
                  onClose: close
                }
              )
            ] })
          }
        )
      ] })
    }
  );
};
export {
  SelectMobile
};
