import { jsx, jsxs } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { clsx } from "clsx";
import { useRef, useMemo, Fragment } from "react";
import { useToggleButtonGroup } from "react-aria";
import { ToggleButtonGroup } from "react-aria-components";
import { Controller } from "react-hook-form";
import { useToggleGroupState } from "react-stately";
import { FormField } from "../inputs/FormField/FormField.js";
import { SegmentItem } from "./SegmentItem.js";
const SegmentBase = ({
  className,
  items,
  error,
  onChange,
  value,
  defaultValue,
  ...rest
}) => {
  const props = {
    ...rest,
    defaultSelectedKeys: defaultValue ? Array.isArray(defaultValue) ? defaultValue : [defaultValue] : void 0,
    selectedKeys: value ? Array.isArray(value) ? value : [value] : void 0
  };
  const buttonGroupRef = useRef(null);
  const state = useToggleGroupState(props);
  const { groupProps } = useToggleButtonGroup(props, state, buttonGroupRef);
  const formFieldProps = {
    error,
    label: "",
    hideLabel: true,
    isDisabled: props.isDisabled
  };
  const onSelectionChange = (keys) => {
    if (props.selectionMode === "multiple") {
      onChange?.(Array.from(keys.values()));
    } else {
      onChange?.(Array.from(keys.values())[0]);
    }
  };
  const gridTemplateColumns = useMemo(() => {
    return items.length > 2 ? Array.from({ length: items.length * 2 - 1 }, (_, i) => i % 2 === 0 ? "1fr" : "auto").join(" ") : `repeat(${items.length}, 1fr)`;
  }, [items.length]);
  return /* @__PURE__ */ jsx(
    FormField,
    {
      ...formFieldProps,
      className: clsx("relative w-full", className),
      children: /* @__PURE__ */ jsx(
        ToggleButtonGroup,
        {
          ...props,
          ...groupProps,
          ref: buttonGroupRef,
          onSelectionChange,
          className: clsx(
            "group/segment grid w-fit items-center gap-segmented-control-side-segmented-control p-segmented-control-side-segmented-control",
            "bg-elevation-fill-default-3",
            "rounded-segmented-control-rounding-segmented-control",
            className
          ),
          style: {
            gridTemplateColumns
          },
          children: items.map((item, index) => /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              SegmentItem,
              {
                ...item,
                isDisabled: item.isDisabled || props.isDisabled,
                isSelected: state.selectedKeys.has(item.id),
                onPress: () => {
                  state.toggleKey(item.id);
                }
              }
            ),
            index !== items.length - 1 && items.length > 2 && /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "h-5 w-px rounded-2xl",
                  !state.selectedKeys.has(item.id) && !state.selectedKeys.has(items[index + 1].id) && "bg-elevation-outline-default-1"
                ),
                children: /* @__PURE__ */ jsx("span", { className: "flex h-full w-px" })
              }
            )
          ] }, item.id))
        }
      )
    }
  );
};
const Segment = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field, fieldState: { error } }) => /* @__PURE__ */ jsx(
          SegmentBase,
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
  return /* @__PURE__ */ jsx(SegmentBase, { ...props });
};
export {
  Segment
};
