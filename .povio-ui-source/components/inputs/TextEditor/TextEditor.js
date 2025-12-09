import { jsx, jsxs } from "react/jsx-runtime";
import { mergeRefs } from "@react-aria/utils";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { clsx } from "clsx";
import { useRef, useState, useEffect } from "react";
import { useHover, useFocusWithin, useFocusVisible, useLabel } from "react-aria";
import { Controller } from "react-hook-form";
import { FormField } from "../FormField/FormField.js";
import { FormFieldLabel } from "../FormField/FormFieldLabel.js";
import { uiOutlineClass } from "../../outline.clsx.js";
import { isEqual } from "../../../utils/isEqual.js";
import { TextEditorToolbar } from "./Toolbar/TextEditorToolbar.js";
const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3]
    }
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"]
  }),
  Underline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true
  }),
  Link.configure({
    openOnClick: false,
    defaultProtocol: "https"
  })
];
const TextEditorBase = ({
  ref,
  as = "default",
  placeholder,
  label,
  hideLabel,
  tooltipText,
  helperText,
  isRequired,
  rightContent,
  isDisabled,
  headerClassName,
  errorClassName,
  isHeaderHidden,
  error,
  value,
  className,
  onChange,
  onBlur
}) => {
  const contentRef = useRef(null);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const [isFocused, setIsFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setIsFocused
  });
  const { isFocusVisible } = useFocusVisible();
  const formFieldProps = {
    error,
    label,
    tooltipText,
    helperText,
    isRequired,
    rightContent,
    isHeaderHidden: isHeaderHidden || as === "filter" || as === "floating",
    hideLabel,
    isDisabled,
    headerClassName,
    errorClassName
  };
  const { labelProps, fieldProps } = useLabel({ label });
  const editor = useEditor(
    {
      extensions: [...extensions, Placeholder.configure({ placeholder: as === "floating" ? "" : placeholder })],
      editorProps: {
        attributes: {
          class: "min-h-40 rounded-b-sm p-2 outline-none"
        }
      },
      onUpdate: (event) => {
        onChange?.({
          json: event.editor.getJSON(),
          html: event.editor.getHTML()
        });
      },
      immediatelyRender: false,
      editable: !isDisabled,
      onBlur
    },
    [isDisabled]
  );
  useEffect(() => {
    const content = value?.json ?? null;
    if (editor) {
      const isSame = isEqual(content, editor.getJSON());
      if (!isSame) {
        editor.commands.setContent(content);
      }
    } else {
      const isSame = isEqual(content, contentRef.current);
      if (!isSame) {
        contentRef.current = content ?? null;
      }
    }
  }, [value]);
  useEffect(() => {
    if (editor && contentRef.current) {
      editor.commands.setContent(contentRef.current);
      contentRef.current = null;
    }
  }, [editor]);
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
  return /* @__PURE__ */ jsx(
    FormField,
    {
      ...formFieldProps,
      ref,
      as,
      labelProps,
      className: clsx("w-full", className),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "group/text-editor relative",
            "w-full rounded-sm border border-elevation-outline-default-2 border-solid bg-elevation-fill-default-1",
            uiOutlineClass,
            "focus-within:border focus-within:border-input-outlined-outline-active",
            "focus-visible:outline-interactive-contained-primary-focus",
            "hover:border hover:border-input-outlined-outline-hover"
          ),
          "data-text-editor": true,
          "data-rac": "",
          "data-hovered": isHovered || void 0,
          "data-disabled": isDisabled || void 0,
          "data-focus-within": isFocused || void 0,
          "data-focus-visible": isFocused && isFocusVisible || void 0,
          "data-is-filled": !editor?.isEmpty,
          ...hoverProps,
          ...focusWithinProps,
          ...fieldProps,
          children: [
            /* @__PURE__ */ jsx(TextEditorToolbar, { editor }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx("relative", {
                  "pt-3": as === "floating"
                }),
                children: [
                  as === "floating" && headerProps && /* @__PURE__ */ jsx(
                    FormFieldLabel,
                    {
                      as,
                      ...headerProps
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    EditorContent,
                    {
                      editor,
                      placeholder: as === "floating" ? "" : placeholder,
                      className: clsx({
                        "[&_p:before]:opacity-0": as === "floating" && editor?.isEmpty
                      })
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
};
const TextEditor = (props) => {
  if ("formControl" in props && props.formControl) {
    const { formControl, ref, ...innerProps } = props;
    return /* @__PURE__ */ jsx(
      Controller,
      {
        control: formControl.control,
        name: formControl.name,
        render: ({ field }) => /* @__PURE__ */ jsx(
          TextEditorBase,
          {
            ...innerProps,
            ref: mergeRefs(ref, field.ref),
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            isDisabled: field.disabled || props.isDisabled
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(TextEditorBase, { ...props });
};
export {
  TextEditor
};
