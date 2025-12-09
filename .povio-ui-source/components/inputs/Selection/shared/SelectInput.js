import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { use, useState, useMemo } from "react";
import { useHover, useFocusWithin, useFocusVisible } from "react-aria";
import { ComboBoxStateContext, Input, Button } from "react-aria-components";
import { useTranslation } from "react-i18next";
import useMeasure from "react-use-measure";
import { ArrowDropDownIcon } from "../../../../assets/icons/ArrowDropDown.js";
import { FormFieldLabel } from "../../FormField/FormFieldLabel.js";
import { SelectInputTags } from "./SelectInputTags.js";
import { SelectContext } from "./select.context.js";
import { InputClear } from "../../shared/InputClear.js";
import { inputSize, inputBase, inputSide } from "../../shared/input.cva.js";
import { Typography } from "../../../text/Typography/Typography.js";
import { ns } from "../../../../config/i18n.js";
import { UIStyle } from "../../../../config/uiStyle.context.js";
const SelectInput = ({
  ref,
  placeholder,
  variant,
  as,
  size,
  isDisabled,
  isInvalid,
  className,
  hideDropdownIcon,
  isSearchable,
  isClearable,
  showSelectionContent,
  inputClassName,
  fieldProps,
  headerProps,
  selectedTagsType,
  collapseAfter,
  onCloseComboBox,
  onBlur,
  ...props
}) => {
  const uiStyle = UIStyle.useConfig();
  const inputSizeCva = uiStyle?.input?.sizeCva ?? inputSize;
  const inputBaseCva = uiStyle?.input?.baseCva ?? inputBase;
  const inputSideCva = uiStyle?.input?.sideCva ?? inputSide;
  const { t } = useTranslation(ns);
  const state = use(ComboBoxStateContext);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const [isFocused, setIsFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setIsFocused
  });
  const { isFocusVisible } = useFocusVisible();
  const [labelContentRef, { width: labelWidth }] = useMeasure();
  const {
    fieldState,
    isOpen,
    setIsOpen,
    listItems,
    selectedItems,
    onChange,
    onClear,
    onRemove,
    isMultiple,
    isLoading
  } = SelectContext.useSelect();
  const isEmpty = selectedItems.length === 0;
  const showTags = isMultiple && !isEmpty;
  const showClearButton = isClearable && isHovered && (selectedItems.length > 0 || isSearchable && fieldState.inputValue !== "");
  const style = useMemo(() => {
    if (as !== "filter") {
      return {};
    }
    const paddingLeft = `calc(${isSearchable || showTags ? "1 * " : "2 * "}var(${inputSideCva({ size, type: "var" })}) + ${labelWidth}px)`;
    return {
      paddingLeft
    };
  }, [labelWidth, as, size, isSearchable, showTags, inputSideCva]);
  const labelProps = useMemo(() => {
    const { labelProps: headerLabelProps } = headerProps ?? {};
    const isFilterOrFloating = as && ["filter", "floating"].includes(as);
    if (!isFilterOrFloating || isSearchable) {
      return headerLabelProps;
    }
    return {
      ...headerLabelProps,
      className: clsx(headerLabelProps?.className, "pointer-events-none")
    };
  }, [as, headerProps, isSearchable]);
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !isMultiple && !isLoading && listItems.length === 1 && !listItems[0].isDisabled) {
      e.preventDefault();
      onChange(listItems[0].id);
      onCloseComboBox?.(state);
    }
    if (e.key === "Backspace" && isMultiple && fieldState.inputValue === "" && Array.isArray(fieldState.value) && fieldState.value.length > 0) {
      onChange(fieldState.value.slice(0, -1));
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: inputBaseCva({
        variant,
        as,
        ...props,
        className: clsx("group/select-content relative flex px-0!", isSearchable && "cursor-text", className)
      }),
      "data-rac": "",
      "data-disabled": isDisabled,
      "data-hovered": isHovered || void 0,
      "data-focused": isOpen || isFocused || void 0,
      "data-focus-within": isFocused || void 0,
      "data-searchable-focus-within": isFocused && isSearchable || void 0,
      "data-focus-visible": isFocused && isFocusVisible || void 0,
      "data-has-selection": !isEmpty || void 0,
      "data-has-search": fieldState.searchValue !== "" || void 0,
      "data-invalid": isInvalid || void 0,
      "data-is-empty": isEmpty || void 0,
      ...hoverProps,
      ...focusWithinProps,
      children: [
        /* @__PURE__ */ jsxs("div", { className: clsx("relative flex flex-1 items-center truncate", showTags && inputSizeCva({ size, ...props })), children: [
          as && ["filter", "floating"].includes(as) && headerProps && /* @__PURE__ */ jsx(
            FormFieldLabel,
            {
              ref: labelContentRef,
              as,
              ...headerProps,
              labelProps
            }
          ),
          (showTags || isSearchable) && /* @__PURE__ */ jsxs(
            "div",
            {
              className: clsx("flex flex-1 flex-wrap gap-2 truncate", !isSearchable && "pointer-events-none z-1"),
              style,
              children: [
                showTags && /* @__PURE__ */ jsx(
                  SelectInputTags,
                  {
                    selectedItems,
                    isDisabled,
                    collapseAfter,
                    selectedTagsType,
                    onRemove
                  }
                ),
                isSearchable && /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder,
                    onBlur,
                    className: clsx(
                      "flex-1 bg-transparent outline-none placeholder:text-text-default-3 disabled:text-interactive-text-secondary-disabled",
                      !showTags && inputSizeCva({
                        size,
                        ...props,
                        className: "rounded-input-rounding-default"
                      }),
                      inputClassName
                    ),
                    onKeyDown,
                    ...fieldProps
                  }
                )
              ]
            }
          ),
          !isSearchable && /* @__PURE__ */ jsx(
            Button,
            {
              isDisabled,
              onPress: () => setIsOpen(!isOpen),
              onBlur,
              "data-type": "select-trigger",
              className: inputSizeCva({
                size,
                ...props,
                className: clsx(
                  "w-full truncate text-start outline-none disabled:text-interactive-text-secondary-disabled",
                  showTags && "absolute inset-0 z-0"
                )
              }),
              style,
              ...fieldProps,
              children: (isEmpty || !isMultiple) && /* @__PURE__ */ jsxs(
                Typography,
                {
                  size: "label-1",
                  className: clsx(
                    "truncate empty:before:inline-block empty:before:content-['']",
                    isEmpty && "text-text-default-3"
                  ),
                  children: [
                    isEmpty && placeholder,
                    !isEmpty && (showSelectionContent ? selectedItems[0].content : selectedItems[0].label)
                  ]
                }
              )
            }
          )
        ] }),
        showClearButton && /* @__PURE__ */ jsx(InputClear, { onClear }),
        !hideDropdownIcon && /* @__PURE__ */ jsx(
          Button,
          {
            excludeFromTabOrder: true,
            "aria-label": t(($) => isOpen ? $.ui.closeAlt : $.ui.openAlt),
            className: clsx("self-stretch pl-1-5 outline-none", inputSizeCva({ size })),
            isDisabled,
            onPress: () => {
              if (!isSearchable) {
                setIsOpen(!isOpen);
              }
            },
            children: /* @__PURE__ */ jsx(
              ArrowDropDownIcon,
              {
                className: clsx(
                  "size-6 shrink-0",
                  isOpen && "rotate-180",
                  isDisabled ? "text-interactive-text-secondary-disabled" : "text-interactive-text-secondary-idle"
                ),
                "aria-hidden": "true"
              }
            )
          }
        )
      ]
    }
  );
};
export {
  SelectInput
};
