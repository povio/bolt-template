import { jsx, jsxs } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { useRef, useMemo, Fragment } from "react";
import { useLabel } from "react-aria";
import { ComboBox, DialogTrigger, Popover } from "react-aria-components";
import useMeasure from "react-use-measure";
import { FormField } from "../../FormField/FormField.js";
import { SelectInput } from "./SelectInput.js";
import { SelectListBox } from "./SelectListBox.js";
import { SelectContext } from "./select.context.js";
import { SelectAllItemId } from "./useSelectItems.js";
import { TooltipWrapper } from "../../shared/TooltipWrapper.js";
const SelectDesktop = ({
  ref,
  error,
  ignoreTriggerWidth,
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
    isLoading,
    as,
    size,
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
  const triggerRef = useRef(null);
  const closeComboBoxRef = useRef(null);
  const [wrapperRef, { width }] = useMeasure();
  const {
    fieldState,
    isOpen,
    setIsOpen,
    onInputChange,
    onChange,
    onClear,
    onSelectAll,
    listItems,
    selectableListItems,
    selectedIds,
    isMultiple
  } = SelectContext.useSelect();
  const onSelectionChange = (value) => {
    if (!value) {
      return;
    }
    if (value === SelectAllItemId) {
      if (selectedIds.length === selectableListItems.length) {
        onClear();
      } else {
        onSelectAll();
      }
      return;
    }
    if (!isMultiple) {
      onChange(value);
      return;
    }
    if (!Array.isArray(fieldState.value)) {
      onChange([value]);
      return;
    }
    if (fieldState.value.includes(value)) {
      onChange(fieldState.value.filter((id) => id !== value));
    } else {
      onChange(fieldState.value.concat(value));
    }
  };
  const openChangeHandler = (value) => {
    if (closeComboBoxRef.current && value) {
      closeComboBoxRef.current.setOpen(false);
      closeComboBoxRef.current = null;
    } else {
      setIsOpen(value);
    }
  };
  const WrapperComponent = isSearchable ? ComboBox : Fragment;
  const comboBoxProps = {
    items: listItems,
    selectedKey: isMultiple ? null : fieldState.value,
    onSelectionChange,
    inputValue: fieldState.inputValue,
    onInputChange,
    onOpenChange: openChangeHandler,
    allowsEmptyCollection: true,
    isDisabled,
    isInvalid: !!error,
    menuTrigger: "focus",
    className: clsx("w-full", containerClassName)
  };
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
  const dialogTriggerProps = {
    isOpen,
    onOpenChange: setIsOpen
  };
  const showPopover = useMemo(
    () => listItems.filter((item) => !item.isSelectAllItem).length > 0 || isLoading,
    [listItems, isLoading]
  );
  return /* @__PURE__ */ jsx(
    TooltipWrapper,
    {
      as,
      error,
      children: /* @__PURE__ */ jsx(WrapperComponent, { ...isSearchable ? comboBoxProps : {}, children: /* @__PURE__ */ jsxs(
        FormField,
        {
          ...formFieldProps,
          ...!isSearchable && {
            labelProps,
            className: clsx("w-full", containerClassName)
          },
          as,
          ref: wrapperRef,
          children: [
            customTrigger ? /* @__PURE__ */ jsx(DialogTrigger, { ...dialogTriggerProps, children: /* @__PURE__ */ jsx(
              "div",
              {
                ...fieldProps,
                ref: mergeRefs(ref, triggerRef),
                children: customTrigger
              }
            ) }) : /* @__PURE__ */ jsx(
              SelectInput,
              {
                ref: mergeRefs(ref, triggerRef),
                placeholder,
                variant,
                as,
                size,
                isDisabled,
                isInvalid: !!error,
                className,
                hideDropdownIcon,
                isSearchable,
                isClearable,
                showSelectionContent,
                inputClassName,
                collapseAfter,
                selectedTagsType,
                onBlur,
                onCloseComboBox: (state) => {
                  if (isSearchable) {
                    closeComboBoxRef.current = state;
                  }
                },
                fieldProps,
                headerProps
              }
            ),
            (!isSearchable || showPopover) && /* @__PURE__ */ jsx(
              Popover,
              {
                triggerRef,
                isOpen,
                onOpenChange: setIsOpen,
                className: "my-4 outline-none",
                style: { width: !ignoreTriggerWidth ? width : void 0 },
                offset: 0,
                children: /* @__PURE__ */ jsx(
                  SelectListBox,
                  {
                    ...props,
                    className: "max-h-80 rounded-list-rounding-dropdown border border-elevation-outline-default-1 bg-elevation-fill-default-1 shadow-5 [scrollbar-width:thin]",
                    autoFocus: !isSearchable
                  }
                )
              }
            )
          ]
        }
      ) })
    }
  );
};
export {
  SelectDesktop
};
