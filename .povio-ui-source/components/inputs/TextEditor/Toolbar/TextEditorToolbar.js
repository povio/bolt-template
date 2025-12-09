import { jsxs, jsx } from "react/jsx-runtime";
import { HyperlinkAction } from "./HyperlinkAction.js";
import { TextAlignSelect } from "./TextAlignSelect.js";
import { TextColorSelect } from "./TextColorSelect.js";
import { TextHighlightSelect } from "./TextHighlightSelect.js";
import { TextListActions } from "./TextListActions.js";
import { TextMarksActions } from "./TextMarksActions.js";
import { TextStyleSelect } from "./TextStyleSelect.js";
const TextEditorToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-wrap items-center gap-x-7 gap-y-1 border-elevation-outline-default-2 border-b border-solid p-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(TextStyleSelect, { editor }),
        /* @__PURE__ */ jsx(TextAlignSelect, { editor })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(TextColorSelect, { editor }),
        /* @__PURE__ */ jsx(TextHighlightSelect, { editor })
      ] })
    ] }),
    /* @__PURE__ */ jsx(TextMarksActions, { editor }),
    /* @__PURE__ */ jsx(TextListActions, { editor }),
    /* @__PURE__ */ jsx(HyperlinkAction, { editor })
  ] });
};
export {
  TextEditorToolbar
};
